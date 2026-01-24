"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LiaMinusCircleSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import NavBar from "@/components/common/navBar/navBar";
import { IoIosSend } from "react-icons/io";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { hydrateFromStorage } from "@/store/whySlice";
import { useInviteUserOnebyOneMutation, useContinueSubmitMutation } from "@/store/APIs/inviteApi/inviteApi";
import { useGetParentPhone } from "@/hooks/useGetParentPhone";
import { useSearchParams } from "next/navigation";
/* -------------------- Types -------------------- */
interface Contact {
  id: number;
  name: string;
  phone: string;
  sent?: boolean;
}

interface ContactResult {
  name?: string[];
  tel?: string[];
}

interface ContactsManager {
  select(
    properties: readonly ("name" | "tel" | "email" | "address" | "icon")[],
    options?: { multiple?: boolean }
  ): Promise<ContactResult[]>;
}

declare global {
  interface Navigator {
    contacts?: ContactsManager;
  }

  interface Window {
    ContactsManager?: unknown;
  }
}

/* -------------------- Helpers -------------------- */
const normalizePhone = (phone: string): string =>
  phone.replace(/\s|-/g, "").replace(/^0/, "+880"); // 🇧🇩 adjust if needed

/* -------------------- Component -------------------- */
export default function ContactPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const whyMessage = useAppSelector((state) => state.why.whyMessage);
  const donationInfo = useAppSelector((state) => state.donation);
  const [inviteUserOnebyOne, { isLoading: isSendingOneByOne }] = useInviteUserOnebyOneMutation();
  const [continueSubmit, { isLoading: isSubmittingContinue }] = useContinueSubmitMutation();
  const parentPhoneFromToken = useGetParentPhone();

  // Helper function to get parent phone based on user role
  const getParentPhoneForInvite = (): string | null => {
    if (typeof window === "undefined") return null;

    const userRole = localStorage.getItem("userRole");
    
    // For SUPER_ADMIN: get from JWT token
    if (userRole === "SUPER_ADMIN") {
      return parentPhoneFromToken;
    }
    
    // For USER: get from URL params
    if (userRole === "USER") {
      return searchParams.get("parent");
    }
    
    return null;
  };

  // Helper function to get campaignId based on user role
  const getCampaignIdForInvite = (): string | null => {
    if (typeof window === "undefined") return null;

    const userRole = localStorage.getItem("userRole");
    const lastCampaignId = localStorage.getItem("last_campaign_id");
    const paramsCampaignId = localStorage.getItem("params_campaign_id");

    // For SUPER_ADMIN: use last_campaign_id
    if (userRole === "SUPER_ADMIN") {
      return lastCampaignId;
    }
    
    // For USER: use params_campaign_id
    return paramsCampaignId;
  };

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [manualNumber, setManualNumber] = useState<string>("");
  const [manualName, setManualName] = useState<string>("");
  const [manualStage, setManualStage] = useState<"name" | "phone">("name");

  // Hydrate from sessionStorage after mount
  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);

  /* ---------- Open phone contact picker ---------- */
  const handleOpenContacts = async (): Promise<void> => {
    if (
      typeof window !== "undefined" &&
      navigator.contacts &&
      "ContactsManager" in window
    ) {
      try {
        const result = await navigator.contacts.select(["name", "tel"], {
          multiple: true,
        });

        const formatted: Contact[] = result
          .map((c, index) => ({
            id: Date.now() + index,
            name: c.name?.[0] ?? "Unknown",
            phone: c.tel?.[0] ? normalizePhone(c.tel[0]) : "",
            sent: false,
          }))
          .filter((c) => c.phone);

        setContacts((prev) => {
          const merged = [...prev, ...formatted];

          // Remove duplicates by phone
          const unique = Array.from(
            new Map(merged.map((c) => [c.phone, c])).values()
          );

          return unique.slice(0, 12); // max 12
        });
      } catch {
        alert("Contact selection cancelled");
      }
    } else {
      alert(
        "Contact access is not supported on this device. Please enter the number manually."
      );
    }
  };

  /* ---------- Manual add ---------- */
  const handleManualAdd = (): void => {
    if (!manualName.trim() || !manualNumber) return;

    const phone = normalizePhone(manualNumber);

    setContacts((prev) => {
      if (prev.some((c) => c.phone === phone)) return prev;
      if (prev.length >= 12) return prev;

      return [
        ...prev,
        {
          id: Date.now(),
          name: manualName.trim(),
          phone,
          sent: false,
        },
      ];
    });

    setManualName("");
    setManualNumber("");
    setManualStage("name");
  };

  const handleContinue = async (): Promise<void> => {
    // Validate minimum contacts
    if (contacts.length < 3) {
      toast.error("Please add at least 3 contacts to continue.");
      return;
    }

    // Get campaignId based on user role
    const campaignId = getCampaignIdForInvite();

    if (!campaignId) {
      toast.error(
        "Campaign not selected. Please go back and select a campaign."
      );
      return;
    }

    // Get current user's phone from JWT token for donation submission
    let currentUserPhone: string | null = null;
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const parts = accessToken.split(".");
          if (parts.length === 3) {
            const payload = parts[1];
            let base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
            const padding = base64.length % 4;
            if (padding) {
              base64 += "=".repeat(4 - padding);
            }
            const decoded = atob(base64);
            const jwtPayload = JSON.parse(decoded) as { contact?: string };
            currentUserPhone = jwtPayload.contact || null;
          }
        } catch (error) {
          console.error("Failed to decode JWT for user phone:", error);
        }
      }
    }

    if (!currentUserPhone) {
      toast.error("Unable to get user phone number. Please try again.");
      return;
    }

    if (!donationInfo.donationAmount) {
      toast.error("Donation amount is required.");
      return;
    }

    // Call useContinueSubmitMutation API only
    try {
      await continueSubmit({
        amount: donationInfo.donationAmount,
        phone: currentUserPhone,
        campaignId: campaignId,
      }).unwrap();

      toast.success("Submitted successfully!");
      
      // Navigate to redirect page after a short delay
      setTimeout(() => {
        router.push("/redirect");
      }, 1000);
    } catch (error) {
      console.error("Failed to submit:", error);
      const errorMessage =
        (error as { data?: { message?: string }; message?: string })?.data
          ?.message ||
        (error as { message?: string })?.message ||
        "Failed to submit. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleSendSMS = async (contact: Contact) => {
    try {
      // Get parent phone (based on user role)
      const parentPhone = getParentPhoneForInvite();

      if (!parentPhone) {
        toast.error("Parent phone not found. Please check your URL or authentication.");
        return;
      }

      // Get campaignId based on user role
      const campaignId = getCampaignIdForInvite();

      if (!campaignId) {
        toast.error("Campaign ID not found. Please go back and select a campaign.");
        return;
      }

      // Prepare invite payload for one-by-one API
      // Structure: { parentPhone, newPhone, campaignId }
      const invitePayload = {
        parentPhone: parentPhone,
        newPhone: contact.phone,
        campaignId: campaignId,
      };

      // First: Call the API
      await inviteUserOnebyOne(invitePayload).unwrap();

      // Then: Send the SMS message
      const latestMessage = whyMessage;
      const personalizedMessage = latestMessage.replace(
        /<FRIENDS NAME>/g,
        contact.name
      );

      // Clean single phone number
      const cleanedNumber = contact.phone.replace(/\s|-/g, "");
      const encodedMessage = encodeURIComponent(personalizedMessage);

      // Copy message to clipboard as fallback
      if (navigator.clipboard) {
        navigator.clipboard.writeText(personalizedMessage).catch(() => {
          // Clipboard failed, continue anyway
        });
      }

      // Open SMS for single recipient
      window.location.href = `sms:${cleanedNumber}?body=${encodedMessage}`;

      // Mark as sent
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, sent: true } : c))
      );

      toast.success(`Invitation sent to ${contact.name}`);
    } catch (error) {
      console.error("Failed to send invitation:", error);
      const errorMessage =
        (error as { data?: { message?: string }; message?: string })?.data
          ?.message ||
        (error as { message?: string })?.message ||
        "Failed to send invitation. Please try again.";
      toast.error(errorMessage);
    }
  };

  /* ---------- Remove contact ---------- */
  const handleRemoveContact = (id: number): void => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  /* -------------------- UI -------------------- */
  const canContinue = contacts.length >= 3;

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] flex flex-col gap-6 p-4">
        <NavBar />
        <h2 className="text-2xl font-semibold text-gray-800">
          Invite Your Friends
        </h2>

        <p className="text-sm text-gray-500">
          Invite up to 12 friends to grow your ripple giving.
        </p>

        {/* OPEN CONTACTS */}
        <Button
          onClick={handleOpenContacts}
          className="w-full bg-paul hover:bg-paul-dark text-white py-6 rounded-full"
        >
          Open Contacts
        </Button>

        {/* CONTACT LIST */}
        {contacts.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Selected Contacts ({contacts.length}/12)
            </h3>

            {contacts.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between bg-white rounded-2xl p-4"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.phone}</p>
                </div>

                <div className="flex items-center gap-2">
                  <LiaMinusCircleSolid
                    className="size-8 text-gray-400 hover:text-paul-dark cursor-pointer"
                    onClick={() => handleRemoveContact(c.id)}
                  />

                  <Button
                    onClick={() => handleSendSMS(c)}
                    disabled={c.sent || isSendingOneByOne}
                    className="bg-paul hover:bg-paul-dark text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingOneByOne ? (
                      <Loader2 className="size-4 animate-spin text-white" />
                    ) : (
                      <>
                        <span className=" text-sm ml-1">
                          {c.sent ? "Sent" : "Send"}
                        </span>
                        <IoIosSend className=" size-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MANUAL ENTRY - Only show if less than 12 contacts */}
        {contacts.length < 12 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Manual Entry</h3>

            {manualStage === "name" ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="Enter contact name"
                    className="rounded-2xl h-11"
                  />
                  <Button
                    onClick={() => setManualStage("phone")}
                    disabled={!manualName.trim()}
                    className="bg-paul hover:bg-paul-dark text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Name: <span className="font-medium">{manualName}</span>
                </p>
                <Input
                  type="tel"
                  value={manualNumber}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, "");
                    setManualNumber(value);
                  }}
                  placeholder="Enter phone number"
                  className="rounded-2xl h-11"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setManualStage("name")}
                    className="rounded-full"
                  >
                    Edit Name
                  </Button>
                  <Button
                    onClick={handleManualAdd}
                    disabled={!manualNumber}
                    className="bg-paul hover:bg-paul-dark text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Number
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONTINUE */}
        <Button
          onClick={handleContinue}
          disabled={!canContinue || isSubmittingContinue}
          className="w-full bg-paul hover:bg-paul-dark text-white py-6 rounded-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmittingContinue ? (
            <Loader2 className="size-4 animate-spin text-white" />
          ) : (
            "Continue"
          )}
        </Button>

      </div>
    </ScrollArea>
  );
}
