import  React , {useState,useEffect} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Switch,
    Typography,
  } from "@mui/material";
  import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Backdrop from '@mui/material/Backdrop';
 import CardActions from '@mui/material/CardActions';
  import PropTypes from 'prop-types';
 import Tabs from '@mui/material/Tabs';
 import Tab from '@mui/material/Tab';
//  import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";

import {ClassicPlan} from '../Frontend/Home/offer&Subscription/PlanSwitchLayout';

import { useDispatch, useSelector } from "react-redux";
import { fetchSubscriptionPlanFrontendAsync } from '../../redux/thunk/Subscription';
import { CardStyle } from '../Frontend/Home/offer&Subscription/CardStyle';
import { setPath } from '../../redux/slice/PathSlice';
import Paper from '@mui/material/Paper';
 
   
const TextLine = (props) => {
    return (
      <Box sx={{ display: "flex", mb: 1 }}>
        <CheckCircleIcon
          sx={{
            mr: 1,
            color: "green",
            fontSize: {
              xs: "0.8rem",
              sm: "0.8rem",
              lg: "1rem",
              xl: "1.1rem",
            },
            mt: 0.5,
          }}
          className="check-icon"
        ></CheckCircleIcon>
        <Typography
          sx={{
            textAlign: "left",
            fontSize: {
              xs: "0.7rem",
              sm: "0.7rem",
              lg: "0.9rem",
              xl: "1rem",
            },
            fontWeight: "500",
          }}
        >
          {props.children}
        </Typography>
      </Box>
    );
  };

