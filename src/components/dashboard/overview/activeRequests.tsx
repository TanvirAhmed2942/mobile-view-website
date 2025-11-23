import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Dummy data for prescription requests
const prescriptionRequests = [
  {
    id: 1,
    status: 'In Progress',
    title: 'Prescription Pickup',
    scheduledTime: 'tomorrow, 10:00 AM',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    statusColor: 'bg-peter'
  },
  {
    id: 2,
    status: 'In Progress',
    title: 'Prescription Pickup',
    scheduledTime: 'tomorrow, 10:00 AM',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop',
    statusColor: 'bg-peter'
  },
  {
    id: 3,
    status: 'Ready',
    title: 'Prescription Pickup',
    scheduledTime: 'today, 2:00 PM',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop',
    statusColor: 'bg-green-500'
  },
  {
    id: 4,
    status: 'Pending',
    title: 'Prescription Pickup',
    scheduledTime: 'Oct 26, 3:00 PM',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=300&fit=crop',
    statusColor: 'bg-yellow-500'
  },
  {
    id: 5,
    status: 'In Progress',
    title: 'Prescription Pickup',
    scheduledTime: 'Oct 27, 11:00 AM',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop',
    statusColor: 'bg-peter'
  },
  {
    id: 6,
    status: 'Ready',
    title: 'Prescription Pickup',
    scheduledTime: 'today, 4:30 PM',
    image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=300&fit=crop',
    statusColor: 'bg-green-500'
  }
];

export default function ActiveRequests() {
  return (
    <div className="w-full max-w-4xl   ">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Active Requests</h1>
      
      <ScrollArea className="h-[600px] w-full rounded-lg border bg-white p-4">
        <div className="space-y-4">
          {prescriptionRequests.map((request) => (
            <Card key={request.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 p-4">
                  <div className="flex-1">
                    <Badge className={`${request.statusColor} text-white mb-2`}>
                      {request.status}
                    </Badge>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {request.title}
                    </h3>
                    <p className="text-gray-500">
                      Pickup scheduled for {request.scheduledTime}
                    </p>
                  </div>
                  <div className="w-32 h-24 flex-shrink-0">
                    <img
                      src={request.image}
                      alt="Prescription"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}