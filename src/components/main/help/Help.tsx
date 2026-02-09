"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";




function Help() {



    return (
        <>
            <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
                <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start pb-8">
                    <NavBar />

                    {/* Header Section */}
                    <div className="w-full text-center space-y-3 px-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Help
                        </h1>

                    </div>

                    {/* Collapsible Sections */}
                    <Card className="w-full max-w-3xl border-0 shadow-none ">
                        <CardContent>
                            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto text-center ">Your phone number is used as your user ID and it becomes your opt-in for receiving one time passwords only. If you choose to not be in the network simply type STOP and you will be opt-out. Our app never discloses your phone number only you do when you forward to your friends.</p>
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>
        </>
    );
}

export default Help;
