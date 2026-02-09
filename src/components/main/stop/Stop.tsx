"use client";

import React, { useState } from "react";
import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";

function Stop() {
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const handleProceed = () => {
        if (!phoneNumber.trim()) {
            toast.error("Please enter your phone number.");
            return;
        }
        if (!isValidPhoneNumber(phoneNumber)) {
            toast.error("Please enter a valid phone number.");
            return;
        }
        toast.success(
            "To complete opt-out, reply STOP via SMS to the same number you received messages from."
        );
    };

    return (
        <>
            <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
                <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start pb-8">
                    <NavBar />

                    <div className="w-full text-center space-y-3 px-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Stop
                        </h1>
                        <p className="text-base text-gray-600">
                            Opt out of Pass It Along messages
                        </p>
                    </div>

                    <Card className="w-full max-w-3xl border-0 shadow-none">
                        <CardContent className="space-y-6">
                            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto text-center">
                                Your phone number is used as your user ID for receiving one-time
                                passcodes only. If you choose to leave the network, follow the
                                steps below. We never disclose your phone number—only you do when
                                you forward to friends.
                            </p>

                            <div className="space-y-4 max-w-md mx-auto">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="stop-phone"
                                        className="text-gray-700 font-medium text-sm"
                                    >
                                        Your phone number
                                    </Label>
                                    <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-paul focus-within:border-paul [&_.PhoneInput]:flex [&_.PhoneInput]:items-center [&_.PhoneInput]:w-full [&_.PhoneInputCountry]:border-0 [&_.PhoneInputCountry]:rounded-l-xl [&_.PhoneInputCountry]:h-11 [&_.PhoneInputCountry]:px-2 [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:rounded-r-xl [&_.PhoneInputInput]:h-11 [&_.PhoneInputInput]:px-4 [&_.PhoneInputInput]:outline-none">
                                        <PhoneInput
                                            id="stop-phone"
                                            international
                                            defaultCountry="US"
                                            value={phoneNumber}
                                            onChange={(value) => setPhoneNumber(value || "")}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    onClick={handleProceed}
                                    className="w-full bg-paul hover:bg-paul-dark text-white font-medium py-6 rounded-full"
                                >
                                    Proceed
                                </Button>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4 space-y-3 text-left max-w-2xl mx-auto">
                                <h3 className="font-semibold text-gray-800">
                                    How to stop (opt out)
                                </h3>
                                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                                    <li>Enter your phone number above and tap Proceed.</li>

                                    <li>
                                        You will be opted out and will no longer receive messages from
                                        us for that number.
                                    </li>
                                </ol>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>
        </>
    );
}

export default Stop;
