"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useGetPrivacyPolicyQuery } from "@/store/APIs/privacypolicyApi/privacypolicyApi";

interface PrivacySection {
  id: string;
  title: string;
  defaultExpanded?: boolean;
  content?: string;
}

function PrivacyPolicy() {
  const { data, isLoading, error } = useGetPrivacyPolicyQuery();

  const privacySections: PrivacySection[] = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return [];

    // Map API response items to sections
    return data.data.map((item, index) => ({
      id: item._id || `section-${index}`,
      title: item.title || "Privacy Policy",
      defaultExpanded: index === 0, // Expand first item by default
      content: item.content || "",
    }));
  }, [data]);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  // Initialize expansion once data loads
  React.useEffect(() => {
    if (privacySections.length > 0) {
      setExpandedSections(
        privacySections.reduce(
          (acc, section) => ({
            ...acc,
            [section.id]: section.defaultExpanded ?? false,
          }),
          {}
        )
      );
    }
  }, [privacySections]);

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
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto text-center ">
              We retain your personal phone number only for identity and influence reporting purposes. Any personal information provided to the charity is not visible to us or retained in our system. The information you provide to the receiving organization is used to process your donation.
            </p>
          </div>

          {/* Collapsible Sections */}
          <Card className="w-full max-w-3xl border-0 shadow-none ">
            <div className="space-y-0">
              {isLoading && (
                <div className="p-4 text-sm text-gray-500">Loading...</div>
              )}
              {error && (
                <div className="p-4 text-sm text-red-500">
                  Failed to load privacy policy.
                </div>
              )}
              {!isLoading && !error && privacySections.length === 0 && (
                <div className="p-4 text-sm text-gray-500">
                  No privacy policy available.
                </div>
              )}
              {!isLoading &&
                !error &&
                privacySections.map((section, index) => {
                  const isExpanded = expandedSections[section.id];
                  const isLast = index === privacySections.length - 1;

                  return (
                    <div key={section.id} className="w-full">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`w-full flex items-center justify-between p-4 bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors ${isLast && !isExpanded ? "rounded-b-lg" : ""
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
                          {section.content && (
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
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
          {/* <div className="w-full px-4 mt-6">
            <Button className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full">
              Contact Us for Data Requests
            </Button>
          </div> */}
        </div>
      </ScrollArea>
    </>
  );
}

export default PrivacyPolicy;
