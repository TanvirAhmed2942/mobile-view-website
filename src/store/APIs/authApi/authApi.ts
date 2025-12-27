import { api } from "@/store/baseApi";

export interface LoginCredentials {
  role: string;
  name: string;
  contact: string;
}

export interface Authentication {
  isResetPassword: boolean;
  oneTimeCode: number;
  expireAt: string;
  _id: string;
}

export interface UserData {
  name: string;
  role: string;
  contact: string;
  image: string;
  status: string;
  verified: boolean;
  isDeleted: boolean;
  stripeCustomerId: string;
  authentication: Authentication;
  userLevel: string;
  totalRaised: number;
  totalDonated: number;
  totalInvited: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: UserData[];
}

export interface VerifyOTPCredentials {
  oneTimeCode: number;
  contact: string;
  isForLogin: boolean;
}

export interface VerifyOTPResponseData {
  accessToken: string;
  isVerified: boolean;
  totalLogin: number;
  campaignId?: string; // Optional, only for SUPER_ADMIN
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: VerifyOTPResponseData;
}

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (loginCredentials: LoginCredentials) => {
        return {
          url: `/users`,
          method: "POST",
          body: loginCredentials,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    verifyOTP: builder.mutation<VerifyOTPResponse, VerifyOTPCredentials>({
      query: ({ oneTimeCode, contact, isForLogin }: VerifyOTPCredentials) => {
        return {
          url: "/auth/verify-otp",
          method: "POST",
          body: { oneTimeCode, contact, isForLogin },
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    resendOtp: builder.mutation({
      query: ({ email }: { email: string }) => {
        return {
          url: "/auth/resend-otp",
          method: "POST",
          body: { email },
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useVerifyOTPMutation, useResendOtpMutation } =
  authApi;
