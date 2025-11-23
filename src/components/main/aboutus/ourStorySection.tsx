import React from "react";

function OurStorySection({
  headline,
  storyTimeline,
}: {
  headline: string;
  storyTimeline: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
}) {
  const items = storyTimeline;

  return (
    <div className="py-16 ">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 my-16">
          {headline}
        </h1>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-2 bottom-28 md:bottom-18 w-0.5 border-l-2 border-dashed border-gray-300 " />

          <div className="space-y-12 my-16">
            {items.map((item, idx) => (
              <div key={idx} className="relative flex gap-6">
                {/* Badge circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-peter flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                    {item.badge}
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 pb-2">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {item.subtitle}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurStorySection;
