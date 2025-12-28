import { api } from "@/store/baseApi";

export interface Campaign {
  milestoneNotified?: boolean;
  _id: string;
  targetAmount: number;
  startDate: string;
  endDate: string;
  createdBy: string;
  overall_raised: number;
  description: string;
  title: string;
  address: string;
  donor_name: string;
  dafPartner: string;
  internalTrackingId: string;
  campaignStatus: string;
  total_donated: number;
  total_invitees: number;
  organization_name: string;
  organization_network: string;
  organization_type: string;
  organization_taxId: string;
  organization_website: string;
  organization_address: string;
  contactPerson_name: string;
  contactPerson_title: string;
  contactPerson_email: string;
  contactPerson_phone: string;
  cause_title: string;
  cause_description: string;
  cause_mission: string;
  cause_image: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  alert?: string;
  message?: string;
}

export interface CampaignMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface CampaignResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    meta: CampaignMeta;
    result: Campaign[];
  };
}

export interface CampaignByIdResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    result: Campaign;
    totalInvited: number;
    totalDonated: number;
  };
}

export interface ExpiredCampaignResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    totalInvited: number;
    totalDoners: number;
    totalDonated: number;
    newFunds: number;
  };
}

const campaignApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query<CampaignResponse, void>({
      query: () => `/campaign?sort=createdAt`,
    }),
    getCampaign: builder.query<Campaign, string>({
      query: (campaignId) => `/campaign/${campaignId}`,
      transformResponse: (response: CampaignResponse) => {
        // If response has data.result array, return first item
        // Otherwise assume it's a single campaign object
        if (response && typeof response === "object" && "data" in response) {
          const data = (response as CampaignResponse).data;
          if (data && "result" in data && Array.isArray(data.result)) {
            return data.result[0];
          }
        }
        return response as unknown as Campaign;
      },
    }),
    getCampaignById: builder.query<CampaignByIdResponse, string>({
      query: (campaignId) => `/campaign/${campaignId}`,
    }),
    expiredCampaign: builder.query<ExpiredCampaignResponse, string>({
      query: (campaignId) => `/campaign/${campaignId}?expired=true`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCampaignsQuery,
  useGetCampaignQuery,
  useGetCampaignByIdQuery,
  useExpiredCampaignQuery,
} = campaignApi;
