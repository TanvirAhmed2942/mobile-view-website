"use client";
import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useDevice } from "@/hooks/use-device";
import { useTranslations } from "next-intl";
gsap.registerPlugin(ScrollTrigger);

export default function OurImpact() {
  const t = useTranslations("home.ourImpact");
  const stats = [
    {
      label: t("stats.0.label"),
      numericValue: 1500,
      src: "/howitworks/impact_1.webp",
      suffix: t("stats.0.suffix"),
    },
    {
      label: t("stats.1.label"),
      numericValue: 250,
      src: "/howitworks/impact_2.webp",
      suffix: t("stats.1.suffix"),
    },
    {
      label: t("stats.2.label"),
      numericValue: 18,
      suffix: t("stats.2.suffix"),
      src: "/howitworks/impact_3.webp",
    },
  ];

  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const device = useDevice();

  // Function to get ScrollTrigger start/end based on device
  const getScrollTriggerConfig = () => {
    if (device.isMobile) {
      return {
        start: "top 80%",
        end: "bottom 100%",
      };
    } else if (device.isTablet) {
      return {
        start: "top 80%",
        end: "bottom 50%",
      };
    } else if (device.isLaptop) {
      return {
        start: "top 80%",
        end: "bottom 20%",
      };
    } else if (device.isDesktop || device.isLg) {
      return {
        start: "top 100%",
        end: "bottom 80%",
      };
    } else if (device.isXl || device.is2Xl) {
      return {
        start: "top 60%",
        end: "bottom 30%",
      };
    }
    // Default fallback
    return {
      start: "top center",
      end: "bottom center",
    };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const { start, end } = getScrollTriggerConfig();

    statRefs.current.forEach((ref, idx) => {
      if (!ref) return;

      const stat = stats[idx];
      const obj = { value: 0 };

      gsap.to(obj, {
        value: stat.numericValue,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: start,
          end: end,
          scrub: true,
          onUpdate: () => {
            if (ref) {
              const formattedValue = Math.floor(obj.value).toLocaleString();
              ref.textContent = formattedValue + stat.suffix;
            }
          },
        },
      });
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device.device]);

  return (
    <>
      <div className=" bg-[#f3ecf3]  px-4 py-6 md:py-16" ref={containerRef}>
        <div className="max-w-6xl mx-auto ">
          <h1 className="text-4xl font-bold text-center text-peter pb-6 md:pb-16">
            {t("headline")}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {stats.map((stat, idx) => (
              <Card
                key={idx}
                className=" border-none shadow-lg relative overflow-hidden"
                // bg-peter
              >
                <div
                  className="absolute inset-0 blur-xs"
                  style={{
                    backgroundImage: `url(${stat.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <CardContent className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <span
                      ref={(el) => {
                        statRefs.current[idx] = el;
                      }}
                    >
                      0{stat.suffix}
                    </span>
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* <TransferPrescriptionSection /> */}
    </>
  );
}

// export const TransferPrescriptionSection = () => {
//   const router = useRouter();
//   return (
//     <div className="container mx-auto py-6 md:py-16 px-4 flex items-center justify-center">
//       <div className="w-full mx-auto">
//         <Card className="border border-gray-200 shadow-sm rounded-4xl">
//           <CardContent className="p-12 text-center">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Ready to experience the convenience
//               <br />
//               of Optimus Heath Solutions
//             </h2>

//             <p className="text-gray-600 text-base md:text-lg mb-8 max-w-2xl mx-auto">
//               Join thousands of satisfied patients who trust us with their
//               prescription delivery needs.
//             </p>

//             <Button
//               className="bg-peter hover:bg-peter-dark text-white px-8 py-6 text-base font-medium rounded-md cursor-pointer"
//               onClick={() => router.push("/transfer-prescription")}
//             >
//               Transfer a Prescription
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };
