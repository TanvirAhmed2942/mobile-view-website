import { api } from "@/store/baseApi";

export interface ProfileData {
  name: string;
  image?: File | null;
}

export interface UserProfileData {
  _id: string;
  name: string;
  role: string;
  contact: string;
  image: string;
  status: string;
  verified: boolean;
  isDeleted: boolean;
  stripeCustomerId: string;
  userLevel: string;
  totalRaised: number;
  totalDonated: number;
  totalInvited: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetMyProfileResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: UserProfileData;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: UserProfileData;
}

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<UpdateProfileResponse, ProfileData>({
      query: (profileData: ProfileData) => {
        const formData = new FormData();

        // Add data as JSON string
        formData.append("data", JSON.stringify({ name: profileData.name }));

        // Add image file if provided
        if (profileData.image) {
          formData.append("image", profileData.image);
        }

        return {
          url: `/users/profile`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["UserProfile"],
    }),
    getMyProfile: builder.query<GetMyProfileResponse, void>({
      query: () => `/users/profile`,
      providesTags: ["UserProfile"],
    }),
  }),
  overrideExisting: true,
});

export const { useUpdateProfileMutation, useGetMyProfileQuery } = userApi;
