import MtScoreCard from "../components/Backend/MockTest/MtScoreCard";
import ActivityLogsPage from "../Screens/Backend/ActivityLogsPage";
import AddBlogList from "../Screens/Backend/Admin/Blog/Add";
import EditBlogList from "../Screens/Backend/Admin/Blog/Edit";
//Subscription
import BlogList from "../Screens/Backend/Admin/Blog/List";
import TempMtList from "../Screens/Backend/Admin/TempMt/List";
//Course
import AddCourseList from "../Screens/Backend/Admin/Course/Add";
import EditCourseList from "../Screens/Backend/Admin/Course/Edit";
import CourseList from "../Screens/Backend/Admin/Course/List";
import AddFillInTheBlank from "../Screens/Backend/Admin/Listening/FillInTheBlank/Add";
import EditFillInTheBlank from "../Screens/Backend/Admin/Listening/FillInTheBlank/Edit";
import FillInTheBlank from "../Screens/Backend/Admin/Listening/FillInTheBlank/List";
//admin
//Listening
import AddMCSingleAnswer from "../Screens/Backend/Admin/Listening/MultipleChoiceSingleAns/Add";
import EditMCSingleAnswer from "../Screens/Backend/Admin/Listening/MultipleChoiceSingleAns/Edit";
import MCSingleAnswer from "../Screens/Backend/Admin/Listening/MultipleChoiceSingleAns/List";
//listening
// import MultipleChoiceScore from "../Screens/Backend/Score/Listening/MultipleChoice/List";
import AddSummarySpokenText from "../Screens/Backend/Admin/Listening/SummarySpokenText/Add";
import EditSummarySpokenText from "../Screens/Backend/Admin/Listening/SummarySpokenText/Edit";
import SummarySpokenText from "../Screens/Backend/Admin/Listening/SummarySpokenText/List";
import MaterialTabLists from "../Screens/Backend/Admin/MaterialsDownload/TabLists";
import TrialPlanList from "../Screens/Backend/Admin/Trial&Promotion/Trial/List";
import PromotionPlanList from "../Screens/Backend/Admin/Trial&Promotion/Promotion/List";
import EditPromotionPlan from "../Screens/Backend/Admin/Trial&Promotion/Promotion/Edit";
import EditTrialPlan from "../Screens/Backend/Admin/Trial&Promotion/Trial/Edit";
import FeedbackList from "../Screens/Backend/Admin/Feedback/List";
import FeedbackDetail from "../Screens/Backend/Admin/Feedback/Detail";
import FeedbackEdit from "../Screens/Backend/Admin/Feedback/Edit";
import FeedbackAdd from "../Screens/Backend/Admin/Feedback/Add";

