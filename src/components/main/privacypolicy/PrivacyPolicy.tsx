"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface PrivacySection {
  id: string;
  title: string;
  defaultExpanded?: boolean;
  introText?: string;
  items?: string[];
  content?: string;
}

const privacySections: PrivacySection[] = [
  {
    id: "whatWeCollect",
    title: "What We Collect",
    defaultExpanded: true,
    introText: "To provide our services, we collect the following information:",
    items: [
      "Your name, email address, and phone number.",
      "Payment information to process your donation securely.",
    ],
  },
  {
    id: "howWeUseIt",
    title: "How We Use It",
    defaultExpanded: false,
    introText: "We use the information we collect to:",
    items: [
      "Process and complete your donation transactions.",
      "Send you important updates about your donations and our services.",
      "Improve our platform and user experience.",
    ],
  },
  {
    id: "yourAnonymity",
    title: "Your Anonymity",
    defaultExpanded: false,
    content:
      "We respect your privacy and offer options to remain anonymous when making donations. You can choose to hide your name from public donation lists while still receiving acknowledgment for your contribution. Your personal information is never shared publicly without your explicit consent.",
  },
  {
    id: "whoSeesYourInfo",
    title: "Who Sees Your Info",
    defaultExpanded: false,
    introText: "Your information is only accessible to:",
    items: [
      "Our internal team members who need it to process your donations.",
      "Trusted payment processors who handle transaction security.",
      "Legal authorities only when required by law.",
    ],
  },
  {
    id: "security",
    title: "Security",
    defaultExpanded: false,
    introText:
      "We implement industry-standard security measures to protect your data:",
    items: [
      "SSL encryption for all data transmission.",
      "Secure payment processing through PCI-compliant partners.",
      "Regular security audits and updates to our systems.",
    ],
  },
  {
    id: "yourChoices",
    title: "Your Choices",
    defaultExpanded: false,
    introText: "You have the right to:",
    items: [
      "Access and review your personal information.",
      "Request corrections to inaccurate data.",
      "Delete your account and associated data.",
      "Opt-out of marketing communications.",
    ],
  },
];

function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(
    privacySections.reduce(
      (acc, section) => ({
        ...acc,
        [section.id]: section.defaultExpanded ?? false,
      }),
      {}
    )
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <>
      <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
        <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start pb-8">
          <NavBar />

          {/* Header Section */}
          <div className="w-full text-center space-y-3 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Privacy Policy
            </h1>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
              We keep your personal information safe, private, and only used for
              processing your donation.
            </p>
          </div>

          {/* Collapsible Sections */}
          <Card className="w-full max-w-3xl border-0 shadow-none ">
            <div className="space-y-0">
              {privacySections.map((section, index) => {
                const isExpanded = expandedSections[section.id];
                const isLast = index === privacySections.length - 1;

                return (
                  <div key={section.id} className="w-full">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-full flex items-center justify-between p-4 bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        isLast && !isExpanded ? "rounded-b-lg" : ""
                      }`}
                    >
                      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                        {section.title}
                      </h2>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    {isExpanded && (
                      <CardContent className="p-4 bg-white border-b border-gray-200 rounded-none">
                        {section.introText && (
                          <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                            {section.introText}
                          </p>
                        )}
                        {section.items && section.items.length > 0 && (
                          <ul className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-start gap-3"
                              >
                                <div className="w-2 h-2 rounded-full bg-paul mt-2 flex-shrink-0"></div>
                                <span className="text-sm md:text-base text-gray-600">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {section.content && (
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                            {section.content}
                          </p>
                        )}
                      </CardContent>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Contact Us Button */}
          <div className="w-full px-4 mt-6">
            <Button className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full">
              Contact Us for Data Requests
            </Button>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

export default PrivacyPolicy;
