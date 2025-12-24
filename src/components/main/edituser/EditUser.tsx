"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useUpdateProfileMutation,
  useGetMyProfileQuery,
} from "@/store/APIs/userApi/userApi";
import { toast } from "sonner";
import { Pencil, Upload, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/common/navBar/navBar";
import { ImageUrl } from "@/store/baseUrl";

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "";
  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  // Otherwise, prepend the base URL
  return `${ImageUrl()}${
    imagePath.startsWith("/") ? imagePath : `/${imagePath}`
  }`;
};

function EditUser() {
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: profileData, isLoading: isLoadingProfile } =
    useGetMyProfileQuery();
  const router = useRouter();

  // Load user data from API
  useEffect(() => {
    if (profileData?.data) {
      const userData = profileData.data;
      setName(userData.name);
      // Set preview image if available
      if (userData.image) {
        setPreviewImage(getImageUrl(userData.image));
      }
    }
  }, [profileData]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    // Reset to original image from API
    if (profileData?.data?.image) {
      setPreviewImage(getImageUrl(profileData.data.image));
    } else {
      setPreviewImage("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    try {
      const response = await updateProfile({
        name: name.trim(),
        image: selectedImage,
      }).unwrap();

      toast.success("Profile updated successfully");

      // Update localStorage with response data
      if (typeof window !== "undefined") {
        localStorage.setItem("nickName", response.data.name);
        // Store the full image URL if image was updated
        if (response.data.image) {
          const imageUrl = getImageUrl(response.data.image);
          localStorage.setItem("userImage", imageUrl);
          setPreviewImage(imageUrl);
        }
      }

      // Navigate back or to a specific page
      router.back();
    } catch (error: unknown) {
      const errorMessage =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data &&
        typeof error.data.message === "string"
          ? error.data.message
          : "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoadingProfile) {
    return (
      <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center gap-6">
        <NavBar />
        <div className="flex flex-col items-center justify-center gap-2 min-h-[400px]">
          <Loader2 className="w-10 h-10 animate-spin text-paul" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center gap-6">
      <div className="w-full  flex flex-col items-center gap-6 justify-start pb-8">
        <NavBar />
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h1 className="text-xl font-bold text-gray-800 mb-6">
              Edit Profile
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    {previewImage ? (
                      <AvatarImage
                        src={previewImage}
                        alt={name || "Profile"}
                        className="object-cover"
                      />
                    ) : null}
                    <AvatarFallback className="text-2xl bg-paul text-white">
                      {name ? getInitials(name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-7 h-7 bg-paul rounded-lg flex items-center justify-center border-2 border-white hover:bg-paul-dark transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5 text-white" />
                  </button>
                  {previewImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm border-gray-300"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {selectedImage ? "Change Image" : "Upload Image"}
                </Button>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-paul focus:border-transparent text-base"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-paul hover:bg-paul-dark text-white py-2.5"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
