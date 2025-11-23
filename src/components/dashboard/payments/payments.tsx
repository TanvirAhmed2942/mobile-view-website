"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
// Dummy data for transactions
const allTransactions = [
  {
    id: 1,
    transactionId: "#78578",
    date: "15/01/2025",
    amount: 50.0,
    status: "Successful",
  },
  {
    id: 2,
    transactionId: "#78578",
    date: "15/01/2025",
    amount: 50.0,
    status: "Failed",
  },
  {
    id: 3,
    transactionId: "#78578",
    date: "15/01/2025",
    amount: 50.0,
    status: "Successful",
  },
  {
    id: 4,
    transactionId: "#78578",
    date: "15/01/2025",
    amount: 50.0,
    status: "Successful",
  },
  {
    id: 5,
    transactionId: "#78578",
    date: "15/01/2025",
    amount: 50.0,
    status: "Failed",
  },
  {
    id: 6,
    transactionId: "#78578",
    date: "15/01/2025",
    amount: 50.0,
    status: "Successful",
  },
  {
    id: 7,
    transactionId: "#78578",
    date: "15/01/2025",
    amount: 50.0,
    status: "Failed",
  },
  {
    id: 8,
    transactionId: "#78578",
    date: "15/01/2025",
    amount: 50.0,
    status: "Successful",
  },
  {
    id: 9,
    transactionId: "#78578",
    date: "15/01/2025",
    amount: 50.0,
    status: "Successful",
  },
  {
    id: 10,
    transactionId: "#78579",
    date: "16/01/2025",
    amount: 75.5,
    status: "Successful",
  },
  {
    id: 11,
    transactionId: "#78580",
    date: "16/01/2025",
    amount: 120.0,
    status: "Failed",
  },
  {
    id: 12,
    transactionId: "#78581",
    date: "17/01/2025",
    amount: 45.0,
    status: "Successful",
  },
  {
    id: 13,
    transactionId: "#78582",
    date: "17/01/2025",
    amount: 90.0,
    status: "Successful",
  },
  {
    id: 14,
    transactionId: "#78583",
    date: "18/01/2025",
    amount: 60.0,
    status: "Failed",
  },
];

const ITEMS_PER_PAGE = 10;

export default function Payments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRangeFilter, setDateRangeFilter] = useState("All");
  const router = useRouter();
  // Filter transactions based on search and status
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.transactionId
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.toString().includes(searchQuery);

    const matchesStatus =
      statusFilter === "All" || transaction.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Successful":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "Failed":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2
        );
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Transactions list
      </h1>

      <div className="flex gap-4 mb-6 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="size-5 absolute left-3 top-1/2 transform -translate-y-2 text-gray-400" />
          <Input
            placeholder="Type Something"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 h-12"
          />
        </div>

        <Select
          value={dateRangeFilter}
          onValueChange={(value) => {
            setDateRangeFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-48 ">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Date Range</SelectItem>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="This Week">This Week</SelectItem>
            <SelectItem value="This Month">This Month</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-48 ">
            <SelectValue placeholder="Status: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Status: All</SelectItem>
            <SelectItem value="Successful">Successful</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="font-semibold text-gray-600">
                Transaction ID
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Date
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Amount
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium text-gray-900">
                  {transaction.transactionId}
                </TableCell>
                <TableCell className="text-gray-700">
                  {transaction.date}
                </TableCell>
                <TableCell className="text-gray-700">
                  ${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <button
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() =>
                      router.push(
                        `/dashboard/payments/details/${transaction.id}`
                      )
                    }
                  >
                    <Eye className="size-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600 w-full">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredTransactions.length)} of{" "}
          {filteredTransactions.length} entries
        </p>

        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {renderPageNumbers().map((pageNum, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNum);
                    }}
                    isActive={currentPage === pageNum}
                    className={
                      currentPage === pageNum
                        ? "bg-peter hover:bg-peter/80 text-white"
                        : "cursor-pointer"
                    }
                  >
                    {pageNum.toString().padStart(2, "0")}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(totalPages);
                      }}
                      className="cursor-pointer"
                    >
                      {totalPages.toString().padStart(2, "0")}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
