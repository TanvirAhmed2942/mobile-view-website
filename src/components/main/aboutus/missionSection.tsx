import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useIcon from "@/hooks/useIcon";

function MissionSection({
  missionTitle,
  missionDescription,
  visionTitle,
  visionDescription,
  headline,
}: {
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
  headline: string;
}) {
  return (
    <div className="my-8 sm:my-12 md:my-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <h2 className="heading-text text-center text-2xl sm:text-3xl md:text-4xl font-bold my-8 sm:my-12 md:my-16">
        {headline}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        {/* Mission Card */}
        <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="mx-auto mb-2 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 p-2 items-center justify-center rounded-full bg-[#f3ecf3]">
              {useIcon({ name: "target" })}
            </div>
          </CardHeader>
          <CardContent className="text-center px-4 sm:px-6 md:px-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              {missionTitle}
            </h3>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-6 text-gray-600">
              {missionDescription}
            </p>
          </CardContent>
        </Card>

        {/* Vision Card */}
        <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="mx-auto mb-2 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 p-2 items-center justify-center rounded-full bg-[#f3ecf3]">
              {useIcon({ name: "eye" })}
            </div>
          </CardHeader>
          <CardContent className="text-center px-4 sm:px-6 md:px-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              {visionTitle}
            </h3>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-6 text-gray-600">
              {visionDescription}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MissionSection;