import AddMaterialDownload from "../Screens/Backend/Admin/MaterialsDownload/Add";
import EditMaterialDownload from "../Screens/Backend/Admin/MaterialsDownload/Edit";
import AddMockTestList from "../Screens/Backend/Admin/MockTest/Add";
import EditMockTestList from "../Screens/Backend/Admin/MockTest/Edit";
//Mock test
import MockTestList from "../Screens/Backend/Admin/MockTest/List";
import R_FIBAdd from "../Screens/Backend/Admin/Reading/FIB&RWFIB/Add";
import R_FIBEdit from "../Screens/Backend/Admin/Reading/FIB&RWFIB/Edit";
import R_FIBList from "../Screens/Backend/Admin/Reading/FIB&RWFIB/List";
// import R_FIBAdd from "../Screens/Backend/Admin/Reading/FIB&RWFIB/Add";
// import R_FIBEdit from "../Screens/Backend/Admin/Reading/FIB&RWFIB/Edit";
// import R_FIBList from "../Screens/Backend/Admin/Reading/FIB&RWFIB/List";
//admin
//reading
import AddRMC from "../Screens/Backend/Admin/Reading/MultipleChoice/Add";
import EditRMC from "../Screens/Backend/Admin/Reading/MultipleChoice/Edit";
import RMCList from "../Screens/Backend/Admin/Reading/MultipleChoice/List";
import AddROP from "../Screens/Backend/Admin/Reading/ReorderParagraph/Add";
import EditROP from "../Screens/Backend/Admin/Reading/ReorderParagraph/Edit";
import ROPList from "../Screens/Backend/Admin/Reading/ReorderParagraph/List";
//admin
//speaking
import AddPostASQ from "../Screens/Backend/Admin/Speaking/AnswerShortQuestion/Add";
import EditPostASQ from "../Screens/Backend/Admin/Speaking/AnswerShortQuestion/Edit";
import AnswerShortQuestion from "../Screens/Backend/Admin/Speaking/AnswerShortQuestion/List";
import AddPostDI from "../Screens/Backend/Admin/Speaking/DescribeImage/Add";
import EditPostDI from "../Screens/Backend/Admin/Speaking/DescribeImage/Edit";
import DescribeImage from "../Screens/Backend/Admin/Speaking/DescribeImage/List";
import AddPostRA from "../Screens/Backend/Admin/Speaking/ReadAloud/Add";
import EditPostRA from "../Screens/Backend/Admin/Speaking/ReadAloud/Edit";
import ReadAloud from "../Screens/Backend/Admin/Speaking/ReadAloud/List";
import AddPostRTS from "../Screens/Backend/Admin/Speaking/ResponseToSituation/Add";
import EditPostRTS from "../Screens/Backend/Admin/Speaking/ResponseToSituation/Edit";
import AddPostRS from "../Screens/Backend/Admin/Speaking/RepeatSentence/Add";
import EditPostRS from "../Screens/Backend/Admin/Speaking/RepeatSentence/Edit";
import RepeatSentence from "../Screens/Backend/Admin/Speaking/RepeatSentence/List";
import AddPostRL from "../Screens/Backend/Admin/Speaking/RetellLecture/Add";
import EditPostRL from "../Screens/Backend/Admin/Speaking/RetellLecture/Edit";
import RetellLecture from "../Screens/Backend/Admin/Speaking/RetellLecture/List";
import AddSubscriptionList from "../Screens/Backend/Admin/Subscription/Plans/Add";
import EditSubscriptionList from "../Screens/Backend/Admin/Subscription/Plans/Edit";
//Subscription
import SubscriptionList from "../Screens/Backend/Admin/Subscription/Plans/List";
import EditTrainingList from "../Screens/Backend/Admin/Subscription/Training/Edit";
import TrainingList from "../Screens/Backend/Admin/Subscription/Training/List";
import AddVideoRecordingList from "../Screens/Backend/Admin/VideoRecording/Add";
import AddVideoRecordingType from "../Screens/Backend/Admin/VideoRecording/AddType";
import EditVideoRecordingList from "../Screens/Backend/Admin/VideoRecording/Edit";
import EditVideoRecordingType from "../Screens/Backend/Admin/VideoRecording/EditType";
//import VideoRecordingList from "../Screens/Backend/Admin/VideoRecording/List";
//Writing
import AddWriting from "../Screens/Backend/Admin/Writing/SummaryWrittenText/Add";
import EditWriting from "../Screens/Backend/Admin/Writing/SummaryWrittenText/Edit";
import WritingList from "../Screens/Backend/Admin/Writing/SummaryWrittenText/List";
//Test
//Listening
import TestMCAns from "../Screens/Backend/CourseTest/Listening/ChooseMultipleAns/Test";
import TestSCAns from "../Screens/Backend/CourseTest/Listening/ChooseSingleAns/Test";
import TestFIB from "../Screens/Backend/CourseTest/Listening/FillInBlank/Test";
import TestHCS from "../Screens/Backend/CourseTest/Listening/HighlightCorrectSummary/Test";
import TestHIW from "../Screens/Backend/CourseTest/Listening/HighlightIncorrectWords/Test";
import TestSMW from "../Screens/Backend/CourseTest/Listening/SelectMissingWord/Test";
import TestSST from "../Screens/Backend/CourseTest/Listening/SummarizeSpokenText/Test";
import TestWFD from "../Screens/Backend/CourseTest/Listening/WriteFromDictation/Test";
//Test
//Mocktest
import TestMTTabs from "../Screens/Backend/CourseTest/MockTest/MockTestTabs";
// import TestMT from "../Screens/Backend/CourseTest/MockTest/Test";
//Test
//reading
import TestRMCAns from "../Screens/Backend/CourseTest/Reading/ChooseMultipleAns/Test";
import TestRSCAns from "../Screens/Backend/CourseTest/Reading/ChooseSingleAns/Test";
import TestRFIB from "../Screens/Backend/CourseTest/Reading/FIB/Test";
import TestRWFIB from "../Screens/Backend/CourseTest/Reading/R&WFIB/Test";
import TestROP from "../Screens/Backend/CourseTest/Reading/ReorderParagraph/Test";
//Test
//Speaking
import TestASQ from "../Screens/Backend/CourseTest/Speaking/AnswerShortQuestion/Test";
import TestRTS from "../Screens/Backend/CourseTest/Speaking/ResponseToSituation/Test";
import TestDI from "../Screens/Backend/CourseTest/Speaking/DescribeImage/Test";
import TestRA from "../Screens/Backend/CourseTest/Speaking/ReadAloud/Test";
import TestRS from "../Screens/Backend/CourseTest/Speaking/RepeatSentence/Test";
import TestRL from "../Screens/Backend/CourseTest/Speaking/RetellLecture/Test";
//Test
//writing
import TestSWT from "../Screens/Backend/CourseTest/Writing/SWT/Test";
import TestWE from "../Screens/Backend/CourseTest/Writing/WriteEssay/Test";
import TestWEmail from "../Screens/Backend/CourseTest/Writing/WriteEmail/Test";
import Dashboard from "../Screens/Backend/Dashboard";

