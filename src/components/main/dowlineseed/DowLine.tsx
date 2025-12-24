"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart3, Loader2 } from "lucide-react";
import React, { useMemo } from "react";
import { useGetContentQuery } from "@/store/APIs/authApi/aboutusApi/aboutusApi";

// Helper function to format numbers with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};

// Helper function to format currency
const formatCurrency = (num: number): string => {
  return `$${formatNumber(num)}`;
};

// Helper function to format large numbers (e.g., 89.8k)
const formatLargeNumber = (num: number): string => {
  if (num >= 1000) {
    const k = num / 1000;
    return `${k.toFixed(1)}k`;
  }
  return formatNumber(num);
};

function DowLine() {
  const { data, isLoading, error } = useGetContentQuery();

  // Extract userLevelStrategy from API response
  const userLevelStrategy = useMemo(
    () => data?.data?.userLevelStrategy || [],
    [data?.data?.userLevelStrategy]
  );

  // Calculate totals
  const totals = useMemo(() => {
    const totalInvitation = userLevelStrategy.reduce(
      (sum, level) => sum + level.targetInvitation,
      0
    );
    const totalDonation = userLevelStrategy.reduce(
      (sum, level) => sum + level.targetDonation,
      0
    );
    const totalRaising = userLevelStrategy.reduce(
      (sum, level) => sum + level.targetRaising,
      0
    );
    return { totalInvitation, totalDonation, totalRaising };
  }, [userLevelStrategy]);

  if (isLoading) {
    return (
      <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
        <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center justify-center gap-6">
          <NavBar />
          <div className="flex flex-col items-center justify-center gap-2 min-h-[400px]">
            <Loader2 className="w-10 h-10 animate-spin text-paul" />
            <p className="text-gray-500">Loading downline levels...</p>
          </div>
        </div>
      </ScrollArea>
    );
  }

  if (error) {
    return (
      <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
        <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center justify-center gap-6">
          <NavBar />
          <p className="text-red-500">Failed to load downline levels.</p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start pb-8">
        <NavBar />

        {/* Header Section */}
        <div className="w-full text-center space-y-2 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Your Downline
          </h1>
          <p className="text-sm md:text-base text-gray-500">Seed #00001</p>
        </div>

        {/* Table Card */}
        <div className="w-full px-4">
          <div className="bg-white rounded-2xl p-6 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 hover:bg-transparent">
                  <TableHead className="text-gray-600 font-medium h-12">
                    LVL
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium h-12 text-right">
                    Invited
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium h-12 text-right">
                    Donated
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium h-12 text-right">
                    Funds
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userLevelStrategy.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-gray-500 py-8"
                    >
                      No downline levels available
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {userLevelStrategy.map((level, index) => (
                      <TableRow
                        key={level.level || index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <TableCell className="font-medium text-paul py-4">
                          {level.level}
                        </TableCell>
                        <TableCell className="text-gray-800 py-4 text-right">
                          {formatNumber(level.targetInvitation)}
                        </TableCell>
                        <TableCell className="text-gray-800 py-4 text-right">
                          {formatNumber(level.targetDonation)}
                        </TableCell>
                        <TableCell className="text-gray-800 py-4 text-right">
                          {formatCurrency(level.targetRaising)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Total Row */}
                    {userLevelStrategy.length > 0 && (
                      <TableRow className="border-t-2 border-gray-200 hover:bg-transparent">
                        <TableCell className="font-medium text-gray-800 py-4">
                          TOT
                        </TableCell>
                        <TableCell className="text-gray-800 py-4 text-right font-medium">
                          {formatLargeNumber(totals.totalInvitation)}
                        </TableCell>
                        <TableCell className="text-gray-800 py-4 text-right font-medium">
                          {formatLargeNumber(totals.totalDonation)}
                        </TableCell>
                        <TableCell className="text-paul py-4 text-right font-bold">
                          {formatCurrency(totals.totalRaising)}
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* View all Stats Button */}
        <div className="w-full px-4 mt-4">
          <Button className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full flex items-center justify-center gap-2">
            <BarChart3 className="w-5 h-5" />
            View all Stats
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

export default DowLine;
