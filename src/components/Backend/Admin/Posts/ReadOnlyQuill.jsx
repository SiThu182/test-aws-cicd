import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import ReactQuill from "react-quill";
import "./TextEditor.css";

function ReadOnlyQuill(props) {
  const { delta, quillClass } = props;
  const readQuillRef = useRef();

  const quillConfig = {
    readOnly: true, // Make it read-only
    theme: "snow", // Use the snow theme
    modules: {
      toolbar: false, // Disable the toolbar
    },
  };

  
  useEffect(() => {
    let deltaObj = JSON.parse(delta);
    let editor = readQuillRef.current.getEditor();
    editor.setContents(deltaObj?.ops);
  }, [delta]);

  return (
    <div>
      <ReactQuill
        className={quillClass}
        ref={readQuillRef}
        readOnly={true}
        // Set the content you want to display
        modules={quillConfig.modules}
      />
    </div>
  );
}

export default ReadOnlyQuill;