import QAndAPage from "../Screens/Backend/Help/QandAPage";
import FeedbackPage from "../Screens/Backend/Help/FeedbackPage";
import MaterialDownloadPage from "../Screens/Backend/Help/MaterialDownloadPage";
import Listening from "../Screens/Backend/Listening";
import CourseRegisterDetail from "../Screens/Backend/Members/CourseRegister/Detail";
import CourseRegisterList from "../Screens/Backend/Members/CourseRegister/List";
import SubscriptionRegisteredDetail from "../Screens/Backend/Members/Subscription/Detail";
import SubscriptionRegisteredList from "../Screens/Backend/Members/Subscription/List";
import AddUserList from "../Screens/Backend/Members/User/Add";
import UserDetails from "../Screens/Backend/Members/User/Details";
import EditUserList from "../Screens/Backend/Members/User/Edit";
//userlist
import UserList from "../Screens/Backend/Members/User/List";
import Reading from "../Screens/Backend/Reading";
import MultipleChoiceScore from "../Screens/Backend/Score/Listening/MultipleChoice/List";
import Detail from "../Screens/Backend/Score/Mocktest/Detail";
import MockTestScoreList from "../Screens/Backend/Score/Mocktest/List";
// import SstWfdScore from "../Screens/Backend/Score/Listening/SstWfd/List";

//reading
import ReadingMultipleChoiceScore from "../Screens/Backend/Score/Reading/MultipleChoice/List";
import AnswerShortQuestionScore from "../Screens/Backend/Score/Speaking/AnswerShortQuestion/List";
import ResponseToSituationScore from "../Screens/Backend/Score/Speaking/ResponseToSituation/List";
//score
import DescribeImageScore from "../Screens/Backend/Score/Speaking/DescribeImage/List";
//listening
// import MultipleChoiceScore from "../Screens/Backend/Score/Listening/MultipleChoice/List";
import ReadAloudScore from "../Screens/Backend/Score/Speaking/ReadAloud/List";
import RepeatSentenceScore from "../Screens/Backend/Score/Speaking/RepeatSentence/List";
import RetellLectureScore from "../Screens/Backend/Score/Speaking/RetellLecture/List";
//writing
import WritingScore from "../Screens/Backend/Score/Writing/SWT/List";
import Speaking from "../Screens/Backend/Speaking";
import SubscriptionShop from "../Screens/Backend/SubscriptionShop/SubscriptionShop";
import testscreen1 from "../Screens/Backend/testscreen1";
import UserPlanHistory from "../Screens/Backend/UserPlanHistory";

