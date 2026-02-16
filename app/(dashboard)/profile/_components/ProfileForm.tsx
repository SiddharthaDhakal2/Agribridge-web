"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface ProfileFormProps {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  // Load saved profile data from localStorage on mount
  const [name, setName] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("profileData");
      if (saved) {
        const data = JSON.parse(saved);
        return data.name || user.name;
      }
    }
    return user.name;
  });
  
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("profileData");
      if (saved) {
        const data = JSON.parse(saved);
        return data.email || user.email;
      }
    }
    return user.email;
  });
  
  const [phone, setPhone] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("profileData");
      if (saved) {
        const data = JSON.parse(saved);
        return data.phone || "";
      }
    }
    return "";
  });
  
  const [address, setAddress] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("profileData");
      if (saved) {
        const data = JSON.parse(saved);
        return data.address || "";
      }
    }
    return "";
  });
  
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveChanges = () => {
    const profileData = { name, email, phone, address };
    console.log("Saving changes:", profileData);
    // Save to localStorage for cart page to use
    if (typeof window !== "undefined") {
      localStorage.setItem("profileData", JSON.stringify(profileData));
    }
    // Add your save logic here
  };

  const handleUpdatePassword = () => {
    console.log("Updating password");
    // Add your password update logic here
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get the first letter of the name for the avatar
  const avatarLetter = name.charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-full bg-green-700 flex items-center justify-center text-white text-2xl font-semibold overflow-hidden cursor-pointer"
              onClick={handleImageClick}
            >
              {profileImage ? (
                <Image 
                  src={profileImage} 
                  alt="Profile" 
                  width={64} 
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                avatarLetter
              )}
            </div>
            <button
              onClick={handleImageClick}
              className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center hover:bg-green-600 transition cursor-pointer"
              aria-label="Upload profile photo"
            >
              <svg 
                className="w-3 h-3 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=""
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <Input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder=""
              className="w-full"
            />
          </div>

          <Button 
            onClick={handleSaveChanges}
            className="bg-green-700 hover:bg-green-800 text-white"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            Save Changes
          </Button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password (Simulated)</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder=""
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder=""
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=""
              className="w-full"
            />
          </div>

          <Button 
            onClick={handleUpdatePassword}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
}
