import axios from "axios";
import React from "react";
import { useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./QuillEditor.css";
function QuillEditor(props) {
  const { quillRef } = props;

  let handleImageUpload = useCallback(
    async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      // Make a request to your server to upload the image
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_ADMIN + "upload-image",
        formData
      );
      const imageUrl = response.data.image_url;
      // Insert the image into the editor at the current cursor position
      const range = quillRef.current.getEditor().getSelection();
      quillRef.current.getEditor().insertEmbed(range.index, "image", imageUrl);
    },
    [quillRef]
  );

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"], // default options
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }], // custom options
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          ["link", "image"],
        ],
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();
            input.onchange = handleImageUpload;
          },
        },
      },
    }),
    [handleImageUpload]
  );

  return (
    <>
      <ReactQuill
        theme="snow"
        className="text-editor"
        ref={quillRef}
        // defaultValue={text}
        // onChange={handleEditorChange}
        modules={modules}
        bounds={document.body}
      />
    </>
  );
}

export default QuillEditor;