//Marketing
import AddEmailTemp from "../Screens/Backend/Admin/Marketing/EmailTemplate/Add";
import EditEmailTemp from "../Screens/Backend/Admin/Marketing/EmailTemplate/Edit";
import EmailTemplate from "../Screens/Backend/Admin/Marketing/EmailTemplate/List";

//Email Template
import AddShopEmailTemp from "../Screens/Backend/Admin/ShopEmail/Add";
import EditShopEmailTemp from "../Screens/Backend/Admin/ShopEmail/Edit";
import ShopEmailTemplate from "../Screens/Backend/Admin/ShopEmail/List";
import ShippingDetailList from "../Screens/Backend/Admin/ShopOrder/ShippingDetail/List";
import ShippingDetailEdit from "../Screens/Backend/Admin/ShopOrder/ShippingDetail/Edit";

//video recording

import Writing from "../Screens/Backend/Writing";
import SubscriptionPlan from "../Screens/Backend/Subscription/SubscriptionPlan";
import TrainingPackage from "../Screens/Backend/Subscription/TrainingPackage";
import VideoRecordingTabs from "../Screens/Backend/VideoRecordingTabs";
import VideoPlayPage from "../Screens/Backend/VideoPlayPage";
import TabLists from "../Screens/Backend/Admin/VideoRecording/TabLists";
import AddType from "../Screens/Backend/Admin/MaterialsDownload/AddType";
import EditType from "../Screens/Backend/Admin/MaterialsDownload/EditType";
import UserFeedbackList from "../Screens/Backend/Admin/Feedback/UserFeedbackList";
import ResponseToSituation from "../Screens/Backend/Admin/Speaking/ResponseToSituation/List";
import DailyPlanHistoryPage from "../Screens/Backend/Admin/DailyPlanHistory/DailyPlanHistoryPage";
import BannerList from "../Screens/Backend/Admin/Banner/List";
import AddBanner from "../Screens/Backend/Admin/Banner/Add";
import BannerEdit from "../Screens/Backend/Admin/Banner/Edit";
import ShopOrder from "../Screens/Backend/Admin/ShopOrder/List";
import List from "../Screens/Backend/Admin/ShopProduct/List";
import Edit from "../Screens/Backend/Admin/ShopProduct/Edit";
import Add from "../Screens/Backend/Admin/ShopProduct/Add";
import Details from "../Screens/Backend/Admin/ShopProduct/Details";
import ShippingDetailForm from "../components/Backend/Admin/Posts/ShippingDetailForm";
import SystemInfoTest from "../components/Backend/MockTest/SystemInfoTest";
import DiscountList from "../Screens/Backend/Admin/DiscoutForCoupon/List";
import DiscountAdd from "../Screens/Backend/Admin/DiscoutForCoupon/Add";
import DiscountEdit from "../Screens/Backend/Admin/DiscoutForCoupon/Edit";
import CouponList from "../Screens/Backend/Admin/Coupon/List";
import CouponAdd from "../Screens/Backend/Admin/Coupon/Add";
import CouponEdit from "../Screens/Backend/Admin/Coupon/Edit";
  
