import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get("MYNEXTAPP_LOCALE")?.value || "en";
  // Validate locale and fallback to "en" if invalid
  const locale = ["en", "es"].includes(cookieLocale) ? cookieLocale : "en";
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "UTC",
    now: new Date(),
    defaultTranslationValues: {
      timeZone: "UTC",
    },
  };
});
