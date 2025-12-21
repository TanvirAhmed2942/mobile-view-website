"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

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
    properties: string[],
    options?: { multiple?: boolean }
  ): Promise<ContactResult[]>;
}

declare global {
  interface Navigator {
    contacts?: ContactsManager;
  }
}

export default function Contact() {
  const router = useRouter();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [manualNumber, setManualNumber] = useState<string>("01743345476");

  // ✅ Open phone contact picker
  const handleOpenContacts = async () => {
    if (
      typeof window !== "undefined" &&
      "contacts" in navigator &&
      "ContactsManager" in window
    ) {
      try {
        const contactsManager = navigator.contacts as ContactsManager;
        const result = await contactsManager.select(["name", "tel"], {
          multiple: true,
        });

        const formatted: Contact[] = result.map(
          (c: ContactResult, i: number) => ({
            id: i,
            name: c.name?.[0] || "Unknown",
            phone: c.tel?.[0] || "",
          })
        );

        setContacts(formatted);
      } catch {
        alert("Contact selection cancelled");
      }
    } else {
      alert(
        "Contact access is not supported on this device. Please enter number manually."
      );
    }
  };

  // ✅ Manual add
  const handleManualAdd = () => {
    if (!manualNumber) return;

    setContacts((prev: Contact[]) => [
      ...prev,
      {
        id: Date.now(),
        name: "Manual Contact",
        phone: manualNumber,
      },
    ]);

    setManualNumber("");
  };

  const handleContinue = () => {
    router.push("/your-why");
  };

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] flex flex-col gap-6 p-4">
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
            <h3 className="text-lg font-semibold">Selected Contacts</h3>

            {contacts.map((c: Contact) => (
              <div
                key={c.id}
                className="flex items-center justify-between bg-white rounded-2xl p-4"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.phone}</p>
                </div>

                <Button className="bg-[#f2ebf4] hover:bg-[#e2d4e4] rounded-full">
                  <IoAddOutline className="text-paul size-5" />
                  <span className="text-paul text-sm ml-1">Add</span>
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* MANUAL ENTRY */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Manual Entry</h3>

          <Input
            type="tel"
            value={manualNumber}
            onChange={(e) => setManualNumber(e.target.value)}
            placeholder="Enter phone number"
            className="rounded-2xl h-11"
          />

          <Button
            onClick={handleManualAdd}
            className="bg-paul hover:bg-paul-dark text-white rounded-full"
          >
            Add Number
          </Button>
        </div>

        {/* CONTINUE */}
        <Button
          onClick={handleContinue}
          className="w-full bg-paul hover:bg-paul-dark text-white py-6 rounded-full mt-6"
        >
          Continue
        </Button>
      </div>
    </ScrollArea>
  );
}
