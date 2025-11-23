"use client";
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell } from 'lucide-react';

// Dummy notification data
const notifications = [
  {
    id: 1,
    title: 'How much does it cost',
    message: 'Learn more about our clinic and doctors and why they are trusted by so many families in our community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community.',
    time: '10:15 AM',
  },
  {
    id: 2,
    title: 'How much does it cost',
    message: 'Learn more about our clinic and doctors and why they are trusted by so many families in our community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community.',
    time: '10:15 AM',
  },
  {
    id: 3,
    title: 'How much does it cost',
    message: 'Learn more about our clinic and doctors and why they are trusted by so many families in our community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community.',
    time: '10:15 AM',
  },
  {
    id: 4,
    title: 'How much does it cost',
    message: 'Learn more about our clinic and doctors and why they are trusted by so many families in our community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community.',
    time: '10:15 AM',
  },
  {
    id: 5,
    title: 'How much does it cost',
    message: 'Learn more about our clinic and doctors and why they are trusted by so many families in our community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community.',
    time: '10:15 AM',
  },
  {
    id: 6,
    title: 'How much does it cost',
    message: 'Learn more about our clinic and doctors and why they are trusted by so many families in our community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community.',
    time: '10:15 AM',
  },
  {
    id: 7,
    title: 'How much does it cost',
    message: 'Learn more about our clinic and doctors and why they are trusted by so many families in our community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community.',
    time: '10:15 AM',
  },
  {
    id: 8,
    title: 'How much does it cost',
    message: 'Learn more about our clinic and doctors and why they are trusted by so many families in our community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community. Learn more about our clinic and doctors a community.',
    time: '10:15 AM',
  },
];

export default function Notifications() {
  return (
    <div className="w-full h-[calc(100vh-125px)]">
      <ScrollArea className="h-full border border-gray-200 rounded-lg">
        <div className="bg-white rounded-lg border border-gray-200">
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <div className="flex gap-4 p-4 hover:bg-gray-50 transition-colors">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-base font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {notification.message}
                  </p>
                </div>
              </div>

              {/* Separator - don't show after last item */}
              {index < notifications.length - 1 && (
                <Separator className="bg-gray-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}