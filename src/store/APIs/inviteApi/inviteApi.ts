import { api } from "@/store/baseApi";

export interface Invitee {
  invitationForPhone: string;
  invitationForName: string;
}

export interface InviteUserRequest {
  myInvitees: Invitee[];
  donationAmount?: number;
  paymentMethod?: string;
  invitationIrecievedFrom: string; // parent phone number of the person who sent the invitation
}

export interface InviteUserRequestWithCampaign {
  campaignId: string;
  inviteData: InviteUserRequest;
}

export interface InviteUserOnebyOneRequest {
  parentPhone: string;
  newPhone: string;
  campaignId: string;
}

export interface ContinueSubmitRequest {
  amount: number;
  phone: string;
  campaignId: string;
}

export interface PaymentURLResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: string; // URL to redirect to
}

const inviteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    inviteUser: builder.mutation<void, InviteUserRequestWithCampaign>({
      query: ({ campaignId, inviteData }: InviteUserRequestWithCampaign) => {
        // campaignId is in the URL path, not in the body
        return {
          url: `/campaign/invite-donate/${campaignId}`,
          method: "POST",
          body: inviteData, // Only inviteData (without campaignId) goes in body
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    inviteUserOnebyOne: builder.mutation<void, InviteUserOnebyOneRequest>({
      query: (inviteData: InviteUserOnebyOneRequest) => {
        return {
          url: `/referral/invites`,
          method: "POST",
          body: inviteData, 
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    continueSubmit: builder.mutation<void, ContinueSubmitRequest>({
      query: (donationData: ContinueSubmitRequest) => {
        return {
          url: `/referral/donations`,
          method: "POST",
          body: donationData, 
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    paymentURL: builder.query<PaymentURLResponse, string>({
      query: (campaignId: string) => {
        return {
          url: `/campaign/app/internalTrackingId/campaign/${campaignId}`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useInviteUserMutation, useInviteUserOnebyOneMutation, useContinueSubmitMutation, usePaymentURLQuery } = inviteApi;
