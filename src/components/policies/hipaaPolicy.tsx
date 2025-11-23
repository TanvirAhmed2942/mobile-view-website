import React from "react";
import Banner from "../common/banner/Banner";
import Image from "next/image";

import { useTranslations } from "next-intl";

function HipaaPolicy() {
  const tHipaa = useTranslations("policies.hipaa");
  const sections = [
    {
      title: "Introduction",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis. Ultricies morbi ante convallis aliquam odio vehicula tincidunt consequat diam. Cursus blandit sodales tellus in nisl tempor. Sagittis lobortis egestas diam porta neque arcu. Nec nunc et malesuada praesent.",
    },
    {
      title: "Eligibility",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis.",
    },
    {
      title: "Use of Service",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis. Ultricies morbi ante convallis aliquam odio vehicula tincidunt consequat diam. Cursus blandit sodales tellus in nisl tempor. Sagittis lobortis egestas diam porta neque arcu. Nec nunc et malesuada praesent.",
    },
    {
      title: "Orders & Deliveries",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis.",
    },
    {
      title: "Payment & Billing",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis. Ultricies morbi ante convallis aliquam odio vehicula tincidunt consequat diam. Cursus blandit sodales tellus in nisl tempor. Sagittis lobortis egestas diam porta neque arcu. Nec nunc et malesuada praesent.",
    },
    {
      title: "User Responsibilities",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Cursus blandit sodales tellus in nisl tempor. Sagittis lobortis egestas diam porta neque arcu. Nec nunc et malesuada praesent.",
    },
    {
      title: "Company Rights",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt.",
    },
    {
      title: "Limitation of Liability",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam. Vitae massa sit door sed odio. Ut id lorem posuere purus facilisi tincidunt. Ac sit volutpat pulvinar dolor ut sagittis.",
    },
    {
      title: "Data Privacy & Security",
      content:
        "Lorem ipsum dolor sit amet consectetur. Cras ut gravida ipsum sit diam nulla massa nullam eu. Est feugiat ullamcorper amet posuere senean. Felis ornare turpis aliquam nisl amet nunc egestas. Pretium in odio massa donec nam.",
    },
  ];

  return (
    <div className="  min-h-screen bg-white">
      <Banner
        title={tHipaa("title")}
        description={tHipaa("description")}
        image="/policies/privacy_policy.png"
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {section.content}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          <Image
            src="/watermark.webp"
            alt="HIPAA Policy"
            width={1000}
            height={1000}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain opacity-40 w-full xl:w-[85%] 2xl:w-[95%] h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default HipaaPolicy;
