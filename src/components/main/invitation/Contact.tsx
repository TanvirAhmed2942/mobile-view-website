"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LiaMinusCircleSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import NavBar from "@/components/common/navBar/navBar";
import { IoIosSend } from "react-icons/io";
/* -------------------- Types -------------------- */
interface Contact {
  id: number;
  name: string;
  phone: string;
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

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [manualNumber, setManualNumber] = useState<string>("01743345476");

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
    if (!manualNumber) return;

    const phone = normalizePhone(manualNumber);

    setContacts((prev) => {
      if (prev.some((c) => c.phone === phone)) return prev;
      if (prev.length >= 12) return prev;

      return [
        ...prev,
        {
          id: Date.now(),
          name: "Manual Contact",
          phone,
        },
      ];
    });

    setManualNumber("");
  };

  const contactsList = ["01794685758", "01744687793"];

  const message = `Hey <FRIENDS NAME>,

I'm supporting [WHY from their prior page] and thought you might be interested too.

This app lets our message reach tens, hundreds, even thousands of connected friends. When you share with 12 friends, it starts a ripple effect of giving.

www.gopassit.org/friends

I started this with my $100 donation. Please click the link, share with friends, and consider donating. Cheers!`;

  const handleContinue = (): void => {
    router.push("/donate");
  };

  const handleSendSMS = () => {
    // Clean phone numbers
    const cleanedNumbers = contactsList.map((phone) =>
      phone.replace(/\s|-/g, "")
    );
    const encodedMessage = encodeURIComponent(message);

    // Copy message to clipboard as fallback
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message).catch(() => {
        // Clipboard failed, continue anyway
      });
    }

    // Try with all recipients - some SMS apps might support it
    // If not, at least recipients will be added and user can paste message
    const numbersString = cleanedNumbers.join(",");

    // Try opening SMS with all recipients
    // Note: Many mobile SMS apps don't support body with multiple recipients
    // In that case, recipients will be added but message won't pre-fill
    // User will need to paste the message (we copied it to clipboard)
    window.location.href = `sms:${numbersString}?body=${encodedMessage}`;
  };

  /* ---------- Remove contact ---------- */
  const handleRemoveContact = (id: number): void => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  /* -------------------- UI -------------------- */
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
                    onClick={handleSendSMS}
                    className="bg-paul hover:bg-paul-dark text-white rounded-full"
                  >
                    <span className=" text-sm ml-1">Send</span>
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

            <Button
              onClick={handleManualAdd}
              className="bg-paul hover:bg-paul-dark text-white rounded-full"
            >
              Add Number
            </Button>
          </div>
        )}

        {/* CONTINUE */}
        <Button
          onClick={handleContinue}
          className="w-full bg-paul hover:bg-paul-dark text-white py-6 rounded-full mt-6"
        >
          Continue
        </Button>

        <p className="text-xs text-gray-400 text-center mt-2">
          We only access contacts you select. Nothing is stored without
          permission.
        </p>
      </div>
    </ScrollArea>
  );
}
