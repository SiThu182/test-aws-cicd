import {
  Button,
  CircularProgress,
  FormHelperText,
  // FormHelperText,
  FormLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Controller, useForm,useFieldArray } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
 
import { FormStyle } from "./Marketing/FormStyle";
import QuillEditor from "./Marketing/QuillEditor";
import { getCookie } from "../../../Utils/GetCookies";

function RecordingCourseForm(props) {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      myRadio: props.edit === "edit" ? props.editPost.video_type : "",
      introduction: props.edit === "edit" ?  JSON.parse(props.editPost.introduction).map((data) => ({
        name: data,
      })) : [],
      speaking: props.edit === "edit" ? JSON.parse(props.editPost.speaking).map((data) => ({
        name: data,
      })) : [],
      writing: props.edit === "edit" ? JSON.parse(props.editPost.writing).map((data) => ({
        name: data,
      })) : [],
      reading: props.edit === "edit" ? JSON.parse(props.editPost.reading).map((data) => ({
        name: data,
      })) : [],
      listening: props.edit === "edit" ? JSON.parse(props.editPost.listening).map((data) => ({
        name: data,
      })) : [],
    },
  });

  // const type = watch("subscriptionType");

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const backendURL = `${process.env.REACT_APP_BACKEND_ADMIN}recording-course`;

  const [fileUrlThumbnail, setfileUrlThumbnail] = useState();
  // const [fileUrlVideo, setFileUrlVideo] = useState();

   const [videoUrl, setVideoUrl] = useState(null);

  //for edit smt count for each 4sections
  // const [defaultSmtCount, setDefaultSmtCount] = useState();

  const fileThumbnail = watch("fileUploadThumbnail");
  const fileVideo = watch("videoFile");

  
 
  const {
      fields: fieldList,
      remove: removeList,
      append: appendList,
  } = useFieldArray({ control, name: "introduction" });

  const {
    fields: fieldList1,
    remove: removeList1,
    append: appendList1,
  } = useFieldArray({ control, name: "speaking" });

  const {
    fields: fieldList2,
    remove: removeList2,
    append: appendList2,
  } = useFieldArray({ control, name: "writing" });

  const {
    fields: fieldList3,
    remove: removeList3,
    append: appendList3,
  } = useFieldArray({ control, name: "reading" });

  const {
    fields: fieldList4,
    remove: removeList4,
    append: appendList4,
  } = useFieldArray({ control, name: "listening" });

    
  const addField = () => {
    appendList({ name: "" });
  };

  const removeField = () => {
    removeList(fieldList.length - 1);
  };

  const addField1 = () => {
    appendList1({ name: "" });
  };

  const removeField1 = () => {
    removeList1(fieldList1.length - 1);
  };

  const addField2 = () => {
    appendList2({ name: "" });
  };

  const removeField2 = () => {
    removeList2(fieldList2.length - 1);
  };

  const addField3 = () => {
    appendList3({ name: "" });
  };

  const removeField3 = () => {
    removeList3(fieldList3.length - 1);
  };

  const addField4 = () => {
    appendList4({ name: "" });
  };

  const removeField4 = () => {
    removeList4(fieldList4.length - 1);
  };

  

  const quillRef = useRef();
  const requirementRef  = useRef();
  const courseIncludeRef = useRef();

  useEffect(() => {
    if (props.edit === "edit") {

       
      setfileUrlThumbnail(
        `${process.env.REACT_APP_BACKEND_URL}storage/${props.editPost.vd_thumbnail}`
      );
      setVideoUrl(
        `${process.env.REACT_APP_BACKEND_URL}storage/${props.editPost.video_file}`
      );
    
      // if (props.editPost.video_type === 1) {
      //   setVideoUrl(
      //     `${process.env.REACT_APP_BACKEND_URL}storage/blog/${props.editPost.video}`
      //   );
      //   setValue("addVideo", "1");
      //   setValue("myRadio", "1");
      // } else if (props.editPost.video_type === 2) {
      //   setVideoUrl(props.editPost.youtube_url);
      //   setValue("addVideo", "1");
      //   setValue("myRadio", "2");
      // } else {
      //   setValue("addVideo", "2");
      // }

      let edit_req = JSON.parse(props.editPost.requirement);
      
      let req_editor = requirementRef.current.getEditor();
      req_editor.setContents(edit_req?.ops);

      let edit_des = JSON.parse(props.editPost.description);
      
      let des_editor = quillRef.current.getEditor();
      des_editor.setContents(edit_des?.ops);

      let edit_ci = JSON.parse(props.editPost.course_includes);
      
      let ci_editor = courseIncludeRef.current.getEditor();
      ci_editor.setContents(edit_ci?.ops);
    }
  }, [props, setValue]);

  useEffect(() => {
    if (fileThumbnail !== undefined && fileThumbnail !== "") {
      setfileUrlThumbnail("");
      setfileUrlThumbnail(URL.createObjectURL(fileThumbnail));
    }
    if (fileVideo !== undefined && fileVideo !== "") {
      console.log("fileVideo",fileVideo);
      setVideoUrl("");
      setVideoUrl(URL.createObjectURL(fileVideo));
    }
  }, [fileThumbnail,fileVideo]);

  // useEffect(() => {
  //   if (video !== undefined && video !== "" && video !== null) {
  //     setVideoUrl("");
  //     setVideoUrl(URL.createObjectURL(video));
  //   }
  // }, [video]);

  const addPost = async (request) => {
    setLoading(true);
    let token = await getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };

    try {
      const res = await axios.post(`${backendURL}`, request, config);

      if (res.status === 200) {
        if (res.data.errors) {
          swal({
            title: "Warning",
            text: res.data.errors[0],
            icon: "warning",
            button: "OK!",
          });
        } else {
          swal({
            title: "Success",
            text: res.data.message,
            icon: "success",
            button: "OK!",
          });
        }

        setLoading(false);
        // navigate(-1);
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
  const editPost = async (request) => {
    setLoading(true);
    let token = getCookie("userToken");

    request.append("_method", "PUT");
    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.post(
        `${backendURL}/${props.id}`,
        request,
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

  const saveType = (data) => {
    const editText = quillRef.current.getEditor();
    const editRequirementText = requirementRef.current.getEditor();
     const editCourseIncludeText = courseIncludeRef.current.getEditor();
    console.log(data,"Data save",editText,editRequirementText);

    const text = editText.getLength();
    const requirementText =  editRequirementText.getLength();

    if (text === 1) {
      return;
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("sub_title", data.sub_title);
      formData.append("video_link", data.videoLink); 
      formData.append("course_content", data.courseContent);



      if (props.edit === "edit" && data.videoFile === undefined) {
        formData.append("video_file", videoUrl);
      } else {
        formData.append("video_file", data.videoFile);
      }

      if (props.edit === "edit" && data.fileUploadThumbnail === undefined) {
        formData.append("vd_thumbnail", fileUrlThumbnail);
      } else {
        formData.append("vd_thumbnail", data.fileUploadThumbnail);
      }

      formData.append("description", JSON.stringify(editText.getContents()));
      formData.append("requirement", JSON.stringify(editRequirementText.getContents()));
      formData.append("course_includes", JSON.stringify(editCourseIncludeText.getContents()));


      formData.append("fees", data.fees);


             let introduction = [];
      data.introduction.forEach((d) => {
        introduction = [...introduction, d.name];
      });
      formData.append("introduction", JSON.stringify(introduction));
      
      let speaking = [];
      data.speaking.forEach((d) => {
        speaking = [...speaking, d.name];
      });
      formData.append("speaking", JSON.stringify(speaking));
      
      let reading = [];
      data.reading.forEach((d) => {
        reading = [...reading, d.name];
      });
      formData.append("reading", JSON.stringify(reading));
      
      let writing = [];
      data.writing.forEach((d) => {
        writing = [...writing, d.name];
      });
      formData.append("writing", JSON.stringify(writing));
      
      let listening = [];
      data.listening.forEach((d) => {
        listening = [...listening, d.name];
      });
      formData.append("listening", JSON.stringify(listening));
       

      // if (addVideo === "1") {
      //   formData.append("video_type", data.myRadio);
      //   if (radioValue === "1") {
      //     props.edit === "edit" && data.video === undefined
      //       ? formData.append("video", props.editPost.video)
      //       : formData.append("video", data.video);
      //   } else {
      //     props.edit === "edit" && data.mediaLink === undefined
      //       ? formData.append("youtube_url", props.editPost.youtube_url)
      //       : formData.append("youtube_url", data.mediaLink);
      //   }
      // }

      props.edit === "edit" ? editPost(formData) : addPost(formData);
      // }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveType)}>
        {/* React hook form with material ui */}
        {/* name */}
        {/* <Box sx={{ my: 2 }}>
          <Controller
            name="name"
            control={control}
            defaultValue={props.edit === "edit" ? "" : ""} //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Name is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="name"
                type="text"
                fullWidth
                error={!!errors.name}
                label="Name"
                helperText={errors?.name?.message}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
              />
            )}
          />
        </Box> */}
        {/* title */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="title"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.title : ""} //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Title is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="title"
                type="text"
                fullWidth
                error={!!errors.title}
                label={<Typography variant="h6">Title</Typography>}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
                helperText={errors?.title?.message}
              />
            )}
          />
        </Box>
        {/*sub title */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="sub_title"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.sub_title : ""} //insert props.sub_title
            rules={{
              required: {
                value: true,
                message: "*Sub-Title is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="sub_title"
                type="text"
                fullWidth
                error={!!errors.sub_title}
                label={<Typography variant="h6">Sub-Title</Typography>}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
                helperText={errors?.sub_title?.message}
              />
            )}
          />
        </Box>

        {/* video link */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="videoLink"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.video_link : ""
            } //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Video Link is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="videoLink"
                type="text"
                fullWidth
                error={!!errors.videoLink}
                label="Video Link"
                helperText={errors?.vidoeLink?.message}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
              />
            )}
          />
        </Box>

        {/* Video file */}
          <Box sx={{ my: 3 }}>
            <FormLabel sx={{ mr: 2 }}>Upload Video</FormLabel>
            <Controller
              name="videoFile"
              control={control}
              rules={{
                required: {
                  value: props.edit === "edit" ? false : true,
                  message: "*Required file",
                },
              }}
              render={({ field: { onChange } }) => (
                <label htmlFor="video-file">
                  <input
                    accept="video/*"
                    style={{ display: "none" }}
                    id="video-file"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      onChange(file);
                      setVideoUrl(URL.createObjectURL(file));
                    }}
                    type="file"
                  />
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      color: "black",
                      // ...enrollStyle.inputStyle,
                    }}
                  >
                    Upload Video
                  </Button>
                </label>
              )}
            />
            {errors.videoFile && (
              <Typography variant="p" color="red" textAlign={"left"}>
                <small>{errors.videoFile.message}</small>
              </Typography>
            )}
          </Box>

          {videoUrl && (
          <Box sx={{ mt: 2 }}>
            <video
              controls
              autoPlay={false}
              // style={{ width: "100%" }}
              alt="UploadVideo"
              src={process.env.REACT_APP_BACKEND_URL + videoUrl}
              width="400" 
            />
          </Box>
          )}

        {/* Video thumbnail  */}
          <Box sx={{ my: 3 }}>
            <FormLabel sx={{ mr: 2 }}>Upload Video Thumbnail</FormLabel>
            <Controller
              name="fileUploadThumbnail"
              control={control}
              rules={{
                required: {
                  value: props.edit === "edit" ? false : true,
                  message: "*Required file",
                },
              }}
              render={({ field: { onChange } }) => (
                <label htmlFor="file-video-thumbnail">
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="file-video-thumbnail"
                    onChange={(event) => onChange(event.target.files[0])}
                    type="file"
                  />
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      color: "black",
                      // ...enrollStyle.inputStyle,
                    }}
                  >
                    Upload Image
                  </Button>
                </label>
              )}
            />
            {errors.fileUploadThumbnail && (
              <Typography variant="p" color="red" textAlign={"left"}>
                <small>{errors.fileUploadThumbnail.message}</small>
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: "30%",
              borderRadius: "1rem",
              p: 1,
              backgroundColor: "white",
            }}
          >
            {fileUrlThumbnail !== undefined && (
              <img
                src={fileUrlThumbnail}
                style={{ width: "100%" }}
                alt="UploadThumbnail"
              />
            )}
          </Box>
        {/* Fees */}
        <Box sx={{ my: 2 }}>
          <Controller
            name="fees"
            control={control}
            defaultValue={props.edit === "edit" ? props.editPost.fees : ""} //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Fees is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="fees"
                type="number"
                fullWidth
                error={!!errors.fees}
                label={<Typography variant="h6">Fees</Typography>}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
                helperText={errors?.fees?.message}
              />
            )}
          />
        </Box>
        
        {/* Image Footer */}
        {/* 
        <Box sx={{ my: 3 }}>
          <FormLabel sx={{ mr: 2 }}>Upload Footer Image</FormLabel>
          <Controller
            name="fileUploadFooter"
            control={control}
            rules={{
              required: {
                value: props.edit === "edit" ? false : true,
                message: "*Required file",
              },
            }}
            render={({ field: { onChange } }) => (
              <label htmlFor="file-photo-footer">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="file-photo-footer"
                  onChange={(event) => onChange(event.target.files[0])}
                  type="file"
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    color: "black",
                    // ...enrollStyle.inputStyle,
                  }}
                >
                  Upload Image
                </Button>
              </label>
            )}
          />
          {errors.fileUploadFooter && (
            <Typography variant="p" color="red" textAlign={"left"}>
              <small>{errors.fileUploadFooter.message}</small>
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: "30%",
            borderRadius: "1rem",
            p: 1,
            backgroundColor: "white",
            mb: 2,
          }}
        >
          {fileUrlFooter !== undefined && (
            <img
              src={fileUrlFooter}
              style={{ width: "100%" }}
              alt="UploadFooterImg"
            />
          )}
        </Box> */}


         {/* Course Content */}
         <Box sx={{ my: 2 }}>
          <Controller
            name="courseContent"
            control={control}
            defaultValue={
              props.edit === "edit" ? props.editPost.course_content : ""
            } //insert props.title
            rules={{
              required: {
                value: true,
                message: "*Course Content is required",
              },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                id="courseContent"
                type="text"
                fullWidth
                error={!!errors.course_content}
                label="Course Content Overview"
                helperText={errors?.course_content?.message}
                InputProps={{
                  sx: {
                    ...FormStyle.inputStyle,
                  },
                }}
              />
            )}
          />
        </Box>

        {/* Introduction */}
         <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "1rem",
            p: 2,
          }}
        >
          <Typography variant="h6">Introduction</Typography>

          <Box sx={{ width: "100%", mb: 2 }}>
            {fieldList.map((field, index) => (
              <Controller
                key={field.id}
                name={`introduction[${index}].name`}
                control={control}
                defaultValue={field.name} //insert props.content
                rules={{
                  required: {
                    value: true,
                    message: "*Introduction is required",
                  },
                  validate: () => {
                    // Get the entire description array
                    const introduction = getValues("introduction");
                    const totalLength = introduction.reduce(
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
                    id={`introduction[${index}].name`}
                    type="text"
                    variant="standard"
                    fullWidth
                    size="large"
                    error={!!errors?.introduction?.[index]?.name}
                    label={
                      <Typography variant="h5">
                        Introduction {index + 1}
                        {!!errors?.introduction?.[index]?.name === true && (
                          <small>
                            {errors.introduction?.[index]?.name.message}
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

        
        {/* Speaking Module */}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "1rem",
            p: 2,
            my:2
          }}
        >
          <Typography variant="h6">Speaking Module</Typography>

          <Box sx={{ width: "100%", mb: 2 }}>
            {fieldList1.map((field, index) => (
              <Controller
                key={field.id}
                name={`speaking[${index}].name`}
                control={control}
                defaultValue={field.name} //insert props.content
                rules={{
                  required: {
                    value: true,
                    message: "*Speaking Module is required",
                  },
                  validate: () => {
                    // Get the entire description array
                    const speaking = getValues("speaking");
                    const totalLength = speaking.reduce(
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
                    id={`speaking[${index}].name`}
                    type="text"
                    variant="standard"
                    fullWidth
                    size="large"
                    error={!!errors?.speaking?.[index]?.name}
                    label={
                      <Typography variant="h5">
                        Speaking {index + 1}
                        {!!errors?.speaking?.[index]?.name === true && (
                          <small>
                            {errors.speaking?.[index]?.name.message}
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
          {fieldList1.length < 6 && (
            <Button variant="contained" sx={{ mr: 5 }} onClick={addField1}>
              Add
            </Button>
          )}

          <Button variant="contained" onClick={removeField1}>
            Remove
          </Button>
        </Box>

         {/* Writing Module */}
         <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "1rem",
            p: 2,
            my:2
          }}
        >
          <Typography variant="h6">Writing Module</Typography>

          <Box sx={{ width: "100%", mb: 2 }}>
            {fieldList2.map((field, index) => (
              <Controller
                key={field.id}
                name={`writing[${index}].name`}
                control={control}
                defaultValue={field.name} //insert props.content
                rules={{
                  required: {
                    value: true,
                    message: "*Writing Module is required",
                  },
                  validate: () => {
                    // Get the entire description array
                    const writing = getValues("writing");
                    const totalLength = writing.reduce(
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
                    id={`writing[${index}].name`}
                    type="text"
                    variant="standard"
                    fullWidth
                    size="large"
                    error={!!errors?.writing?.[index]?.name}
                    label={
                      <Typography variant="h5">
                        Writing {index + 1}
                        {!!errors?.writing?.[index]?.name === true && (
                          <small>
                            {errors.writing?.[index]?.name.message}
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
          {fieldList2.length < 6 && (
            <Button variant="contained" sx={{ mr: 5 }} onClick={addField2}>
              Add
            </Button>
          )}

          <Button variant="contained" onClick={removeField2}>
            Remove
          </Button>
        </Box>

        
         {/* Reading Module */}
         <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "1rem",
            p: 2,
            my:2
          }}
        >
          <Typography variant="h6">Reading Module</Typography>

          <Box sx={{ width: "100%", mb: 2 }}>
            {fieldList3.map((field, index) => (
              <Controller
                key={field.id}
                name={`reading[${index}].name`}
                control={control}
                defaultValue={field.name} //insert props.content
                rules={{
                  required: {
                    value: true,
                    message: "*Reading Module is required",
                  },
                  validate: () => {
                    // Get the entire description array
                    const reading = getValues("reading");
                    const totalLength = reading.reduce(
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
                    id={`reading[${index}].name`}
                    type="text"
                    variant="standard"
                    fullWidth
                    size="large"
                    error={!!errors?.reading?.[index]?.name}
                    label={
                      <Typography variant="h5">
                        Reading {index + 1}
                        {!!errors?.reading?.[index]?.name === true && (
                          <small>
                            {errors.reading?.[index]?.name.message}
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
          {fieldList3.length < 6 && (
            <Button variant="contained" sx={{ mr: 5 }} onClick={addField3}>
              Add
            </Button>
          )}

          <Button variant="contained" onClick={removeField3}>
            Remove
          </Button>
          </Box>

         {/* Listening Module */}
         <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "1rem",
            p: 2,
            my:2
          }}
        >
          <Typography variant="h6">Listening Module</Typography>

          <Box sx={{ width: "100%", mb: 2 }}>
            {fieldList4.map((field, index) => (
              <Controller
                key={field.id}
                name={`listening[${index}].name`}
                control={control}
                defaultValue={field.name} //insert props.content
                rules={{
                  required: {
                    value: true,
                    message: "*Listening Module is required",
                  },
                  validate: () => {
                    // Get the entire description array
                    const listening = getValues("listening");
                    const totalLength = listening.reduce(
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
                    id={`reading[${index}].name`}
                    type="text"
                    variant="standard"
                    fullWidth
                    size="large"
                    error={!!errors?.reading?.[index]?.name}
                    label={
                      <Typography variant="h5">
                        Reading {index + 1}
                        {!!errors?.reading?.[index]?.name === true && (
                          <small>
                            {errors.reading?.[index]?.name.message}
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
          {fieldList3.length < 6 && (
            <Button variant="contained" sx={{ mr: 5 }} onClick={addField4}>
              Add
            </Button>
          )}

          <Button variant="contained" onClick={removeField4}>
            Remove
          </Button>
        </Box>
        
        {/* Course Include */}
        <Typography variant="h6" className="my-2">Course Includes</Typography> 
        <QuillEditor quillRef={courseIncludeRef} />

        {courseIncludeRef?.current?.getEditor()?.getLength() == 1 && (
          <FormHelperText sx={{ color: "red" }}>
            *Course Include Required
          </FormHelperText>
        )}


        {/* Description */}
        <Typography variant="h6" className="my-2">Description</Typography> 
        <QuillEditor quillRef={quillRef} />

        {quillRef?.current?.getEditor()?.getLength() == 1 && (
          <FormHelperText sx={{ color: "red" }}>
            *Description Required
          </FormHelperText>
        )}

         {/* Description */}
         <Typography variant="h6" className="my-2">Requirement</Typography> 
        < QuillEditor quillRef={requirementRef} />

        {requirementRef?.current?.getEditor()?.getLength() == 1 && (
          <FormHelperText sx={{ color: "red" }}>
            *Requirement Required
          </FormHelperText>
        )}

        {/* <Box>
          <FormHelperText sx={{ color: "red" }}>
            {text === "" || text === "<p><br></p>" ? "*Needs description" : ""}
          </FormHelperText>
        </Box> */}
        {/* category */}
        {/* {!props.shopEmailTemplate && (
          <Box sx={{ my: 2 }}>
            <Controller
              name="template_type"
              control={control}
              defaultValue={
                props.edit === "edit" ? props.editPost.template_type : ""
              }
              rules={{
                required: {
                  value: true,
                  message: "*Template Type is required",
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  id="template_type"
                  select
                  variant="outlined"
                  error={!!errors.template_type}
                  label={<Typography variant="h6">Template Type </Typography>}
                  InputProps={{
                    sx: {
                      ...FormStyle.inputStyle,
                    },
                  }}
                  fullWidth
                  helperText={errors?.template_type?.message}
                >
                  <MenuItem value={1}>Simple</MenuItem>
                  <MenuItem value={2}>Information</MenuItem>
                </TextField>
              )}
            />
          </Box>
        )} */}

        <Box display={"flex"} justifyContent="right">
          <Button
            id="btnSave"
            type="submit"
            variant="contained"
            disabled={loading ? true : false}
            sx={{
              color: "#000",
              bgcolor: "#2196f3",
              mt: 3,

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

export default RecordingCourseForm;
