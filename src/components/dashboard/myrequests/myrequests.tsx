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
import { Search } from "lucide-react";

// Dummy data for requests
const allRequests = [
  {
    id: 1,
    requestId: "#R78578",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "In-Progress",
  },
  {
    id: 2,
    requestId: "#R78578",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "Pending",
  },
  {
    id: 3,
    requestId: "#R78578",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "Completed",
  },
  {
    id: 4,
    requestId: "#R78578",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "In-Progress",
  },
  {
    id: 5,
    requestId: "#R78578",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "Pending",
  },
  {
    id: 6,
    requestId: "#R78578",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "In-Progress",
  },
  {
    id: 7,
    requestId: "#R78578",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "Completed",
  },
  {
    id: 8,
    requestId: "#R78578",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "In-Progress",
  },
  {
    id: 9,
    requestId: "#R78578",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "Pending",
  },
  {
    id: 10,
    requestId: "#R78578",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "Completed",
  },
  {
    id: 11,
    requestId: "#R78579",
    pharmacy: "Care First Pharmacy",
    address: "2456 Royal Ln. Mesa, New Jersey 45463",
    status: "In-Progress",
  },
  {
    id: 12,
    requestId: "#R78580",
    pharmacy: "MediCare Plus",
    address: "3891 Ranchview Dr. Richardson, California 62639",
    status: "Pending",
  },
  {
    id: 13,
    requestId: "#R78581",
    pharmacy: "Quick Meds Pharmacy",
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
    status: "Completed",
  },
  {
    id: 14,
    requestId: "#R78582",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "In-Progress",
  },
  {
    id: 15,
    requestId: "#R78583",
    pharmacy: "Wellness Pharmacy",
    address: "6391 Elgin St. Celina, Delaware 10299",
    status: "Pending",
  },
  {
    id: 16,
    requestId: "#R78584",
    pharmacy: "City Health Pharmacy",
    address: "8502 Preston Rd. Inglewoo, Maine 98380",
    status: "Completed",
  },
  {
    id: 17,
    requestId: "#R78585",
    pharmacy: "Care First Pharmacy",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    status: "In-Progress",
  },
  {
    id: 18,
    requestId: "#R78586",
    pharmacy: "MediCare Plus",
    address: "1109 Dane St. Fairview, Pennsylvania 19495",
    status: "Pending",
  },
  {
    id: 19,
    requestId: "#R78587",
    pharmacy: "Health Plus Pharmacy",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "Completed",
  },
  {
    id: 20,
    requestId: "#R78588",
    pharmacy: "Quick Meds Pharmacy",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    status: "In-Progress",
  },
];

const ITEMS_PER_PAGE = 10;

export default function MyRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter requests based on search and status
  const filteredRequests = allRequests.filter((request) => {
    const matchesSearch =
      request.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.pharmacy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In-Progress":
        return "bg-cyan-100 text-cyan-700 hover:bg-cyan-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
      case "Completed":
        return "bg-green-100 text-green-700 hover:bg-green-100";
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
    <div className="w-full ">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Request List</h1>

      <div className="flex gap-4 mb-6 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="size-5 absolute left-3 top-1/2 transform -translate-y-2 text-gray-400 " />
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
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-48 ">
            <SelectValue
              placeholder="Status: All"
              className="placeholder:text-gray-400 placeholder:text-[16px] h-12"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Status: All</SelectItem>
            <SelectItem value="In-Progress">In-Progress</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="font-semibold text-gray-600">
                Request ID
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Pharmacy Name
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Delivery Address
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium text-gray-900">
                  {request.requestId}
                </TableCell>
                <TableCell className="text-gray-700">
                  {request.pharmacy}
                </TableCell>
                <TableCell className="text-gray-700">
                  {request.address}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className=" flex items-center justify-between mt-6 ">
        <p className="text-sm text-gray-600 w-full">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredRequests.length)} of{" "}
          {filteredRequests.length} entries
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
          </Pagination>{" "}
        </div>
      </div>
    </div>
  );
}
