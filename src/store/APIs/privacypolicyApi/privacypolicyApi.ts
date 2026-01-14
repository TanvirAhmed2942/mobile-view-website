import { api } from "@/store/baseApi";

export interface PrivacyPolicyItem {
  _id: string;
  type: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PrivacyPolicyResponse {
  success: boolean;
  message: string;
  data: PrivacyPolicyItem[];
}

const privacypolicyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query<PrivacyPolicyResponse, void>({
      query: () => `/privacy-policy`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetPrivacyPolicyQuery } = privacypolicyApi;
