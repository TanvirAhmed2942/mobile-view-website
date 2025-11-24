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
import { BarChart3 } from "lucide-react";
import React from "react";

function DowLine() {
  const tableData = [
    { level: "L0", invited: "12", donated: "3", funds: "$300" },
    { level: "L1", invited: "62", donated: "22", funds: "$2,200" },
    { level: "L2", invited: "435", donated: "38", funds: "$3,800" },
    { level: "L3", invited: "2,356", donated: "122", funds: "$12,200" },
    { level: "L4", invited: "10,444", donated: "1,256", funds: "$125,600" },
    { level: "L5", invited: "76,544", donated: "2,455", funds: "$245,500" },
  ];

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
          <div className="bg-white rounded-2xl  p-6 overflow-hidden">
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
                {tableData.map((row, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="font-medium text-paul py-4">
                      {row.level}
                    </TableCell>
                    <TableCell className="text-gray-800 py-4 text-right">
                      {row.invited}
                    </TableCell>
                    <TableCell className="text-gray-800 py-4 text-right">
                      {row.donated}
                    </TableCell>
                    <TableCell className="text-gray-800 py-4 text-right">
                      {row.funds}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Total Row */}
                <TableRow className="border-t-2 border-gray-200 hover:bg-transparent">
                  <TableCell className="font-medium text-gray-800 py-4">
                    TOT
                  </TableCell>
                  <TableCell className="text-gray-800 py-4 text-right font-medium">
                    89.8k
                  </TableCell>
                  <TableCell className="text-gray-800 py-4 text-right font-medium">
                    3.89k
                  </TableCell>
                  <TableCell className="text-paul py-4 text-right font-bold">
                    $389,300
                  </TableCell>
                </TableRow>
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
