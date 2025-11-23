"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
}
export default function DatePickerModal({
  isOpen,
  onClose,
  onDateSelect,
  selectedDate,
}: DatePickerModalProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const t = useTranslations("home.datePickerModal");

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Get days from previous month to fill the grid
  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    { short: "S", full: "Sunday" },
    { short: "M", full: "Monday" },
    { short: "T", full: "Tuesday" },
    { short: "W", full: "Wednesday" },
    { short: "T", full: "Thursday" },
    { short: "F", full: "Friday" },
    { short: "S", full: "Saturday" },
  ];

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (day: number, isCurrentMonth: boolean = true) => {
    const date = new Date(
      currentYear,
      isCurrentMonth ? currentMonth : currentMonth + (isCurrentMonth ? 0 : 1),
      day
    );
    onDateSelect(date);
  };

  const isDateSelected = (day: number, isCurrentMonth: boolean = true) => {
    if (!selectedDate) return false;
    const date = new Date(
      currentYear,
      isCurrentMonth ? currentMonth : currentMonth + (isCurrentMonth ? 0 : 1),
      day
    );
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const renderCalendarDays = () => {
    const days = [];

    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <button
          key={`prev-${day}`}
          onClick={() => handleDateClick(day, false)}
          className={`w-10 h-10 rounded-full text-gray-400 hover:bg-gray-100 transition-colors ${
            isDateSelected(day, false) ? "bg-peter text-white" : ""
          }`}
        >
          {day}
        </button>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day);
      const isTodayDate = isToday(day);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`w-10 h-10 rounded-full transition-colors ${
            isSelected
              ? "bg-peter text-white"
              : isTodayDate
              ? "bg-[#f3ecf3] text-peter font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      );
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <button
          key={`next-${day}`}
          onClick={() => handleDateClick(day, false)}
          className={`w-10 h-10 rounded-full text-gray-400 hover:bg-gray-100 transition-colors ${
            isDateSelected(day, false) ? "bg-peter text-white" : ""
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-2xl border-0 p-0">
        {/* Header */}
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-bold text-gray-900">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        {/* Next delivery info */}
        <div className="px-6 py-2 bg-gray-50">
          <p className="text-sm text-gray-600">
            {t("description")}{" "}
            <span className="font-semibold text-gray-900">
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "July 24, 2025"}
            </span>
          </p>
        </div>

        {/* Calendar */}
        <div className="px-6 py-2">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day, index) => (
              <div
                key={`${day.full}-${index}`}
                className="w-10 h-10 flex items-center justify-center text-sm font-medium text-gray-500"
              >
                {day.short}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 p-6 border-t">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              if (selectedDate) {
                onDateSelect(selectedDate);
                onClose();
              }
            }}
            className="flex-1 bg-peter hover:bg-peter-dark text-white"
            disabled={!selectedDate}
          >
            {t("confirmDate")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
