import { api } from "@/store/baseApi";

export interface LoginCredentials {
  role: string;
  name: string;
  contact: string;
}

export interface Authentication {
  oneTimeCode: number;
  expireAt: string;
  isResetPassword?: boolean;
  _id?: string;
}

export interface UserData {
  loggedinCampaigns: string[];
  _id: string;
  contact: string;
  createdAt: string;
  image: string;
  isDeleted: boolean;
  name: string;
  role: string;
  status: string;
  stripeCustomerId: string;
  totalDonated: number;
  totalInvited: number;
  totalLogin: number;
  totalRaised: number;
  updatedAt: string;
  userLevel: string;
  verified: boolean;
  __v: number;
  authentication: Authentication;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: UserData;
}

export interface VerifyOTPCredentials {
  oneTimeCode: number;
  contact: string;
  isForLogin: boolean;
  campaignId: string;
  /** Always true when verifying from the website. */
  isFromWebsite: boolean;
  /** Role from the welcome page login response (e.g. USER, SUPER_ADMIN). */
  role: string;
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
      query: ({
        oneTimeCode,
        contact,
        isForLogin,
        campaignId,
        isFromWebsite,
        role,
      }: VerifyOTPCredentials) => {
        return {
          url: "/auth/verify-otp",
          method: "POST",
          body: { oneTimeCode, contact, isForLogin, campaignId, isFromWebsite, role },
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
    optOut: builder.mutation({
      query: ({ contact }: { contact: string }) => {
        return {
          url: "/delete-user",
          method: "POST",
          body: { contact, isDeleted: true },
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useVerifyOTPMutation,
  useResendOtpMutation,
  useOptOutMutation,
} = authApi;