export const PreClassicPlan = (props) => {
 
    const { subscriptionFrontend, subscriptionFrontendStatus,hideTitle } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { country } = useSelector((state) => state.user);
    const clickBuyHandler = (plan, userType) => {
      dispatch(setPath());
      navigate("/subscription/form", {
        state: {
          plan: plan,
          userType:userType
        },
      });
    };
    return (
      <Box
        pb={5}
        sx={{
          width: {
            md: "90%",
            xl: "90%",
          },
          mx: "auto",
        }}
      >
            {/* <subscription title */}
            <Typography variant="h3" sx={{ ...CardStyle.hStyle }}>
            { hideTitle !== 1 && "SUBSCRIPTION PLAN"}
            </Typography>
            <Box>
            {subscriptionFrontendStatus === "succeeded" &&
            subscriptionFrontend !== "" &&
            subscriptionFrontend !== undefined ? (
                <Carousel
                swipeable={true}
                draggable={true}
                responsive={CardStyle.responsive}
                ssr={true} //means to render carousel on server-side.
                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlay={false}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all 1s ease"
                transitionDuration={1000}
                containerClass={props.containerClass}
                removeArrowOnDeviceType={["desktop", "laptop"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-50-px"
                >
                {subscriptionFrontend.map((s, index) => (
                    <Box
                    key={index}
                    sx={{
                        mb: 2,
                        py: 2,
    
                        // width: { sm: "100%", md: "30%", lg: "30%", xl: "30%" },
                    }}
                    >
                    <Card
                        sx={{
                        ...CardStyle.cardStyle,
                        "&.MuiPaper-root": {
                            overflow: "visible",
                        },
                        }}
                    >
                        <CardHeader
                        title={
                            <Typography
                            variant="h4"
                            sx={{
                                ...CardStyle.cardHeader,
                                fontSize: {
                                xs: "16px",
                                sm: "17px",
                                md: "1.6rem",
                                lg: "1.6rem",
                                },
                                color: "white",
                            }}
                            >
                            {s.name}
                            </Typography>
                        }
                        action={
                            s?.discount_status !== 0 && (
                            <>
                                <Box
                                sx={{
                                    position: "absolute",
                                    top: "-20%",
                                    right: "-10%",
                                    background: "white",
                                    borderRadius: "2rem",
                                    m: 0,
                                    p: 1,
                                    color: "red",
                                    border: "1px solid grey",
                                    boxShadow: 5,
                                    fontWeight: 800,
                                }}
                                >
                                <Typography variant="h5">
                                    {s.discount_percent}% Off
                                </Typography>
                                </Box>
                            </>
                            )
                        }
                        sx={{
                            ...CardStyle.planCardHeader,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }}
                        />
    
                        <CardContent
                        sx={{
                            height: {
                            xs: "19rem",
    
                            lg: "23rem",
                            },
                        }}
                        >
                        {/* 100$ / 1month */}
                        {s?.discount_status === 1 ? (
                            <>
                            <Typography
                                variant="h5"
                                component="h5"
                                sx={{ ...CardStyle.costStyle }}
                            >
                                <span style={{ textDecoration: "line-through" }}>
                                {s.show_fees}{" "}
                                {country !== "MMK"
                                    ? country === "USD"
                                    ? " USD"
                                    : " AUD"
                                    : " MMK"}
                                </span>
                                <br />
                                {(
                                s.show_fees -
                                (s.show_fees * s.discount_percent) / 100
                                ).toFixed(2)}
                                {country !== "Myanmar"
                                ? country === "USD"
                                    ? " USD"
                                    : " AUD"
                                : " MMK"}
                            </Typography>
                            </>
                        ) : (
                            <Typography
                            variant="h5"
                            component="h5"
                            sx={{ ...CardStyle.costStyle }}
                            >
                            {s.show_fees}
                            </Typography>
                        )}
                        {s.plan_type_id === 1 && (
                            <>
                            <TextLine>
                                {s.limited_status === 1 ? (
                                <span style={{ color: "red" }}>
                                    Unlimited practice for {s.number_of_day} days
                                </span>
                                ) : (
                                <span style={{ color: "red" }}>
                                    limited with {s.scoring_count}scoring count
                                </span>
                                )}
                            </TextLine>
                            <TextLine>
                                AI Scoring System based on{" "}
                                <span style={{ color: "red" }}> real-world </span>
                                test questions
                            </TextLine>
                            <TextLine>Practice Resource</TextLine>
                            {JSON.parse(s.description).map((d, index) => (
                                <TextLine key={index}>{d}</TextLine>
                            ))}
                            </>
                        )}
                        {s.plan_type_id === 2 && (
                            <>
                            <TextLine>
                                {s.mt_limited_status === 1 ? (
                                <>
                                    Unlimited scored mocktest for
                                    <span
                                    style={{ color: "red", fontWeight: "bold" }}
                                    >
                                    {" "}
                                    {s.mt_number_of_day} days
                                    </span>{" "}
                                </>
                                ) : (
                                <span>
                                    {s.mocktest_count} Ai Scoring Mock test based on
                                    <span style={{ color: "red" }}> real-world </span>
                                    test questions
                                </span>
                                )}
    
                                {/* {s.mocktest_count} Ai Scoring Mock test based on
                                    <span style={{ color: "red" }}> real-world </span>
                                    test questions */}
                            </TextLine>
                            {/* <TextLine>
                                    {s.mocktest_count} Ai Scoring Mock test based on
                                    <span style={{ color: "red" }}> real-world </span>
                                    test questions
                                </TextLine> */}
                            <TextLine>Practice Resource</TextLine>
                            <TextLine>Score Card within taken days</TextLine>
                            {typeof s.description === "string" &&
                            s.description.includes("[") ? (
                                JSON.parse(s.description).map((d, index) => (
                                <TextLine key={index}>{d}</TextLine>
                                ))
                            ) : (
                                <TextLine>{s.description}</TextLine>
                            )}
                            </>
                        )}
                        {s.plan_type_id === 5 && (
                            <>
                            <TextLine>
                                {s.limited_status === 1 ? (
                                <>
                                    Unlimited practice for
                                    <span
                                    style={{ color: "red", fontWeight: "bold" }}
                                    >
                                    {" "}
                                    {s.number_of_day} days
                                    </span>{" "}
                                </>
                                ) : (
                                <span style={{ color: "red" }}>
                                    limited with {s.scoring_count} scoring count
                                </span>
                                )}
                            </TextLine>
    
                            <TextLine>
                                {s.mt_limited_status === 1 ? (
                                <>
                                    Unlimited scored mocktest for
                                    <span
                                    style={{ color: "red", fontWeight: "bold" }}
                                    >
                                    {" "}
                                    {s.mt_number_of_day} days
                                    </span>{" "}
                                </>
                                ) : (
                                <span>
                                    {s.mocktest_count} Ai Scoring Mock test based on
                                    <span style={{ color: "red" }}> real-world </span>
                                    test questions
                                </span>
                                )}
    
                                {/* {s.mocktest_count} Ai Scoring Mock test based on
                                    <span style={{ color: "red" }}> real-world </span>
                                    test questions */}
                            </TextLine>
                            <TextLine>Practice Resource</TextLine>
                            <TextLine>Score Card within taken days</TextLine>
                            {typeof s.description === "string" &&
                            s.description.includes("[") ? (
                                JSON.parse(s.description).map((d, index) => (
                                <TextLine key={index}>{d}</TextLine>
                                ))
                            ) : (
                                <TextLine>{s.description}</TextLine>
                            )}
                            </>
                        )}
                        {s.plan_type_id === 4 && (
                            <>
                            <TextLine>
                                {JSON.parse(s.language_type_id).map((l, index) => (
                                <span key={index}>
                                    {" "}
                                    {l === 1
                                    ? "Speaking Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[index]
                                    : l === 2
                                    ? "Reading Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[index]
                                    : l === 4
                                    ? "Writing Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[index]
                                    : l === 3
                                    ? "Listeninng MockTest +" +
                                        JSON.parse(s.sectional_mocktest_count)[index]
                                    : ""}
                                </span>
                                ))}
                            </TextLine>
                            <TextLine>Practice Resource</TextLine>
                            <TextLine>Score Card within taken days</TextLine>
                            {typeof s.description === "string" &&
                            s.description.includes("[") ? (
                                JSON.parse(s.description).map((d, index) => (
                                <TextLine key={index}>{d}</TextLine>
                                ))
                            ) : (
                                <TextLine>{s.description}</TextLine>
                            )}
                            </>
                        )}
                        {s.plan_type_id === 8 && (
                            <>
                            <TextLine>
                                {s.limited_status === 1 ? (
                                <>
                                    <span style={{ color: "red" }}>
                                    Unlimited practice for
                                    </span>
                                    {s.number_of_day} days
                                </>
                                ) : (
                                <span style={{ color: "red" }}>
                                    limited practice with {s.scoring_count} scoring
                                    count
                                </span>
                                )}{" "}
                            </TextLine>
    
                            <TextLine>
                                {s.mt_limited_status === 1 ? (
                                <>
                                    Unlimited scored mocktest for
                                    <span
                                    style={{ color: "red", fontWeight: "bold" }}
                                    >
                                    {" "}
                                    {s.mt_number_of_day} days
                                    </span>{" "}
                                </>
                                ) : (
                                <span style={{ color: "red" }}>
                                    {s.mocktest_count} Ai Scoring Mock test based on
                                    <span style={{ color: "red" }}> real-world </span>
                                    test questions
                                </span>
                                )}
    
                                {/* {s.mocktest_count} Ai Scoring Mock test based on
                                    <span style={{ color: "red" }}> real-world </span>
                                    test questions */}
                            </TextLine>
                            {/* <TextLine>
                                    {s.mocktest_count} Ai Scoring Mock test based on
                                    <span style={{ color: "red" }}> real-world </span>
                                    test questions
                                </TextLine> */}
                            <TextLine>
                                {JSON.parse(s.language_type_id).map((l, index) => (
                                <span key={index}>
                                    {" "}
                                    {l === 1
                                    ? "Speaking Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[index]
                                    : l === 2
                                    ? "Reading Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[index]
                                    : l === 4
                                    ? "Writing Mock Test +" +
                                        JSON.parse(s.sectional_mocktest_count)[index]
                                    : l === 3
                                    ? "Listeninng MockTest +" +
                                        JSON.parse(s.sectional_mocktest_count)[index]
                                    : ""}{" "}
                                    {index !==
                                    JSON.parse(s.language_type_id).length - 1
                                    ? "|"
                                    : ""}
                                </span>
                                ))}
                            </TextLine>
                            <TextLine>Practice Resource</TextLine>
                            <TextLine>Score Card within taken days</TextLine>
                            {typeof s.description === "string" &&
                            s.description.includes("[") ? (
                                JSON.parse(s.description).map((d, index) => (
                                <TextLine key={index}>{d}</TextLine>
                                ))
                            ) : (
                                <TextLine>{s.description}</TextLine>
                            )}
                            </>
                        )}
                        </CardContent>
                        <Button
                        variant="outlined"
                        sx={{ ...CardStyle.subscribeBtn }}
                        onClick={() => clickBuyHandler(s,"userType")}
                        >
                        SUBSCRIBE
                        </Button>
                    </Card>
                    </Box>
                ))}
                </Carousel>
            ) : (
                <Box sx={{ display: "flex", width: "100%", height: "70vh" }}>
                <CircularProgress sx={{ m: "auto" }}></CircularProgress>
                </Box>
            )}
            {subscriptionFrontendStatus === "failed" && (
                <Typography textAlign="center">
                Failed .Please check your network & try reload
                </Typography>
            )}
            {subscriptionFrontendStatus === "succeeded" &&
                subscriptionFrontend.length === 0 && (
                <Typography textAlign="center" sx={{ height: "20vh" }}>
                    No subscription added yet
                </Typography>
                )}
            </Box>
      </Box>
    );
  };


export default function PreSubscribed() {

  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState("1");
  const [showPlan, setShowPlan] = useState("");
  const { country } = useSelector((state) => state.user);

  const { subscriptionFrontendStatus, subscriptionFrontend } = useSelector(
    (state) => state.subscription
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubscriptionPlanFrontendAsync());

    // setAssign();
  }, [dispatch]);

  useEffect(() => {
    if (subscriptionFrontendStatus === "succeeded") {
      const findShowPlan = () => {
        var result = subscriptionFrontend.filter(
          (s) => s.frontend_status === 1 && s.plan_type_id !== 9
        );

        let new_result = result.map((obj) => {
          let show_fees;
          if (country !== "MMK") {
            show_fees =
              country === "USD"
                ? (obj.oversea_fees * 0.65).toFixed(2)
                : obj.oversea_fees;
          } else {
            show_fees = obj.fees;
          }
          return { ...obj, show_fees: show_fees };
        });
        return new_result.sort(function (a, b) {
          return a.plan_order - b.plan_order;
        });
      };
      setShowPlan(findShowPlan);
    }
  }, [subscriptionFrontend, subscriptionFrontendStatus, country]);



  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    
    </Box>
  );
  
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
  

  return (
    <div>
      <Button onClick={handleOpen}>Show backdrop</Button>
      <Backdrop
 sx={{ 
    color: '#fff', 
    zIndex: (theme) => theme.zIndex.drawer + 1, 
    alignItems: 'flex-start', 
    paddingTop: '30px',
    paddingBottom:'30px'
  }}        open={open}
        // onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}
        <Card sx={{ width: '70%',height:'100%' }} variant="outlined">
        <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>  
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Trial  " value="1" />
            <Tab label="Subscription " value="2" />
            {/* <Tab label="Item Three" value="3" /> */}
          </TabList>
        </Box>
        <TabPanel value="1">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}> {/* Centering container */}
                <Card sx={{ width: '80%', height: '50px',bgcolor:'#568888' }}>
                <CardContent>
                    <Typography variant="body2" component="div">
                    Normal User
                    </Typography>
                </CardContent>
                </Card>
            </Box>
        </TabPanel>
        <TabPanel value="2">
            <PreClassicPlan
                subscriptionFrontend={showPlan}
                subscriptionFrontendStatus={subscriptionFrontendStatus}
                containerClass={"carousel-container-frontend"}
                hideTitle={1}
                componentForm={"pre-subscribe"}
            />
        </TabPanel>
        {/* <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
            </Box>
        </Card>

        
      </Backdrop>
    </div>
  );
}