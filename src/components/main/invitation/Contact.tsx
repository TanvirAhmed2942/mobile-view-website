"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LiaMinusCircleSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import NavBar from "@/components/common/navBar/navBar";
import { IoIosSend } from "react-icons/io";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { hydrateFromStorage } from "@/store/whySlice";
import { useInviteUserMutation } from "@/store/APIs/inviteApi/inviteApi";
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
// Helper function to decode JWT and get userId
const decodeJWT = (token: string): { id?: string } | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export default function ContactPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const whyMessage = useAppSelector((state) => state.why.whyMessage);
  const donationInfo = useAppSelector((state) => state.donation);
  const [inviteUser] = useInviteUserMutation();

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

    // Get campaignId from localStorage params_campaign_id
    let campaignId: string | null = null;
    if (typeof window !== "undefined") {
      campaignId = localStorage.getItem("params_campaign_id");
    }

    if (!campaignId) {
      toast.error(
        "Campaign not selected. Please go back and select a campaign."
      );
      return;
    }

    // Get userId from JWT token
    let userId = "";
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decoded = decodeJWT(accessToken);
        userId = decoded?.id || "";
      }
    }

    if (!userId) {
      toast.error("User not authenticated. Please login again.");
      return;
    }

    // Prepare invitees array
    const myInvitees = contacts.map((contact) => ({
      invitationForPhone: contact.phone,
      invitationForName: contact.name,
    }));

    // Prepare request payload
    const requestPayload: {
      myInvitees: Array<{
        invitationForPhone: string;
        invitationForName: string;
      }>;
      invitationIrecievedFrom: string;
      donationAmount?: number;
      paymentMethod?: string;
    } = {
      myInvitees,
      invitationIrecievedFrom: userId,
    };

    // Only include donation info if user is donating
    if (donationInfo.isDonating && donationInfo.donationAmount) {
      requestPayload.donationAmount = donationInfo.donationAmount;
      requestPayload.paymentMethod = donationInfo.paymentMethod || "bkash";
    }

    try {
      const response = await inviteUser({
        campaignId: campaignId,
        inviteData: requestPayload,
      }).unwrap();

      // Show success toast - check if response has a message
      const successMessage =
        (response as unknown as { message?: string })?.message ||
        "Invitations sent successfully!";
      toast.success(successMessage);

      // Navigate to redirect page after a short delay
      setTimeout(() => {
        router.push("/redirect");
      }, 1000);
    } catch (error) {
      console.error("Failed to send invitations:", error);
      const errorMessage =
        (error as { data?: { message?: string }; message?: string })?.data
          ?.message ||
        (error as { message?: string })?.message ||
        "Failed to send invitations. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleSendSMS = (contact: Contact) => {
    // Get the latest message from Redux (user's last modified version)
    const latestMessage = whyMessage;

    // Replace <FRIENDS NAME> placeholder with actual contact name
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
                    disabled={c.sent}
                    className="bg-paul hover:bg-paul-dark text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className=" text-sm ml-1">
                      {c.sent ? "Sent" : "Send"}
                    </span>
                    <IoIosSend className=" size-5" />
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
          disabled={!canContinue}
          className="w-full bg-paul hover:bg-paul-dark text-white py-6 rounded-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
        {!canContinue && (
          <p className="text-xs text-gray-500 text-center">
            ** Add at least 3 contacts to continue.
          </p>
        )}

        <p className="text-xs text-gray-400 text-center mt-2">
          We only access contacts you select. Nothing is stored without
          permission.
        </p>
      </div>
    </ScrollArea>
  );
}
