import { combineReducers } from "@reduxjs/toolkit";

import { authApi } from "../app/services/auth/authService";
import authSlice from "../features/auth/authSlice";
import blogSlice from "./slice/BlogSlice";
import countSlice from "./slice/CountSlice";
import courseSlice from "./slice/CourseSlice";
import dashboardSlice from "./slice/DashboardSlice";
import mtSlice from "./slice/MtSlice";
import mtTypeSlice from "./slice/MtTypeSlice";
import pathSlice from "./slice/PathSlice";
import postSlice from "./slice/PostSlice";
import subscriptionSlice from "./slice/SubscriptionSlice";
import userSlice from "./slice/UserSlice";
import mtFrontendSlice from "./slice/MtFrontendSlice";
import videoRecordingSlice from "./slice/VideoRecordingSlice";
import visitorSlice from "./slice/VisitorSlice";
import NetworkSlice from "./slice/NetworkSlice";
import SystemInfoAlertSlice from "./slice/SystemInfoAlertSlice";
import ActivityLogSlice from "./slice/ActivityLogSlice";
import AnswerAndDiscussionSlice from "./slice/AnswerAndDiscussionSlice";
import MaterialSlice from "./slice/MaterialSlice";
import FeedbackSlice from "./slice/FeedbackSlice";
import SideDrawerSlice from "./slice/SideDrawerSlice";
import TrialAndPromotionPlanSlice from "./slice/TrialAndPromotionPlanSlice";
import SaveNoteSlice from "./slice/NoteSlice";
import DailyPracticeSlice from "./slice/DailyPracticeSlice";
import EmailTemplateSlice from "./slice/EmailTemplateSlice";
import HomePageDataSlice from "./slice/HomePageDataSlice";
import StudentFeedbackSlice from "./slice/StudentFeedbackSlice";
import BannerSlice from "./slice/BannerSlice";
import OrderSlice from "./slice/OrderSlice";
import ProductSlice from "./slice/ProductSlice";
import ShopSlice from "./slice/ShopSlice";
import ShippingDetailSlice from "./slice/ShippingDetailSlice";
import ProductReviewSlice from "./slice/RatingSlice";
import RecordingCourseSlice from "./slice/RecordingCourseSlice";
const rootReducer = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  posts: postSlice,
  user: userSlice,
  dashboard: dashboardSlice,
  count: countSlice,
  mtType: mtTypeSlice,
  mockTest: mtSlice,
  mtFrontend: mtFrontendSlice,
  course: courseSlice,
  subscription: subscriptionSlice,
  path: pathSlice,
  network: NetworkSlice,
  blog: blogSlice,
  videoRecording: videoRecordingSlice,
  visitor: visitorSlice,
  systemInfoAlert: SystemInfoAlertSlice,
  activityLog: ActivityLogSlice,
  answerAndDiscussion: AnswerAndDiscussionSlice,
  material: MaterialSlice,
  feedback: FeedbackSlice,
  studentFeedback: StudentFeedbackSlice,
  sideDrawer: SideDrawerSlice,
  trialAndPromotion: TrialAndPromotionPlanSlice,
  saveNote: SaveNoteSlice,
  dailyPractice: DailyPracticeSlice,
  emailTemp: EmailTemplateSlice,
  homePageData: HomePageDataSlice,
  studentFeedback: StudentFeedbackSlice,
  banner: BannerSlice,
  order: OrderSlice,
  product: ProductSlice,
  shop: ShopSlice,
  rating: ProductReviewSlice,
  shippingDetails: ShippingDetailSlice,
  recordingCourse: RecordingCourseSlice,
});

export default rootReducer;
