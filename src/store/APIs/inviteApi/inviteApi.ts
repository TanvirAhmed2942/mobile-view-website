import { api } from "@/store/baseApi";

export interface Invitee {
  invitationForPhone: string;
  invitationForName: string;
}

export interface InviteUserRequest {
  myInvitees: Invitee[];
  donationAmount?: number;
  paymentMethod?: string;
  invitationIrecievedFrom: string; // userId of the person who sent the invitation
}

export interface InviteUserRequestWithCampaign {
  campaignId: string;
  inviteData: InviteUserRequest;
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
  }),
  overrideExisting: true,
});

export const { useInviteUserMutation } = inviteApi;
