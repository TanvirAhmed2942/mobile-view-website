import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Bell } from 'lucide-react';

// Dummy data for notifications
const notifications = [
  {
    id: 1,
    title: 'How much does it cost',
    description: 'Learn more about our clinic and doctors and why they are trusted by so many families in our community. Learn more about our clinic and doctors a community.',
    time: '10:15 AM',
    isRead: false
  },
  {
    id: 2,
    title: 'How much does it cost',
    description: 'Learn more about our clinic and doctors and why they are trusted by so many families in our community. Learn more about our clinic and doctors a community.',
    time: '10:15 AM',
    isRead: false
  },
  {
    id: 3,
    title: 'How much does it cost',
    description: 'Learn more about our clinic and doctors and why they are trusted by so many families in our community. Learn more about our clinic and doctors a community.',
    time: '10:15 AM',
    isRead: false
  },
  {
    id: 4,
    title: 'Appointment Reminder',
    description: 'Your upcoming appointment with Dr. Smith is scheduled for tomorrow at 2:00 PM. Please arrive 15 minutes early for check-in.',
    time: '9:30 AM',
    isRead: true
  },
  {
    id: 5,
    title: 'Lab Results Available',
    description: 'Your recent lab test results are now available. Please log in to your patient portal to view them or contact your doctor for details.',
    time: '8:45 AM',
    isRead: true
  },
  {
    id: 6,
    title: 'Prescription Ready',
    description: 'Your prescription is ready for pickup at our pharmacy. Pharmacy hours are Monday-Friday 9 AM to 6 PM.',
    time: 'Yesterday',
    isRead: true
  },
  {
    id: 7,
    title: 'New Message from Doctor',
    description: 'Dr. Johnson has sent you a message regarding your treatment plan. Please review it in your messages section.',
    time: 'Yesterday',
    isRead: true
  },
  {
    id: 8,
    title: 'Health Tips',
    description: 'Stay healthy this season! Remember to drink plenty of water, get adequate sleep, and maintain a balanced diet.',
    time: '2 days ago',
    isRead: true
  }
];

export default function InpageNotifications() {
  return (
    <div className="w-full max-w-4xl   ">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Notifications</h1>
      
      <ScrollArea className="h-[600px] w-full rounded-lg border bg-white">
        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                !notification.isRead ? 'bg-purple-50' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !notification.isRead ? 'bg-[#be95be]/60' : 'bg-gray-200'
                  }`}>
                    <Bell className={`w-5 h-5 ${
                      !notification.isRead ? 'text-peter' : 'text-gray-600'
                    }`} />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-semibold text-gray-900 ${
                      !notification.isRead ? 'font-bold' : ''
                    }`}>
                      {notification.title}
                    </h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {notification.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}