//Recording Class 
import AddRecordingClass from "../Screens/Backend/Admin/RecordingClass/Add";
import EditRecordingClass from "../Screens/Backend/Admin/RecordingClass/Edit";
import RecordingClass from "../Screens/Backend/Admin/RecordingClass/List";
import { compose } from "@reduxjs/toolkit";

 
const nestedRoutes = [
  { path: "/admin/dashboard", component: Dashboard },
  { path: "/admin/speaking", component: Speaking },
  { path: "/admin/listening", component: Listening },
  { path: "/admin/reading", component: Reading },
  { path: "/admin/writing", component: Writing },

  //CRUD
  //Speaking
  { path: "/admin/ra", component: ReadAloud },
  { path: "/admin/ra/add", component: AddPostRA },
  { path: "/admin/ra/edit/:id", component: EditPostRA },

  //admin rs
  { path: "/admin/rs", component: RepeatSentence },
  { path: "/admin/rs/add", component: AddPostRS },
  { path: "/admin/rs/edit/:id", component: EditPostRS },

  //admin di
  { path: "/admin/di", component: DescribeImage },
  { path: "/admin/di/add", component: AddPostDI },
  { path: "/admin/di/edit/:id", component: EditPostDI },

  //admin rl
  { path: "/admin/rl", component: RetellLecture },
  { path: "/admin/rl/add", component: AddPostRL },
  { path: "/admin/rl/edit/:id", component: EditPostRL },

  //admin rts
  { path: "/admin/rts", component: ResponseToSituation },
  { path: "/admin/rts/add", component: AddPostRTS },
  { path: "/admin/rts/edit/:id", component: EditPostRTS },

  //admin asq
  { path: "/admin/asq", component: AnswerShortQuestion },
  { path: "/admin/asq/add", component: AddPostASQ },
  { path: "/admin/asq/edit/:id", component: EditPostASQ },

  //Listening
  //admin mc-sa(needs to fix name all multiple choice commonly used one route for data entry and score)
  { path: "/admin/mc-sa", component: MCSingleAnswer },
  { path: "/admin/mc-sa/add", component: AddMCSingleAnswer },
  { path: "/admin/mc-sa/edit/:id", component: EditMCSingleAnswer },
  //admin sst
  { path: "/admin/sst/add", component: AddSummarySpokenText },
  { path: "/admin/sst/edit/:id", component: EditSummarySpokenText },
  { path: "/admin/sst", component: SummarySpokenText },
  //admin fib
  { path: "/admin/fib/add", component: AddFillInTheBlank },
  { path: "/admin/fib/edit/:id", component: EditFillInTheBlank },
  { path: "/admin/fib", component: FillInTheBlank },

  //Reading
  //admin r-mc-sa(needs to fix name all multiple choice commonly used one route for data entry and score)
  { path: "/admin/r-mc-sa", component: RMCList },
  { path: "/admin/r-mc-sa/add", component: AddRMC },
  { path: "/admin/r-mc-sa/edit/:id", component: EditRMC },

  { path: "/admin/r-rop", component: ROPList },
  { path: "/admin/r-rop/add", component: AddROP },
  { path: "/admin/r-rop/edit/:id", component: EditROP },

  //Writing
  { path: "/admin/swt-we", component: WritingList },
  { path: "/admin/swt-we/add", component: AddWriting },
  { path: "/admin/swt-we/edit/:id", component: EditWriting },

  //admin fib
  { path: "/admin/r-fib/add", component: R_FIBAdd },
  { path: "/admin/r-fib/edit/:id", component: R_FIBEdit },
  { path: "/admin/r-fib", component: R_FIBList },

  //ADMIN
  //Writing
  // { path: "/admin/we/add", component: AddWE },
  // { path: "/admin/we/edit/:id", component: EditWE },
  // { path: "/admin/we", component: WEList },

  // { path: "/admin/swt/add", component: AddSWT },
  // { path: "/admin/swt/edit/:id", component: EditSWT },
  // { path: "/admin/swt", component: SWTList },

  //ADMIN
  //course
  { path: "/admin/course", component: CourseList },
  { path: "/admin/course/add", component: AddCourseList },
  { path: "/admin/course/edit/:id", component: EditCourseList },
  //ADMIN
  //Subscription
  //plan
  { path: "/admin/subscription", component: SubscriptionList },
  { path: "/admin/subscription/add", component: AddSubscriptionList },
  { path: "/admin/subscription/edit/:id", component: EditSubscriptionList },
  //trainig
  { path: "/admin/training", component: TrainingList },
  { path: "/admin/training/edit/:id", component: EditTrainingList },

  //trial & promotion admin
  { path: "/admin/trial-plan", component: TrialPlanList },
  { path: "/admin/trial-plan/edit/:id", component: EditTrialPlan },
  { path: "/admin/promotion-plan", component: PromotionPlanList },
  { path: "/admin/promotion-plan/edit/:id", component: EditPromotionPlan },

  //BLOG
  { path: "/admin/blog", component: BlogList },
  { path: "/admin/blog/add", component: AddBlogList },
  { path: "/admin/blog/edit/:id", component: EditBlogList },

  //Admin
  //MockTest
  { path: "/admin/mocktestlist", component: MockTestList },
  { path: "/admin/mocktestlist/add", component: AddMockTestList },
  { path: "/admin/mocktestlist/edit/:id", component: EditMockTestList },

  //Temp mt
  { path: "/admin/temp-mt", component: TempMtList },

  //score
  //speaking
  { path: "/score/ra", component: ReadAloudScore },
  { path: "/score/rs", component: RepeatSentenceScore },
  { path: "/score/rl", component: RetellLectureScore },
  { path: "/score/di", component: DescribeImageScore },
  { path: "/score/asq", component: AnswerShortQuestionScore },
  { path: "/score/rts", component: ResponseToSituationScore },

  //listening
  { path: "/score/mc-sa", component: MultipleChoiceScore },
  // { path: "/score/fib-wfd", component: SstWfdScore },

  //reading
  { path: "/score/r-mc-sa", component: ReadingMultipleChoiceScore },

  //writing

  { path: "/score/swt", component: WritingScore },

  //testing route path and ui changes
  { path: "/user/testscreen", component: testscreen1 },

  //mock test
  { path: "/score/mocktest", component: MockTestScoreList },
  { path: "/score/mocktest/detail/:id", component: Detail },

  //test
  //speaking
  { path: "/ra/test", component: TestRA },
  { path: "/rs/test", component: TestRS },
  { path: "/rl/test", component: TestRL },
  { path: "/di/test", component: TestDI },
  { path: "/asq/test", component: TestASQ },
  { path: "/rts/test", component: TestRTS },

  //listening
  { path: "/mc-ma/test", component: TestMCAns },
  { path: "/mc-sa/test", component: TestSCAns },
  { path: "/hcs/test", component: TestHCS },
  { path: "/smw/test", component: TestSMW },
  { path: "/sst/test", component: TestSST },
  { path: "/wfd/test", component: TestWFD },
  { path: "/hiw/test", component: TestHIW },
  { path: "/fib/test", component: TestFIB },

  //reading
  { path: "/r-mc-ma/test", component: TestRMCAns },
  { path: "/r-mc-sa/test", component: TestRSCAns },
  { path: "/r-fib/test", component: TestRFIB },
  { path: "/r-r&wfib/test", component: TestRWFIB },
  { path: "/r-rop/test", component: TestROP },

  //writing
  { path: "/we/test", component: TestWE },
  { path: "/wemail/test", component: TestWEmail },
  { path: "/swt/test", component: TestSWT },

  //mocktest
  { path: "/mocktest/tabs", component: TestMTTabs },

  // { path: "/mocktest/test", component: TestMT },

  //students & member
  { path: "/admin/user/list", component: UserList },
  { path: "/admin/user/list/add", component: AddUserList },
  { path: "/admin/user/list/edit/:id", component: EditUserList },
  { path: "/admin/user/list/user-details/:id", component: UserDetails },
  {
    path: "/admin/register/subscription",
    component: SubscriptionRegisteredList,
  },
  {
    path: "/admin/register/subscription/detail/:id",
    component: SubscriptionRegisteredDetail,
  },

  //course register
  { path: "/admin/register/course/", component: CourseRegisterList },
  {
    path: "/admin/register/course/detail/:id",
    component: CourseRegisterDetail,
  },

  //subscription shop
  { path: "/admin/subscription-shop", component: SubscriptionShop },
  { path: "/admin/userPlan/history", component: UserPlanHistory },

  //scorecard
  { path: "/admin/mt-score-card", component: MtScoreCard },

  //vider recording
  //admin CRUD
  { path: "/admin/video-recording", component: TabLists },
  { path: "/admin/video-recording/add", component: AddVideoRecordingList },
  {
    path: "/admin/video-recording/edit/:id",
    component: EditVideoRecordingList,
  },
  //video recording list
  //admin CRUD

  { path: "/admin/video-recording/type/add", component: AddVideoRecordingType },
  {
    path: "/admin/video-recording/type/edit/:id",
    component: EditVideoRecordingType,
  },

  {
    path: "/user/video-recording",
    component: VideoRecordingTabs,
  },

  {
    path: "/user/video-recording/video-play",
    component: VideoPlayPage,
  },
  // support
  //feedback
  { path: "/dashboard/feedback", component: FeedbackPage },
  //question and answer
  { path: "/dashboard/question-and-answer", component: QAndAPage },
  //material
  { path: "/dashboard/materials-download", component: MaterialDownloadPage },
  //material admin CRUD
  { path: "/admin/materials-download", component: MaterialTabLists },
  { path: "/admin/materials-download/add", component: AddMaterialDownload },
  {
    path: "/admin/materials-download/edit/:id",
    component: EditMaterialDownload,
  },
  {
    path: "/admin/materials-download/type/add",
    component: AddType,
  },
  {
    path: "/admin/materials-download/type/edit/:id",
    component: EditType,
  },

  //feedback admin view
  { path: "/admin/feedback", component: FeedbackList },
  { path: "/admin/user-feedback", component: UserFeedbackList },
  { path: "/admin/user-feedback/detail/:id", component: FeedbackDetail },
  { path: "/admin/feedback/add", component: FeedbackAdd },
  { path: "/admin/feedback/edit/:id", component: FeedbackEdit },
  { path: "/admin/user-feedback/edit/:id", component: FeedbackEdit },

  //Activity logs
  { path: "/activity-logs", component: ActivityLogsPage },

  //subscription side bar
  { path: "/user/subscription-plan", component: SubscriptionPlan },
  { path: "/user/training-package", component: TrainingPackage },

  //Email Template
  { path: "/admin/email-template", component: EmailTemplate },
  { path: "/admin/email-template/add", component: AddEmailTemp },
  { path: "/admin/email-template/edit/:id", component: EditEmailTemp },

  //daily plan history records
  { path: "/daily-plan-history", component: DailyPlanHistoryPage },

  //banner
  { path: "/admin/banner", component: BannerList },
  { path: "/admin/banner/add", component: AddBanner },
  { path: "/admin/banner/edit/:id", component: BannerEdit },
  //shop order
  { path: "/admin/shop-order", component: ShopOrder },
  {
    path: "/admin/shop-order/shipping-detail/:id",
    component: ShippingDetailList,
  },
  {
    path: "/admin/shop-order/shipping-detail/:id/add",
    component: ShippingDetailForm,
  },
  {
    path: "/admin/shop-order/shipping-detail/:id/edit/:editId",
    component: ShippingDetailEdit,
  },
  //shop product
  { path: "/admin/shop-product", component: List },
  { path: "/admin/shop-product/add", component: Add },
  { path: "/admin/shop-product/edit/:id", component: Edit },
  { path: "/admin/shop-product/:id", component: Details },

  //Shop Email Template
  { path: "/admin/shop-email-template", component: ShopEmailTemplate },
  { path: "/admin/shop-email-template/add", component: AddShopEmailTemp },
  { path: "/admin/shop-email-template/edit/:id", component: EditShopEmailTemp },

  //Recording Class
  { path: "/admin/recording-class", component: RecordingClass },
  { path: "/admin/recording-class/add", component: AddRecordingClass },
  { path: "/admin/recording-class/edit/:id", component: EditRecordingClass },
  //System info test
  { path: "/admin/system-info-test", component: SystemInfoTest },
  //Shop Email Template
  { path: "/admin/discount", component: DiscountList },
  { path: "/admin/discount/add", component: DiscountAdd },
  { path: "/admin/discount/edit/:id", component: DiscountEdit },
  //coupon
  { path: "/admin/coupon", component: CouponList },
  { path: "/admin/coupon/add", component: CouponAdd },
  { path: "/admin/coupon/edit/:id", component: CouponEdit },

];

export default nestedRoutes;
