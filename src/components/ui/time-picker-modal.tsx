"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: string) => void;
  selectedTime?: string;
  selectedDate?: Date;
}

export default function TimePickerModal({
  isOpen,
  onClose,
  onTimeSelect,
  selectedTime,
  selectedDate,
}: TimePickerModalProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(selectedTime || "");
  const t = useTranslations("home.timePickerModal");
  // Generate time slots with AM/PM format
  const generateTimeSlots = () => {
    const morningSlots = [];
    const afternoonSlots = [];
    const eveningSlots = [];

    // Helper function to format time with AM/PM
    const formatTime = (hour: number, minute: number) => {
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      return `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    };

    // Morning slots (6:00 AM - 12:00 PM)
    for (let hour = 6; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const endHour = minute === 30 ? hour + 1 : hour;
        const endMinute = minute === 30 ? 0 : 30;

        const startTime = formatTime(hour, minute);
        const endTime = formatTime(endHour, endMinute);

        const timeSlot = `${startTime} - ${endTime}`;
        morningSlots.push(timeSlot);
      }
    }

    // Afternoon slots (12:00 PM - 4:00 PM)
    for (let hour = 12; hour < 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const endHour = minute === 30 ? hour + 1 : hour;
        const endMinute = minute === 30 ? 0 : 30;

        const startTime = formatTime(hour, minute);
        const endTime = formatTime(endHour, endMinute);

        const timeSlot = `${startTime} - ${endTime}`;
        afternoonSlots.push(timeSlot);
      }
    }

    // Evening slots (4:00 PM - 6:30 PM)
    for (let hour = 16; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const endHour = minute === 30 ? hour + 1 : hour;
        const endMinute = minute === 30 ? 0 : 30;

        const startTime = formatTime(hour, minute);
        const endTime = formatTime(endHour, endMinute);

        const timeSlot = `${startTime} - ${endTime}`;
        eveningSlots.push(timeSlot);
      }
    }

    return { morningSlots, afternoonSlots, eveningSlots };
  };

  const { morningSlots, afternoonSlots, eveningSlots } = generateTimeSlots();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleConfirm = () => {
    if (selectedTimeSlot) {
      onTimeSelect(selectedTimeSlot);
      onClose();
    }
  };

  const renderTimeSlots = (slots: string[], sectionName: string) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {sectionName}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot, index) => (
          <button
            key={`${sectionName}-${index}`}
            onClick={() => handleTimeSlotClick(slot)}
            className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
              selectedTimeSlot === slot
                ? "border-peter bg-peter text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white rounded-xl shadow-2xl border-0 p-0 max-h-[80vh] overflow-hiddden">
        {/* Header */}
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-bold text-gray-900">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        {/* Delivery date info */}
        <div className="px-6 py-2 bg-gray-50">
          <p className="text-sm text-gray-600">
            {t("description")}{" "}
            <span className="font-semibold text-peter">
              {selectedDate ? formatDate(selectedDate) : "Tuesday, July 23"}
            </span>
          </p>
        </div>

        {/* Time slots with scroll area */}
        <ScrollArea className="h-[300px] max-h-[350px] lg:h-[400px] lg:max-h-[450px]">
          <div className="p-6">
            {renderTimeSlots(morningSlots, t("morning"))}
            {renderTimeSlots(afternoonSlots, t("afternoon"))}
            {renderTimeSlots(eveningSlots, t("evening"))}
          </div>
        </ScrollArea>
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
            onClick={handleConfirm}
            className="flex-1 bg-peter hover:bg-peter-dark text-white"
            disabled={!selectedTimeSlot}
          >
            {t("confirmTime")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
