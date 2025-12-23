import { api } from "@/store/baseApi";

export interface ProgressAlertSchedule {
  time: string;
}

export interface NotificationStrategy {
  progressAlertSchedule: ProgressAlertSchedule;
  campaignExpiredAlert: boolean;
  lowProgressWarning: boolean;
  mileStoneAlert: boolean;
  mileStoneAlertMessage: string;
  weeklyProgressAlert: boolean;
  weeklyProgressAlertMessage: string;
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface UserLevelStrategy {
  level: string;
  title: string;
  description: string;
  benefits: unknown[]; // no structure provided
  targetInvitation: number;
  targetDonation: number;
  targetRaising: number;
}

export interface PrivacyPolicy {
  whatWeCollect: string;
  howWeUseIt: string;
  yourAnonymity: string;
  whoSeesYourInfo: string;
  security: string;
  yourChoices: string;
}

export interface ContentData {
  notificationStrategy: NotificationStrategy;
  _id: string;
  appName: string;
  logo: string;
  type: string;
  founders: Founder[];
  ourMission: string;
  howWeOperate: string;
  aboutRefugeForWomen: string;
  introduction: string;
  citiesServed: number;
  yearsOfOperation: number;
  survivorsSupported: number;
  userLevelStrategy: UserLevelStrategy[];
  gallery: string[];
  privacyPolicy: PrivacyPolicy;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface ContentResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: ContentData;
}

const aboutusApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContent: builder.query<ContentResponse, void>({
      query: () => ({
        url: `/content`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetContentQuery } = aboutusApi;
