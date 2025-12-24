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
  campaignId: string;
}

const inviteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    inviteUser: builder.mutation<void, InviteUserRequest>({
      query: (inviteData: InviteUserRequest) => {
        return {
          url: `/campaign/invite-donate/${inviteData.campaignId}`,
          method: "POST",
          body: inviteData,
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
