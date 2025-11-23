import React from "react";
import { User, Calendar, Shield } from "lucide-react";

export default function ActivityLog() {
  const activities = [
    {
      id: 1,
      icon: User,
      title: "Profile Updated",
      description: "Changed Phone Number",
      time: "2 hours ago",
      iconBgColor: "bg-peter",
      iconColor: "text-white",
    },
    {
      id: 2,
      icon: Calendar,
      title: "Appointment Created",
      description: "Scheduled Appointment with John Doe.",
      time: "2 hours ago",
      iconBgColor: "bg-peter",
      iconColor: "text-white",
    },
    {
      id: 3,
      icon: Shield,
      title: "Security Settings Updated",
      description: "Enabled Two-Factor Authentication",
      time: "2 hours ago",
      iconBgColor: "bg-peter",
      iconColor: "text-white",
    },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Activity Log
        </h2>

        <div className="space-y-6">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full ${activity.iconBgColor} flex items-center justify-center`}
                >
                  <IconComponent className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900 mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
