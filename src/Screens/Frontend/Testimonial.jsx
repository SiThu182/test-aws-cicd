import React, { useEffect, useState } from "react";

import {
  EffectFade,
  FreeMode,
  Navigation,
  Pagination,
  Mousewheel,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "./Testimonial.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFeedbacksByTypeAsync,
  FetchStudentFeedbackFrontendAsync,
} from "../../redux/thunk/Feedback";

// const TestimonialTemplate = ({ name = null, image, text = null }) => {
//   return (
//     <Box sx={{ width: "100%", height: "100%" }}>
//       <Box sx={{ display: "flex", justifyContent: "center" }}>
//         <Box
//           sx={{
//             background: "black",
//             width: "6rem",
//             height: "6rem",
//             borderRadius: "50%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             marginBottom: "-2rem",
//           }}
//         >
//           <Box
//             sx={{
//               overflow: "hidden",
//               borderRadius: "50%",
//               width: "5.5rem",
//               height: "5.5rem",
//             }}
//           >
//             <img
//               src={process.env.REACT_APP_BACKEND_URL + "storage/" + image}
//               style={{
//                 objectFit: "cover",
//                 objectPosition: "center",
//               }}
//               alt="open-quotation"
//             />
//           </Box>
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           margin: "0 auto",
//           height: "70%",
//           overflow: "hidden",

//           borderRadius: "1rem",
//           boxShadow: 3,
//         }}
//       >
//         <Box sx={{ padding: "2rem 0" }}>
//           <Typography variant="h5">{name}</Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             padding: "10px",
//           }}
//         >
//           <Box>
//             <Box
//               sx={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "flex-start",
//               }}
//             >
//               <Box sx={{ width: "10%" }}>
//                 <img
//                   src={
//                     process.env.REACT_APP_FRONTEND_URL +
//                     "Image/" +
//                     "openquotation.png"
//                   }
//                   alt="open-quotation"
//                 />
//               </Box>
//             </Box>

//             <Box
//               sx={{
//                 maxHeight: "15rem",
//                 overflow: "auto",
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <Typography variant="p" sx={{ color: "dark" }}>
//                 {text} lorem Yes, Install the WooCommerce cancel order plugin
//                 and allow your customers to cancel their orders from the account
//                 page.Yes, Install the WooCommerce cancel order plugin and allow
//                 your customers to cancel their orders from the account page.
//               </Typography>
//             </Box>
//             <Box
//               sx={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "flex-end",
//               }}
//             >
//               <Box sx={{ width: "10%" }}>
//                 <img
//                   src={
//                     process.env.REACT_APP_FRONTEND_URL +
//                     "Image/" +
//                     "closequotation.png"
//                   }
//                   alt="close-quotation"
//                 />
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

const Testimonial = () => {
  const dispatch = useDispatch();
  // const { feedbackListByType, feedbackListByTypeStatus } = useSelector(
  //   (state) => state.feedback
  // );
  const hStyle = {
    fontSize: {
      xs: "16px",
      sm: "17px",
      md: "1.7rem",
    },
    fontWeight: 600,
    pt: "1rem",
    pb: "1rem",
    textAlign: "center",
  };

  const [scoreCards, setScoreCards] = useState();

  const { feedback, feedbackStatus, feedbackError } = useSelector(
    (state) => state.studentFeedback
  );

  // const postPath = "student-feedback/Feedback";

  useEffect(() => {
    // dispatch(FetchFeedbacksByTypeAsync({ path: postPath }));

    dispatch(
      FetchStudentFeedbackFrontendAsync({ path: "student-feedback-list" })
    );
  }, [dispatch]);

  useEffect(() => {
    if (feedbackStatus === "succeeded") {
      console.log(feedback);
      let assignFeedbackByTypes = (type, setTypeArray) => {
        console.log("assigning");
        console.log(feedback[type], "Type 286");
        if (feedback[type]?.length > 0) {
          setTypeArray([...feedback[type]]);
        } else {
          setTypeArray([]);
        }
      };
      assignFeedbackByTypes("Score Card", setScoreCards);
    }
  }, [feedback, feedbackStatus]);

  console.log(scoreCards, "Score Card");
  return (
    <>
      <Typography variant="h3" sx={{ ...hStyle }}>
        Student Score & <span style={{ color: "#0CAFFF" }}>Review</span>
      </Typography>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        freeMode={true}
        style={{ height: "80%" }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, EffectFade, Pagination]}
        className="mySwiper"
      >
        {feedbackStatus === "succeeded" && scoreCards !== undefined ? (
          scoreCards.map((f, index) => (
            <SwiperSlide key={f.id} style={{}}>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  // src="http://localhost:3000/Image/BannerImg2.png"
                  src={`${process.env.REACT_APP_BACKEND_URL}storage/${f.image}`}
                  style={{ width: "100%", height: "auto" }}
                  alt="banner"
                  loading="lazy"
                />
              </Box>
            </SwiperSlide>
          ))
        ) : feedbackStatus === "loading" ? (
          <>Loading...</>
        ) : (
          <>Failed</>
        )}
        {/* {feedbackListByTypeStatus === "succeeded" ? (
          feedbackListByType.map((f, index) => (
            <SwiperSlide key={f.id}>
              <TestimonialTemplate
                name={f.name}
                image={f.image}
                text={f.description}
              />
            </SwiperSlide>
          ))
        ) : feedbackListByTypeStatus === "loading" ? (
          <>Loading...</>
        ) : (
          <>Failed</>
        )} */}
      </Swiper>
    </>
  );
};

export default Testimonial;
