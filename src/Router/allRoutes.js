import AccountDeactivatePage from "../Screens/AccountDeactivatePage/AccountDeactivatePage";
import EmailVerify from "../components/Backend/ForgotPassword/EmailVerify";
import forgotPassword from "../components/Backend/ForgotPassword/FpComponent";
import passwordReset from "../components/Backend/ForgotPassword/PasswordReset";
import ResetMail from "../components/Backend/ForgotPassword/ResetMail";
import LoginCard from "../components/Backend/LogInComponents/LogInCard";
import RegisterCard from "../components/Backend/RegisterComponents/RegisterCard";
import VerifyMail from "../components/Backend/RegisterComponents/VerifyMail";
import testscreen1 from "../Screens/Backend/testscreen1";
import testscreen2 from "../Screens/Backend/testscreen2";
import About from "../Screens/Frontend/About";
import Blog from "../Screens/Frontend/Blog";
import BlogDetails from "../Screens/Frontend/BlogDetails";
import Contact from "../Screens/Frontend/Contact";
import FeedbackPage from "../Screens/Frontend/FeedbackPage";
import Home from "../Screens/Frontend/Home";
import frontListening from "../Screens/Frontend/Listening";
import MaterialDownloadPage from "../Screens/Frontend/MaterialDownloadPage";
import frontMockTest from "../Screens/Frontend/MockTestTabs";
import Courses from "../Screens/Frontend/OnlineCourses";
import RecordingCourse from "../Screens/Frontend/RecordingCourse";

import PaymentStatus from "../Screens/Frontend/PaymentStatus";
import frontReading from "../Screens/Frontend/Reading";
import frontSpeaking from "../Screens/Frontend/Speaking";
import frontWriting from "../Screens/Frontend/Writing";
import EnrollForm from "../Screens/MultipurposeEnrollForm/EnrollForm";
import SubscriptionForm from "../Screens/SubscriptionForm/SubscriptionForm";
import AccountReactivatePage from "../Screens/AccountReactivatePage/AccountReactivatePage";
import ResendPage from "../Screens/ResendVerificationCode/ResendPage";
import MarkingPage from "../Screens/Frontend/MarkingPage";
import MaintenancePage from "../Screens/MaintenancePage/MaintenancePage";
import PTECorePage from "../components/Frontend/PTECore/PTECorePage";
import SubscriptionPlanPage from "../Screens/Frontend/SubscriptionPlanPage";
import Shop from "../components/Frontend/PTEShop/Shop";
import Cart from "../components/Frontend/PTEShop/Cart";
import ProductDetail from "../components/Frontend/PTEShop/ProductDetails";
import CheckOutPage from "../components/Frontend/PTEShop/CheckOutPage";
import RecordingCourseForm from "../Screens/SubscriptionForm/RecordingCourseForm";

const AllRoutes = [
  { path: "/", component: Home },
  { path: "/front/speaking", component: frontSpeaking },
  { path: "/front/listening", component: frontListening },
  { path: "/front/reading", component: frontReading },
  { path: "/front/writing", component: frontWriting },
  { path: "/front/mocktest", component: frontMockTest },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/front/onlineCourses/:path", component: Courses },
  { path: "/testscreen", component: testscreen1 },
  { path: "/testscreen/1", component: testscreen2 },


  { path: "/logIn", component: LoginCard },
  { path: "/register", component: RegisterCard },
  { path: "/forgotPassword", component: forgotPassword },
  { path: "/passwordReset", component: passwordReset },
  { path: "/resetmail", component: ResetMail },
  { path: "/verifymail", component: VerifyMail },
  { path: "/reset", component: VerifyMail },
  { path: "/email-verify/:resetPassword?", component: EmailVerify },
  { path: "/account-deactivate", component: AccountDeactivatePage },
  { path: "/account-reactivate", component: AccountReactivatePage },

  { path: "/enrollForm/:id/:name", component: EnrollForm },
  { path: "/subscription/form/", component: SubscriptionForm },
  { path: "/blog", component: Blog },
  { path: "/blog/details", component: BlogDetails },

  { path: "/payment-status", component: PaymentStatus },
  { path: "/materials-download", component: MaterialDownloadPage },
  { path: "/feedback", component: FeedbackPage },
  { path: "/resend/verification-code", component: ResendPage },
  { path: "/maintainence", component: MaintenancePage },
  { path: "/front/subscription-plan", component: SubscriptionPlanPage },
  { path: "/marking", component: MarkingPage },
  { path: "/pte-core", component: PTECorePage },
  { path: "/pte-shop", component: Shop },
  { path: "/pte-shop/cart", component: Cart },
  { path: "/pte-shop/check-out", component: CheckOutPage },
  {
    path: "/pte-shop/product-details/:id/:category_id",
    component: ProductDetail,
  },
  { path: "/shipping-detail-client/:id", component: ProductDetail },
  {path:"/recording-course",component:RecordingCourse} , 

  
  //Recording Course
  {path:"/recording-course/form",component:RecordingCourseForm  }

];

export default AllRoutes;
