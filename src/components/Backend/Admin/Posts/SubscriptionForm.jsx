import {
  Button,
  Checkbox,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import {
  fetchShowFrontendCountAsync,
  fetchSubscriptionTypeAsync,
} from "../../../../redux/thunk/Subscription";
import { FormStyle } from "./FormStyle";
import TextInput from "./Form/TextInput";
import FormRadioGroup from "./Form/FormRadioGroup";
import SelectInput from "./Form/SelectInput";
import { getCookie } from "../../../../Utils/GetCookies";

function SubscriptionFormComponent(props) {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      myRadio: props.edit === "edit" ? props.editMediaType : "",

      description:
        props.edit === "edit" &&
        props.editPost.description !== null &&
        JSON.parse(props.editPost.description).map((data) => ({
          name: data,
        })),
      descriptionBurmese:
        props.edit === "edit" &&
        props.editPost?.description_burmese !== null &&
        JSON.parse(props.editPost?.description_burmese).map((data) => ({
          name: data,
        })),
    },
  });

  const uStatus = watch("unlimitedStatus");
  const mtUnlimitedStatus = watch("mtUnlimitedStatus");

  const selectType = watch("subscriptionType");
  const discountStatus = watch("discountStatus");
  const showFrontend = watch("showFrontend");

  // const languageTypeId = watch("languageType");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const path = props.addPath;

  const [checkedArray, setCheckedArray] = useState([]);
  const [currentId, setCurrentId] = useState();
  const [checkedAssign, setCheckedAssign] = useState([]);

  const languageType = [
    {
      id: 1,
      type: "Speaking",
    },
    {
      id: 2,
      type: "Reading",
    },
    {
      id: 3,
      type: "Listening",
    },
    {
      id: 4,
      type: "Writing",
    },
  ];
  const {
    subscriptionType,
    subscriptionTypeStatus,
    showFrontendCount,
    showFrontendCountStatus,
    showFrontendCountError,
  } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(fetchSubscriptionTypeAsync("subscription-plan-types"));
    dispatch(fetchShowFrontendCountAsync());
  }, [dispatch]);

  const {
    fields: fieldList,
    remove: removeList,
    append: appendList,
  } = useFieldArray({ control, name: "description" });

  const {
    fields: fieldList1,
    remove: removeList1,
    append: appendList1,
  } = useFieldArray({ control, name: "descriptionBurmese" });

  const addField = () => {
    appendList({ name: "" });
  };

  const addField1 = () => {
    appendList1({ name: "" });
  };

  const removeField = () => {
    removeList(fieldList.length - 1);
  };

  const removeField1 = () => {
    removeList1(fieldList1.length - 1);
  };

  //edit useEffect
  useEffect(() => {
    if (
      props.edit === "edit" &&
      subscriptionType !== undefined &&
      subscriptionTypeStatus === "succeeded"
    ) {
      let selectEdit = subscriptionType.find(
        (s) => s.id === props.editPost.plan_type_id
      );
      setCheckedArray(
        props.editPost.language_type_id === null
          ? []
          : JSON.parse(props.editPost.language_type_id)
      );
      // setDefaultSmtCount(JSON.parse(props.editPost.sectional_mocktest_count));
      setValue("subscriptionType", selectEdit.id);
      // setValue

      let smtArray = JSON.parse(props.editPost.sectional_mocktest_count);

      let checkedSmtCount = (id, smtCount) => {
        if (props.editPost.language_type_id !== null) {
          let index = JSON.parse(props.editPost.language_type_id).indexOf(id);
          if (index !== -1) {
            setValue(smtCount, smtArray[index]);
          } else {
            setValue(smtCount, 0);
          }
        } else {
          setValue(smtCount, 0);
        }
      };
      checkedSmtCount(1, "SpeakingCount");
      checkedSmtCount(2, "ReadingCount");
      checkedSmtCount(4, "WritingCount");
      checkedSmtCount(3, "ListeningCount");
    }
  }, [props, subscriptionType, subscriptionTypeStatus, setValue]);

  const dataList = {
    name: "",
    name_burmese: "",
    fees: "",
    oversea_fees: "",
    discount_status: "",
    discount_percent: 0,
    discount_day: 0,
    discount_number: 0,
    mt_limited_status: null,
    description: "",
    description_burmese: "",
    scoring_count: 0,
    // unlimited_scoring_count: 0,
    video_recording: 0,

    isActive: "",
    mocktest_count: 0,
    plan_type_id: null,
    language_type_id: null,
    mini_mocktest_count: 0,
    sectional_mocktest_count: 0,
    limited_status: null,
    training_type: 0,
    number_of_day: 0,
    mt_number_of_day: 0,
    frontend_status: 0,
    plan_order: null,
  };

  const addPost = async () => {
    setLoading(true);
    let token = getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };

    try {
      const res = await axios.post(`${backendURL}${path}`, dataList, config);

      if (res.status === 200) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "OK!",
        });

        setLoading(false);
        navigate(-1);
      } else {
        swal({
          title: "Warning",
          text: res.data.message,
          icon: "warning",
          button: "OK!",
        });

        setLoading(false);
      }
    } catch (error) {
      swal({
        title: "Warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
      });

      setLoading(false);
    }
  };

  //edit post for update
  const editPost = async () => {
    setLoading(true);

    let token = getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.put(
        `${backendURL}${path}/${props.id}`,
        dataList,
        config
      );

      if (res.status === 200) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "OK!",
          timer: 1500,
        });
        navigate(-1);
      } else {
        swal({
          title: "Warning",
          text: res.data.message,
          icon: "warning",
          button: "OK!",
          timer: 1500,
        });
        reset();
        setLoading(false);
      }
    } catch (error) {
      swal({
        title: "Warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
      });

      setLoading(false);
    }
  };

  const saveType = (data) => {
    dataList.name = data.name;
    dataList.name_burmese = data.nameBurmese;
    dataList.fees = parseInt(data.fees);
    if (discountStatus == 1) {
      dataList.discount_status = 1;
      dataList.discount_percent = data.discountPercent;
      dataList.discount_day = data.discountDay;

      dataList.discount_number = data.discountNumber;
    } else {
      dataList.discount_status = 0;
    }
    dataList.oversea_fees = parseInt(data.overseaFees);
    dataList.description = data.description;

    dataList.plan_type_id = parseInt(data.subscriptionType);

    let smtCount = [];
    let checkSmtCount = (id, count) => {
      if (checkedArray.includes(id)) {
        smtCount.push(parseInt(count));
      }
    };

    if (selectType === 2 || selectType === 3 || selectType === 4) {
      dataList.limited_status = 0;
    } else {
      dataList.limited_status = parseInt(data.unlimitedStatus);
    }
    if (data.unlimitedStatus == "1") {
      if (selectType !== 2 && selectType !== 3 && selectType !== 4) {
        dataList.number_of_day = parseInt(data.days);
        // dataList.unlimited_scoring_count = parseInt(data.unlimitedScoreTime);
      }
    }

    if (data.unlimitedStatus == "0") {
      if (selectType !== 2 && selectType !== 3 && selectType !== 4) {
        dataList.scoring_count = parseInt(data.scoreTime);
      }
    }

    //mock test unlimited status
    if (selectType === 2 || selectType === 5 || selectType === 8) {
      dataList.mt_limited_status = parseInt(data.mtUnlimitedStatus);
    }
    //mt count or number depends on plan and limited status
    if (data.mtUnlimitedStatus == "0") {
      if (selectType === 2 || selectType === 5 || selectType === 8) {
        dataList.mocktest_count = parseInt(data.mtCount);
      }
    }
    if (data.mtUnlimitedStatus == "1") {
      if (selectType === 2 || selectType === 5 || selectType === 8) {
        dataList.mt_number_of_day = parseInt(data.mtDays);
      }
    }
    if (selectType === 3 || selectType === 6) {
      dataList.mini_mocktest_count = parseInt(data.mmtCount);
    }
    if (selectType === 4 || selectType === 7 || selectType === 8) {
      checkSmtCount(1, data.SpeakingCount);
      checkSmtCount(2, data.ReadingCount);
      checkSmtCount(3, data.ListeningCount);
      checkSmtCount(4, data.WritingCount);

      dataList.sectional_mocktest_count = JSON.stringify(smtCount);
      dataList.language_type_id = JSON.stringify(
        checkedArray.sort((a, b) => a - b)
      );
    }

    dataList.isActive = parseInt(data.statusValue);

    let description = [];
    data.description.forEach((d) => {
      description = [...description, d.name];
    });
    dataList.description = JSON.stringify(description);

    let descriptionBurmese = [];
    data.descriptionBurmese.forEach((d) => {
      descriptionBurmese = [...descriptionBurmese, d.name];
    });
    dataList.description_burmese = JSON.stringify(descriptionBurmese);
    if (
      showFrontendCount.count < 3 ||
      (props.edit === "edit" && props.editPost.frontend_status === 1)
    ) {
      dataList.frontend_status = data.showFrontend;
      if (data.showFrontend == 1) {
        dataList.plan_order = data.planOrder;
      }
    }

    props.edit === "edit" ? editPost() : addPost();
  };

  const checkHandler = (id) => {
    setCurrentId(id);
    setCheckedAssign(true);
    //set state via use effect
  };
  useEffect(() => {
    if (checkedAssign) {
      let index = checkedArray.indexOf(currentId);
      if (index !== -1) {
        checkedArray.splice(index, 1);
      } else {
        checkedArray.push(currentId);
      }
      setCheckedArray(checkedArray);
      setCheckedAssign(false);
    }
  }, [checkedArray, checkedAssign, currentId]);
  return (
    <>
      <form onSubmit={handleSubmit(saveType)}>
        {/* React hook form with material ui */}
        {/* name */}
        <Box sx={{ my: 2 }}>
          <TextInput
            name="name"
            control={control}
            label="Name"
            type="text"
            rules={{
              required: {
                value: true,
                message: "*Name is required",
              },
            }}
            defaultValue={props.edit === "edit" ? props.editPost.name : ""} //insert props.title
            error={!!errors.name}
            errorMessage={errors?.name?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <TextInput
            name="nameBurmese"
            control={control}
            label="Name in burmese"
            type="text"
            rules={{
              required: {
                value: true,
                message: "*Name is required",
              },
            }}
            defaultValue={
              props.edit === "edit" ? props.editPost.name_burmese : ""
            } //insert props.title
            error={!!errors.nameBurmese}
            errorMessage={errors?.nameBurmese?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>
        {/* fees */}
        <Box sx={{ my: 2 }}>
          <TextInput
            name="fees"
            control={control}
            label="Fees"
            type="number"
            rules={{
              required: {
                value: true,
                message: "*Fees is required",
              },
            }}
            defaultValue={props.edit === "edit" ? props.editPost.fees : ""}
            error={!!errors.fees}
            errorMessage={errors?.fees?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>

        {/*oversea fees */}
        <Box sx={{ my: 2 }}>
          <TextInput
            name="overseaFees"
            control={control}
            label="Oversea Fees"
            type="number"
            rules={{
              required: {
                value: true,
                message: "*Oversea fees is required",
              },
            }}
            defaultValue={
              props.edit === "edit" ? props.editPost.oversea_fees : ""
            }
            error={!!errors.overseaFees}
            errorMessage={errors?.overseaFees?.message}
            inputStyle={FormStyle.inputStyle}
          />
        </Box>

        {/* Discount Status */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Discount Status</Typography>

          <FormRadioGroup
            name="discountStatus"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost?.discount_status : ""
            }
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            errorMessage={errors?.discountStatus?.message}
          >
            {[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
            ].map((r, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    value={r.value}
                    // checked={statusValue === "active"}
                  />
                }
                label={r.label}
              />
            ))}
          </FormRadioGroup>
        </Box>
        {discountStatus == 1 && (
          <>
            {/*discount fees */}

            <Box sx={{ my: 2 }}>
              <TextInput
                name="discountPercent"
                control={control}
                label="Discount Percent"
                type="number"
                rules={{
                  required: {
                    value: true,
                    message:
                      "*Discount percent is required & must be within 0-100",
                  },
                  min: {
                    value: 0,
                    message: "Must not be empty or (-)",
                  },
                  max: {
                    value: 100,
                    message: "Must not be grater than 100",
                  },
                }}
                defaultValue={
                  props.edit === "edit" ? props.editPost.discount_percent : ""
                }
                error={!!errors.discountPercent}
                errorMessage={errors?.discountPercent?.message}
                inputStyle={FormStyle.inputStyle}
              />
            </Box>

            <Box sx={{ my: 2 }}>
              <TextInput
                name="discountDay"
                control={control}
                label="Discount Day"
                type="number"
                // rules={{
                //   required: {
                //     value: true,
                //     message:
                //       "*Discount perce is required & must be within 0-100",
                //   },
                //   min: {
                //     value: 0,
                //     message: "Must not be empty or (-)",
                //   },
                //   max: {
                //     value: 100,
                //     message: "Must not be grater than 100",
                //   },
                // }}
                defaultValue={
                  props.edit === "edit" ? props.editPost.discount_day : 0
                }
                error={!!errors.discountPercent}
                errorMessage={errors?.discountPercent?.message}
                inputStyle={FormStyle.inputStyle}
              />
            </Box>

            {/*number of discount  */}
            <Box sx={{ my: 2 }}>
              <TextInput
                name="discountNumber"
                control={control}
                label="Number of Discount"
                type="number"
                rules={{
                  required: {
                    value: true,
                    message: "*Discount number is required",
                  },
                }}
                defaultValue={
                  props.edit === "edit" ? props.editPost.discount_number : ""
                }
                error={!!errors.discountNumber}
                errorMessage={errors?.discountNumber?.message}
                inputStyle={FormStyle.inputStyle}
              />
            </Box>
          </>
        )}

        {/* Subscription TYPE */}
        {subscriptionTypeStatus === "succeeded" &&
          subscriptionType !== undefined && (
            <Box sx={{ my: 2 }}>
              <SelectInput
                name="subscriptionType"
                control={control}
                defaultValue={
                  props.edit === "edit" ? props.editPost.plan_type_id : ""
                }
                rules={{
                  required: {
                    value: true,
                    message: "*Subscription Type is required",
                  },
                }}
                label="Subscription Type"
                inputStyle={FormStyle.inputStyle}
                error={!!errors.subscriptionType}
                errorMessage={errors?.subscriptionType?.message}
              >
                {subscriptionType.map(
                  (s, index) =>
                    s.id !== 9 && (
                      <MenuItem key={index} value={s.id}>
                        {s.name}
                      </MenuItem>
                    )
                )}
              </SelectInput>
            </Box>
          )}

        {/* unlimited status */}
        {selectType !== undefined &&
          selectType !== 2 &&
          selectType !== 3 &&
          selectType !== 4 && (
            <>
              <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
                <Typography variant="h6">Unlimited Status</Typography>
                <FormRadioGroup
                  name="unlimitedStatus"
                  control={control}
                  defaultValue={
                    props.edit === "edit" ? props.editPost.limited_status : ""
                  }
                  rules={{
                    required: {
                      value: true,
                      message: "*Choose one",
                    },
                  }}
                  errorMessage={errors?.unlimitedStatus?.message}
                >
                  {[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ].map((r, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Radio
                          value={r.value}
                          // checked={statusValue === "active"}
                        />
                      }
                      label={r.label}
                    />
                  ))}
                </FormRadioGroup>
              </Box>
            </>
          )}
        {/* mt count */}
        {selectType !== undefined &&
          selectType !== 2 &&
          selectType !== 3 &&
          selectType !== 4 && (
            <>
              {/* score count */}

              {uStatus == 0 && (
                <Box sx={{ my: 2 }}>
                  <TextInput
                    name="scoreTime"
                    control={control}
                    label="Score Token"
                    type="number"
                    rules={{
                      required: {
                        value: true,
                        message: "*scoreTime is required",
                      },
                    }}
                    defaultValue={
                      props.edit === "edit" ? props.editPost.scoring_count : ""
                    }
                    error={!!errors.scoreTime}
                    errorMessage={errors?.scoreTime?.message}
                    inputStyle={FormStyle.inputStyle}
                  />
                </Box>
              )}

              {uStatus == 1 && (
                <>
                  {/* day */}
                  <Box sx={{ my: 2 }}>
                    <TextInput
                      name="days"
                      control={control}
                      label="Days"
                      type="number"
                      rules={{
                        required: {
                          value: true,
                          message: "*Day is required",
                        },
                      }}
                      defaultValue={
                        props.edit === "edit"
                          ? props.editPost.number_of_day
                          : ""
                      }
                      error={!!errors.days}
                      errorMessage={errors?.days?.message}
                      inputStyle={FormStyle.inputStyle}
                    />
                  </Box>

                  {/* <Box sx={{ my: 2 }}>
                    <Controller
                      name="unlimitedScoreTime"
                      control={control}
                      defaultValue={
                        props.edit === "edit"
                          ? props.editPost?.unlimited_scoring_count
                          : ""
                      } //insert props.title
                      rules={{
                        required: {
                          value: true,
                          message: "*Unlimited Score count is required",
                        },
                      }}
                      render={({ field: { ref, ...field } }) => (
                        <TextField
                          {...field}
                          inputRef={ref}
                          id="unlimitedScoreTime"
                          type="number"
                          fullWidth
                          error={!!errors.unlimitedScoreTime}
                          label={
                            <Typography variant="h6">
                              Unlimited Score Tokens
                            </Typography>
                          }
                          InputProps={{
                            sx: {
                              ...FormStyle.inputStyle,
                            },
                          }}
                          helperText={errors?.unlimitedScoreTime?.message}
                        />
                      )}
                    />
                  </Box> */}

                  {/* day */}
                </>
              )}
            </>
          )}

        {selectType !== undefined && (
          <>
            {/* mock */}
            {(selectType === 2 || selectType === 5 || selectType === 8) && (
              <>
                <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
                  <Typography variant="h6">
                    Mock Test Unlimited Status
                  </Typography>
                  <FormRadioGroup
                    name="mtUnlimitedStatus"
                    control={control}
                    defaultValue={
                      props.edit === "edit"
                        ? props.editPost.mt_limited_status
                        : ""
                    }
                    rules={{
                      required: {
                        value: true,
                        message: "*Choose one",
                      },
                    }}
                    errorMessage={errors?.mtUnlimitedStatus?.message}
                  >
                    {[
                      { label: "Yes", value: 1 },
                      { label: "No", value: 0 },
                    ].map((r, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Radio
                            value={r.value}
                            // checked={statusValue === "active"}
                          />
                        }
                        label={r.label}
                      />
                    ))}
                  </FormRadioGroup>
                </Box>
                {mtUnlimitedStatus == 0 && (
                  <Box sx={{ my: 2 }}>
                    <Controller
                      name="mtCount"
                      control={control}
                      defaultValue={
                        props.edit === "edit"
                          ? props.editPost.mocktest_count
                          : ""
                      } //insert props.title
                      rules={{
                        required: {
                          value: true,
                          message: "*mtCount is required",
                        },
                      }}
                      render={({ field: { ref, ...field } }) => (
                        <TextField
                          {...field}
                          inputRef={ref}
                          id="mtCount"
                          type="number"
                          fullWidth
                          error={!!errors.mtCount}
                          label={
                            <Typography variant="h6">
                              Mock Test Count
                            </Typography>
                          }
                          InputProps={{
                            sx: {
                              ...FormStyle.inputStyle,
                            },
                          }}
                          helperText={errors?.mtCount?.message}
                        />
                      )}
                    />
                  </Box>
                )}
                {mtUnlimitedStatus == 1 && (
                  <Box sx={{ my: 2 }}>
                    <Controller
                      name="mtDays"
                      control={control}
                      defaultValue={
                        props.edit === "edit"
                          ? props.editPost.mt_number_of_day
                          : ""
                      } //insert props.title
                      rules={{
                        required: {
                          value: true,
                          message: "*Mock test Day is required",
                        },
                      }}
                      render={({ field: { ref, ...field } }) => (
                        <TextField
                          {...field}
                          inputRef={ref}
                          id="days"
                          type="number"
                          fullWidth
                          error={!!errors.mtDays}
                          label={
                            <Typography variant="h6">Mock test Days</Typography>
                          }
                          InputProps={{
                            sx: {
                              ...FormStyle.inputStyle,
                            },
                          }}
                          helperText={errors?.mtDays?.message}
                        />
                      )}
                    />
                  </Box>
                )}
              </>
            )}
            {/* sectional mock test start */}

            {(selectType === 4 || selectType === 7 || selectType === 8) && (
              <>
                <Box sx={{ my: 2, ...FormStyle.inputStyle, p: 2 }}>
                  {languageType.map((l, index) => (
                    <Controller
                      key={index}
                      name={l.type}
                      control={control}
                      defaultValue={
                        props.edit === "edit"
                          ? props.editPost.language_type_id !== null
                            ? JSON.parse(
                                props.editPost.language_type_id
                              ).includes(l.id)
                            : false
                          : false
                      }
                      render={({ field: { value, onChange } }) => (
                        <FormControlLabel
                          label={l.type}
                          control={
                            <Checkbox
                              checked={value}
                              onChange={onChange}
                              onClick={() => checkHandler(l.id)}
                            />
                          }
                        ></FormControlLabel>
                      )}
                    ></Controller>
                  ))}
                </Box>

                {languageType.map((l, index) => (
                  <Box
                    sx={{
                      my: 2,
                      display: checkedArray.includes(l.id) ? "block" : "none",
                    }}
                    key={index}
                  >
                    <Controller
                      name={l.type + "Count"}
                      control={control}
                      defaultValue={props.edit === "edit" ? "" : 0} //insert props.title
                      rules={{
                        required: {
                          value: true,
                          message: "*" + l.type + " Count is required",
                        },
                      }}
                      render={({ field: { ref, ...field } }) => (
                        <TextField
                          {...field}
                          inputRef={ref}
                          id={l.type + "Count"}
                          type="number"
                          fullWidth
                          error={!!errors[l.type + "Count"]}
                          label={
                            <Typography variant="h6">{l.type} Count</Typography>
                          }
                          InputProps={{
                            sx: {
                              ...FormStyle.inputStyle,
                            },
                          }}
                          helperText={errors[l.type + "Count"]?.message}
                        />
                      )}
                    />
                  </Box>
                ))}

                {/* Sectional TYPE */}
                {/* <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
                  <Typography variant="h6">Choose sections</Typography>
                  {languageType.map((l, index) => (
                    <Controller
                      key={index}
                      name={l.type}
                      control={control}
                      defaultValue={""}
                      render={({ field: { onChange } }) => (
                        <FormControlLabel
                          label={l.type}
                          control={<Checkbox onChange={onChange} />}
                        ></FormControlLabel>
                      )}
                    ></Controller>
                  ))}
                </Box> */}
              </>
            )}
            {/* sectional mock test end */}
            {/* mini mock test start*/}
            {(selectType === 3 || selectType === 6) && (
              <Box sx={{ my: 2, ...FormStyle.inputStyle }}>
                <Controller
                  name="mmtCount"
                  control={control}
                  defaultValue={
                    props.edit === "edit"
                      ? props.editPost.mini_mocktest_count
                      : ""
                  } //insert props.title
                  rules={{
                    required: {
                      value: true,
                      message: "*mini mock test count is required",
                    },
                  }}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      id="mmtCount"
                      type="number"
                      fullWidth
                      error={!!errors.mtCount}
                      label={
                        <Typography variant="h6">
                          Mini Mock Test Count
                        </Typography>
                      }
                      InputProps={{
                        sx: {
                          ...FormStyle.inputStyle,
                        },
                      }}
                      helperText={errors?.mmtCount?.message}
                    />
                  )}
                />
              </Box>
            )}
            {/* mini mock test end*/}
          </>
        )}

        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "1rem",
            p: 2,
          }}
        >
          <Typography variant="h6">Description</Typography>

          <Box sx={{ width: "100%", mb: 2 }}>
            {fieldList.map((field, index) => (
              <Controller
                key={field.id}
                name={`description[${index}].name`}
                control={control}
                defaultValue={field.name} //insert props.content
                rules={{
                  required: {
                    value: true,
                    message: "*Description is required",
                  },
                  validate: () => {
                    // Get the entire description array
                    const descriptions = getValues("description");
                    const totalLength = descriptions.reduce(
                      (acc, curr) => acc + (curr.name?.length || 0),
                      0
                    );

                    // Maximum combined character count
                    const maxCombinedLength = 500;

                    return (
                      totalLength <= maxCombinedLength ||
                      ` The combined total must not exceed ${maxCombinedLength} characters`
                    );
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id={`description[${index}].name`}
                    type="text"
                    variant="standard"
                    fullWidth
                    size="large"
                    error={!!errors?.description?.[index]?.name}
                    label={
                      <Typography variant="h5">
                        Description {index + 1}
                        {!!errors?.description?.[index]?.name === true && (
                          <small>
                            {errors.description?.[index]?.name.message}
                          </small>
                        )}
                      </Typography>
                    }
                    sx={{ bgcolor: "rgb(231 239 254)", mt: "2rem" }}
                  />
                )}
              />
            ))}
          </Box>
          {fieldList.length < 6 && (
            <Button variant="contained" sx={{ mr: 5 }} onClick={addField}>
              Add
            </Button>
          )}

          <Button variant="contained" onClick={removeField}>
            Remove
          </Button>
        </Box>

        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "1rem",
            p: 2,
            my: 2,
          }}
        >
          <Typography variant="h6">Description Burmese</Typography>

          <Box sx={{ width: "100%", mb: 2 }}>
            {fieldList1.map((field, index) => (
              <Controller
                key={field.id}
                name={`descriptionBurmese[${index}].name`}
                control={control}
                defaultValue={field.name} //insert props.content
                rules={{
                  required: {
                    value: true,
                    message: "*Description is required",
                  },
                  validate: () => {
                    // Get the entire descriptionBurmese array
                    const descriptions = getValues("descriptionBurmese");
                    const totalLength = descriptions.reduce(
                      (acc, curr) => acc + (curr.name?.length || 0),
                      0
                    );

                    // Maximum combined character count
                    const maxCombinedLength = 500;

                    return (
                      totalLength <= maxCombinedLength ||
                      ` The combined total must not exceed ${maxCombinedLength} characters`
                    );
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id={`descriptionBurmese[${index}].name`}
                    type="text"
                    variant="standard"
                    fullWidth
                    size="large"
                    error={!!errors?.descriptionBurmese?.[index]?.name}
                    label={
                      <Typography variant="h5">
                        Description Burmese {index + 1}
                        {!!errors?.descriptionBurmese?.[index]?.name ===
                          true && (
                          <small>
                            {errors.descriptionBurmese?.[index]?.name.message}
                          </small>
                        )}
                      </Typography>
                    }
                    sx={{ bgcolor: "rgb(231 239 254)", mt: "2rem" }}
                  />
                )}
              />
            ))}
          </Box>
          {/* add or remove btn */}
          {fieldList1.length < 6 && (
            <Button variant="contained" sx={{ mr: 5 }} onClick={addField1}>
              Add
            </Button>
          )}

          <Button variant="contained" onClick={removeField1}>
            Remove
          </Button>
        </Box>

        {/* is active */}
        <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
          <Typography variant="h6">Subscription Status</Typography>
          <Controller
            name="statusValue"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.isActive : ""} //insert props.description
            rules={{
              required: {
                value: true,
                message: "*Choose one",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                // row
                // aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={onChange}
              >
                <FormControlLabel
                  control={
                    <Radio
                      value={1}
                      // checked={statusValue === "active"}
                    />
                  }
                  label="Active"
                />
                <FormControlLabel
                  control={
                    <Radio
                      value={2}
                      // checked = { props.editMediaType === "2"}
                      // checked={statusValue === "inactive"}
                    />
                  }
                  label="Inactive"
                />
                <Typography sx={{ fontSize: "1rem", color: "red" }}>
                  {errors?.statusValue?.message}
                </Typography>
              </RadioGroup>
            )}
          />
        </Box>
        {/* show frontend */}
        {showFrontendCountStatus === "loading" && (
          <Typography>Checking frontend count ...</Typography>
        )}

        {showFrontendCountStatus === "succeeded" &&
          (showFrontendCount.count < 3 ||
            (props.edit === "edit" && props.editPost.frontend_status == 1)) && (
            <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
              <Typography variant="h6">Show at Homepage card</Typography>
              <Controller
                name="showFrontend"
                control={control}
                defaultValue={
                  props.edit === "edit" ? props.editPost.frontend_status : ""
                } //insert props.description
                rules={{
                  required: {
                    value: true,
                    message: "*Choose one",
                  },
                }}
                render={({ field: { value, onChange } }) => (
                  <RadioGroup
                    // row
                    // aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={onChange}
                  >
                    <FormControlLabel
                      control={<Radio value={1} />}
                      label="Yes"
                    />
                    <FormControlLabel
                      control={<Radio value={0} />}
                      label="No"
                    />
                    <Typography sx={{ fontSize: "1rem", color: "red" }}>
                      {errors?.showFrontend?.message}
                    </Typography>
                  </RadioGroup>
                )}
              />
            </Box>
          )}
        {showFrontendCountError !== null && (
          <Typography>Fetch show frontend count failed</Typography>
        )}
        {/* order */}
        {(showFrontend == 1 ||
          (props.edit === "edit" && props.editPost.plan_order !== null)) && (
          <Box sx={{ ...FormStyle.inputStyle, my: 2, p: 1 }}>
            <Typography variant="h6">Plan Order for display</Typography>
            <Controller
              name="planOrder"
              control={control}
              defaultValue={
                props.edit === "edit" ? props.editPost.plan_order : ""
              } //insert props.description
              rules={{
                required: {
                  value: true,
                  message: "*Choose one",
                },
              }}
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  // row
                  // aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={value}
                  onChange={onChange}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        value={1}
                        // checked={statusValue === "active"}
                      />
                    }
                    label="1"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        value={2}
                        // checked = { props.editMediaType === "2"}
                        // checked={statusValue === "inactive"}
                      />
                    }
                    label="2"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        value={3}
                        // checked = { props.editMediaType === "2"}
                        // checked={statusValue === "inactive"}
                      />
                    }
                    label="3"
                  />
                  <Typography sx={{ fontSize: "1rem", color: "red" }}>
                    {errors?.planOrder?.message}
                  </Typography>
                </RadioGroup>
              )}
            />
          </Box>
        )}

        <Box display={"flex"} justifyContent="right">
          <Button
            id="btnSave"
            type="submit"
            variant="contained"
            disabled={loading ? true : false}
            sx={{
              color: "#000",
              bgcolor: "#2196f3",

              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                sx={{ width: "50%", color: "white", m: "0 auto" }}
              ></CircularProgress>
            ) : props.edit !== "" ? (
              "Update"
            ) : (
              "Confirm"
            )}
          </Button>
        </Box>
      </form>
    </>
  );
}

export default SubscriptionFormComponent;
