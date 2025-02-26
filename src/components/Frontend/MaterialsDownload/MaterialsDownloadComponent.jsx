import React, { useEffect, useState } from "react";

import LockIcon from "@mui/icons-material/Lock";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { colorCode } from "../../Colors/ReusableColorCode";
import { useDispatch, useSelector } from "react-redux";
import { FetchMaterialsFrontendAsync } from "../../../redux/thunk/MaterialDownload";
import ReloadOrBackCard from "../../ReloadOrBackCard";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { fetchUserPlanDetailAsync } from "../../../redux/thunk/Dashboard";
function MaterialsDownloadComponent() {
  // const loopArr = new Array(8).fill("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userPlanDetail, userPlanDetailStatus } = useSelector(
    (state) => state.dashboard
  );

  const navigate = useNavigate();
  const {
    materialListFrontend,
    // materialListFrontendError,
    materialListFrontendStatus,
  } = useSelector((state) => state.material);
  const [userGuides, setUserGuides] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [assign, setAssign] = useState(true);
  const [allMaterialTypes, setAllMaterialTypes] = useState([]);
  const [typeGetError, setTypeGetError] = useState("");
  const [noMaterialTypeId, setNoMaterialTypeId] = useState(null);
  const [materialAccess, setMaterialAccess] = useState(false);
  useEffect(() => {
    dispatch(FetchMaterialsFrontendAsync({ path: "download-materials" }));
    dispatch(fetchUserPlanDetailAsync());

    setAssign(true);
  }, [dispatch]);

  useEffect(() => {
    setTypeGetError("");
    setAllMaterialTypes("");
    axios
      .get(process.env.REACT_APP_BACKEND_API + "material-types")
      .then((response) => {
        if (response.data.status == 1) {
          setAllMaterialTypes(response.data.data);
        } else {
          setTypeGetError(response.data.message);
        }
      })
      .catch((error) => {
        setTypeGetError(error.message);
      });
  }, []);

  useEffect(() => {
    if (materialListFrontendStatus === "succeeded" && assign) {
      setPredictions([]);
      materialListFrontend.forEach((m) => {
        if (m.material_type_id === 1) {
          setUserGuides((prev) => [...prev, m]);
        } else {
          setPredictions((prev) => [...prev, m]);
        }
      });
      setAssign(false);
    }
  }, [assign, materialListFrontendStatus, materialListFrontend]);

  useEffect(() => {
    if (
      materialListFrontendStatus === "succeeded" &&
      predictions !== null &&
      predictions.length !== 0 &&
      allMaterialTypes.length !== 0
    ) {
      allMaterialTypes.forEach((t) => {
        const result = predictions.find((p) => t.id === p.material_type_id);
        if (result === undefined) {
          setNoMaterialTypeId((prev) => {
            if (prev != null) {
              let updateArray = [...prev, t.id];
              return updateArray;
            } else {
              return [t.id];
            }
          });
        }
      });
    }
  }, [allMaterialTypes, predictions, materialListFrontendStatus]);
  useEffect(() => {
    if (userPlanDetailStatus === "succeeded") {
      const currentDate = new Date();
      const scoringDate = userPlanDetail?.user_plan.check_scoring_date
        ? new Date(userPlanDetail?.user_plan.check_scoring_date)
        : null;
      const mtScoringDate = userPlanDetail?.user_plan.check_mt_scoring_date
        ? new Date(userPlanDetail?.user_plan.check_mt_scoring_date)
        : null;

      if (currentDate <= scoringDate || currentDate <= mtScoringDate) {
        setMaterialAccess(true);
      }
    }
  }, [userPlanDetail, userPlanDetailStatus]);
  const MaterialBox = (props) => {
    const { text, btnText, onClickFunction, url, targetUser } = props;

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 2,
        }}
      >
        <Typography
          sx={{
            width: "60%",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {text}
        </Typography>
        {targetUser === "VIP" &&
        (user?.data?.aigma_user_type === null ||
          user?.data?.aigma_user_type === "Normal") &&
        user?.data?.role_id === 2 &&
        !materialAccess ? (
          <Button
            variant="contained"
            sx={{ width: "5rem", backgroundColor: "red" }}
            onClick={() =>
              swal({
                title: "Upgrade to VIP",
                text: "You can get access to VIP features by buying unlimited plan or coaching plan.",
                icon: "info",
                buttons: {
                  confirm: {
                    text: "Upgrade VIP",
                    value: true,
                    visible: true,
                    className: "custom-confirm-button",
                    closeModal: true,
                  },
                  cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "custom-cancel-button",
                    closeModal: true,
                  },
                },
              }).then((ok) => {
                if (ok) {
                  navigate("/user/subscription-plan");
                }
              })
            }
            size="small"
          >
            <LockIcon />
          </Button>
        ) : (
          <a
            href={process.env.REACT_APP_BACKEND_URL + "storage/" + url}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="contained"
              sx={{ width: "5rem" }}
              onClick={() => onClickFunction}
              size="small"
            >
              {btnText}
            </Button>
          </a>
        )}
      </Box>
    );
  };

  return (
    <>
      {user !== null && (
        <>
          <Box>
            {materialListFrontendStatus === "failed" && (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  top: "40%",
                  left: "40%",
                  backdropFilter: "blur(20px)",
                }}
              >
                <ReloadOrBackCard header="Failed to fetch data .You can try reload or refresh" />
              </Box>
            )}
            <Box
              sx={{
                background: colorCode.homeFrontColor.lightBlue,
                minHeight: "80vh",
                width: "100%",
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                flexWrap: "wrap",
                justifyContent: "space-between",
                p: 4,
              }}
            >
              {/* <Box sx={{ width: { xs: "100%", md: "45%" }, mb: 2 }}>
          <Typography variant="h5">User Guides Download</Typography>
          <Divider sx={{ borderBottomWidth: "0.5rem", mb: 2 }} />
          {materialListFrontendStatus === "loading" && <CircularProgress />}
          {materialListFrontendStatus === "failed" && (
            <Typography>Network failed</Typography>
          )}
          {materialListFrontendStatus === "succeeded" && (
            <>
              <Box
                sx={{
                  px: 2,
                  backgroundColor: "white",
                  py: 1,
                  borderRadius: "1rem",
                  boxShadow: 2,
                  maxHeight: "80vh",
                  minHeight: "40vh",
                  overflow: "auto",
                }}
              >
                {/* <MaterialBox
                  text={"WFD: 4 Rules to Prevent Loss of Points"}
                  btnText={"view"}
                ></MaterialBox>
                <Divider /> 
                {userGuides?.length === 0 && <>No Materials yet</>}
                {userGuides.map((u, id) => (
                  <MaterialBox
                    key={id}
                    text={u.name}
                    url={u.url}
                    btnText={"Download"}
                  ></MaterialBox>
                ))}
              </Box>
            </>
          )}
        </Box> */}

              {materialListFrontendStatus === "loading" && <CircularProgress />}
              {materialListFrontendStatus === "failed" && (
                <Typography>Network failed</Typography>
              )}
              {materialListFrontendStatus === "succeeded" &&
                typeGetError === "" &&
                allMaterialTypes.length !== 0 && (
                  <>
                    {allMaterialTypes.map(
                      (t, index) =>
                        t.name !== "User Guide" && (
                          <Box
                            sx={{ width: { xs: "100%", md: "45%" }, mb: 5 }}
                            key={index}
                          >
                            <Typography variant="h5">
                              PTE Study Material Downloads ({t.name})
                            </Typography>

                            <Divider
                              sx={{ borderBottomWidth: "0.5rem", mb: 2 }}
                            />
                            <Box
                              sx={{
                                px: 2,
                                backgroundColor: "white",
                                py: 1,
                                borderRadius: "1rem",
                                boxShadow: 1,
                                maxHeight: "80vh",
                                minHeight: "40vh",
                                overflow: "auto",
                              }}
                            >
                              {noMaterialTypeId?.includes(t.id) && (
                                <>No Materials yet</>
                              )}
                              {predictions?.length === 0 && (
                                <>No Materials yet</>
                              )}
                              {predictions.map(
                                (p, id) =>
                                  p.material_type_id === t.id && (
                                    <MaterialBox
                                      key={id}
                                      text={p.name}
                                      url={p.url}
                                      targetUser={p.target_user_type}
                                      userPlanDetail={
                                        userPlanDetail?.user_plan || null
                                      }
                                      btnText={"Download"}
                                    ></MaterialBox>
                                  )
                              )}
                            </Box>
                          </Box>
                        )
                    )}
                  </>
                )}
            </Box>
          </Box>
        </>
      )}
      {user === null && (
        <Box
          sx={{
            background: colorCode.homeFrontColor.lightBlue,
            minHeight: "80vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            These are VIP features .If you have a VIP account log in to get
            access to the materials.
          </Typography>
        </Box>
      )}
    </>
  );
}

export default MaterialsDownloadComponent;
