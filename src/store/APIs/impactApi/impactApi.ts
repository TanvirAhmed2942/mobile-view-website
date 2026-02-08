import { api } from "@/store/baseApi";

export interface ImpactResponse {
  fundsRaised: number;
  invited: number;
  donated: number;
}

const impactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getImpact: builder.query<
      ImpactResponse,
      { currentUsersPhone: string; campaignId: string }
    >({
      query: ({
        currentUsersPhone,
        campaignId,
      }: {
        currentUsersPhone: string;
        campaignId: string;
      }) => ({
        url: `/referral/impact/${currentUsersPhone}?campaignId=${campaignId}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetImpactQuery } = impactApi;
