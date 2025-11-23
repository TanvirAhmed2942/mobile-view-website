"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProfileInfoEditModal from "./profileInfoEditModal";

export default function Profile() {
  const profileData = {
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    email: "demo@demogmail.com",
    phone: "706-455-5214",
    dob: "12/08/1988",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-8">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            <div className="flex flex-col items-center space-y-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <Image
                  src={profileData.image}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>

              {/* Profile Information - Mobile Grid */}
              <div className="w-full grid grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">First Name</p>
                  <p className="text-base font-medium text-gray-900">
                    {profileData.firstName}
                  </p>
                </div>

                {/* Last Name */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Name</p>
                  <p className="text-base font-medium text-gray-900">
                    {profileData.lastName}
                  </p>
                </div>

                {/* Gender */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="text-base font-medium text-gray-900">
                    {profileData.gender}
                  </p>
                </div>

                {/* Email Address */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-base font-medium text-gray-900 break-words">
                    {profileData.email}
                  </p>
                </div>

                {/* Phone Number */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="text-base font-medium text-gray-900">
                    {profileData.phone}
                  </p>
                </div>

                {/* DOB */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">DOB</p>
                  <p className="text-base font-medium text-gray-900">
                    {profileData.dob}
                  </p>
                </div>
              </div>

              {/* Edit Profile Button - Mobile */}
              <div className="w-full">
                <Button
                  className="bg-peter hover:bg-peter-dark text-white w-full cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:block">
            <div className="flex items-start gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <Image
                  src={profileData.image}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>

              {/* Profile Information */}
              <div className="flex-1 grid grid-cols-3 gap-x-12 gap-y-6">
                {/* First Name */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">First Name</p>
                  <p className="text-base font-medium text-gray-900">
                    {profileData.firstName}
                  </p>
                </div>

                {/* Last Name */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Name</p>
                  <p className="text-base font-medium text-gray-900">
                    {profileData.lastName}
                  </p>
                </div>

                {/* Gender */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="text-base font-medium text-gray-900">
                    {profileData.gender}
                  </p>
                </div>

                {/* Email Address */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="text-base font-medium text-gray-900">
                    {profileData.email}
                  </p>
                </div>

                {/* Phone Number */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                  <p className="text-base font-medium text-gray-900">
                    {profileData.phone}
                  </p>
                </div>

                {/* DOB */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">DOB</p>
                  <p className="text-base font-medium text-gray-900">
                    {profileData.dob}
                  </p>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="flex-shrink-0">
                <Button
                  className="bg-peter hover:bg-peter-dark text-white px-6 cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Modal */}
        <ProfileInfoEditModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </>
  );
}
