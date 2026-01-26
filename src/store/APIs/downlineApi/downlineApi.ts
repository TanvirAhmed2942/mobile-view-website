import { api } from "@/store/baseApi";

export interface DownlineLevel {
  level: number;
  invited: number;
  donated: number;
  funds: number;
}

export interface DownlineTotal {
  invited: number;
  donated: number;
  funds: number;
}

export interface DownlineResponse {
  levels: DownlineLevel[];
  total: DownlineTotal;
}

const downlineApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDownline: builder.query<DownlineResponse, { parentPhone: string; campaignId: string }>({
      query: ({ parentPhone, campaignId }: { parentPhone: string; campaignId: string }) => {
        return {
          url: `/referral/downline/${parentPhone}?campaignId=${campaignId}`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetDownlineQuery } = downlineApi;
