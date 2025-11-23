import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Auth",
  description: "Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={` antialiased bg-black w-full  sm:w-[420px] mx-auto min-h-[100vh] flex items-center justify-center`}>
      {children}
    </div>
  );
}
