"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateProfileMutation } from "@/store/APIs/userApi/userApi";
import { toast } from "sonner";
import { Pencil, Upload, X } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName?: string;
  currentImage?: string;
  onProfileUpdate?: (newName: string) => void;
}

function EditProfileModal({
  isOpen,
  onClose,
  currentName = "",
  currentImage = "",
  onProfileUpdate,
}: EditProfileModalProps) {
  const [name, setName] = useState(currentName);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // Update form when currentName or currentImage changes
  useEffect(() => {
    setName(currentName);
    setPreviewImage(currentImage);
  }, [currentName, currentImage]);

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
    setPreviewImage(currentImage);
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
      await updateProfile({
        name: name.trim(),
        image: selectedImage,
      }).unwrap();

      toast.success("Profile updated successfully");

      // Update parent component with new name
      if (onProfileUpdate) {
        onProfileUpdate(name.trim());
      }

      onClose();
      // Reset form
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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

  const handleClose = () => {
    // Reset form to original values
    setName(currentName);
    setSelectedImage(null);
    setPreviewImage(currentImage);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md p-6">
        <DialogHeader className="text-left pb-4">
          <DialogTitle className="text-xl font-bold text-gray-800">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 sm:w-24">
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
              {previewImage && previewImage !== currentImage && (
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
              onClick={handleClose}
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
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileModal;
