"use client";

import React, { createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  role: string;
  isLoggedIn: boolean;
  dateOfBirth: string;
}

interface AuthContextType {
  user: User;
  isLoggedIn: boolean;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  toggleLogin: () => void; // For testing purposes
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUser: User = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  address: "123 Main St, Anytown, USA",
  city: "Anytown",
  state: "CA",
  zip: "12345",
  country: "USA",
  role: "user",
  dateOfBirth: "1990-01-01",
  isLoggedIn: false, // Start with false for testing
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  const login = (userData: Partial<User>) => {
    setUser((prev) => ({
      ...prev,
      ...userData,
      isLoggedIn: true,
    }));
  };

  const logout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  const toggleLogin = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: !prev.isLoggedIn,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user.isLoggedIn,
        login,
        logout,
        toggleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

