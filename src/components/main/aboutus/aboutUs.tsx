import React from "react";

import MissionSection from "./missionSection";
import OurStorySection from "./ourStorySection";

import OurValues from "./ourValues";
import { useTranslations } from "next-intl";

function AboutUs() {
  const t = useTranslations("aboutUs");
  return (
    <div className="bg-white">
      <div className=" min-h-screen container mx-auto px-4 space-y-16">
        <MissionSection
          headline={t("headline")}
          missionTitle={t("mission.title")}
          missionDescription={t("mission.description")}
          visionTitle={t("vision.title")}
          visionDescription={t("vision.description")}
        />
        <OurStorySection
          headline={t("ourStory.headline")}
          storyTimeline={
            t.raw("ourStory.storyTimeline") as {
              badge: string;
              title: string;
              subtitle: string;
              description: string;
            }[]
          }
        />
        <OurValues
          headline={t("ourValues.headline")}
          values={
            t.raw("ourValues.values") as {
              title: string;
              description: string;
              src: string;
            }[]
          }
        />
      </div>
    </div>
  );
}

export default AboutUs;
