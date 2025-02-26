import React, { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import FontFamily from "@tiptap/extension-font-family";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import BubbleMenuExtension from "@tiptap/extension-bubble-menu";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./TiptapEditorStyle.css";
import { CustomTextStyle } from "./CustomTextStyle";
import Blockquote from "@tiptap/extension-blockquote";
import Typography from "@tiptap/extension-typography";
import Paragraph from "@tiptap/extension-paragraph";
import Link from "@tiptap/extension-link";
const TipTapEditorWithToolbarAndBubbleMenu = ({
  setEditorJSON,
  setValue,
  defaultValue,
}) => {
  const [height, setHeight] = React.useState(480);
  const [width, setWidth] = React.useState(640);

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      // This will update the form's content field whenever the editor changes
      setValue("content", JSON.stringify(editor.getJSON()));
    },
    extensions: [
      StarterKit,

      Image.configure({
        inline: false,
        allowBase64: true, // Allow base64 image uploads
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Bold,
      Underline,
      Strike,
      Blockquote,
      Color,
      TextStyle,
      Text,
      Paragraph,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }), // Configuring Heading levels
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CustomTextStyle,
      FontFamily,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),

      Typography,
    ],
    content: defaultValue,
  });

  // useEffect(() => {
  //   if (editor) {
  //     // Listen to editor changes and update the parent
  //     editor.on("update", () => {
  //       setEditorJSON(editor.getJSON());
  //     });
  //   }

  //   return () => {
  //     if (editor) {
  //       editor.off("update");
  //     }
  //   };
  // }, [editor, setEditorJSON]);

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(width, 10)) || 640,
        height: Math.max(180, parseInt(height, 10)) || 480,
      });
    }
  };

  const scrollContainerRef = useRef(null);
  const applyStyle = useCallback(
    (style) => {
      editor.commands.setTextStyle(style);
    },
    [editor]
  );
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -100 : 100, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };
  const addImage = () => {
    const url = window.prompt("Enter the image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addVideo = () => {
    const url = window.prompt("Enter the video URL");
    if (url) {
      editor.chain().focus().setVideo({ src: url }).run();
    }
  };
  const handleFontFamilyChange = (event) => {
    const fontFamily = event.target.value;

    editor.chain().focus().setFontFamily(fontFamily).run();
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);
  return (
    <div>
      {/* Toolbar */}
      <Box
        sx={{
          borderRadius: "0.5rem",
          background: "white",
          border: "3px solid gray",
          width: "100%",
          mb: 1,

          display: "flex",
          gap: 2,
        }}
      >
        {/* <Button
          className="scroll-button prev"
          onClick={() => scroll("left")}
          sx={{
            width: "20%",
            background: "white",
            borderRight: "1px solid gray",
            borderTopRightRadius: 0,
            boxShadow: 1,
            borderBottomRightRadius: 0,
          }}
        >
          <ArrowLeftIcon />
        </Button> */}
        <Box
          className="toolbar"
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            background: "white",
            padding: 1,
            margin: 1,
          }}
        >
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <strong>B</strong>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
          >
            <u>U</u>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            <s>S</s>
          </Button>
          <Button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            Paragraph
          </Button>
          <Button
            onClick={() => editor.chain().focus().setHardBreak().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            Hard Break
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            H3
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            H4
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive("heading", { level: 5 }) ? "is-active" : ""
            }
          >
            H5
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              editor.isActive("heading", { level: 6 }) ? "is-active" : ""
            }
          >
            H6
          </Button>
          <div className="button-group">
            <Button
              onClick={setLink}
              className={editor.isActive("link") ? "is-active" : ""}
            >
              Set link
            </Button>
            <Button
              onClick={() => editor.chain().focus().unsetLink().run()}
              disabled={!editor.isActive("link")}
            >
              Unset link
            </Button>
          </div>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet list
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            Ordered list
          </Button>
          <Box sx={{ width: "20%" }}>
            <FormControl fullWidth>
              <InputLabel>Font Family</InputLabel>
              <Select
                label="Font Family"
                onChange={handleFontFamilyChange}
                defaultValue=""
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="'Arial', sans-serif">Arial</MenuItem>
                <MenuItem value="'Georgia', serif">Georgia</MenuItem>
                <MenuItem value="'Times New Roman', serif">
                  Times New Roman
                </MenuItem>
                <MenuItem value="'Courier New', monospace">
                  Courier New
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="button-group" sx={{ border: "1px solid gray" }}>
            Text Align
            <Box>
              <Button
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={
                  editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                }
              >
                Left
              </Button>
              <Button
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={
                  editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                }
              >
                Center
              </Button>
              <Button
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={
                  editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                }
              >
                Right
              </Button>
              <Button
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                className={
                  editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
                }
              >
                Justify
              </Button>
              <Button
                onClick={() => editor.chain().focus().unsetTextAlign().run()}
              >
                Unset text align
              </Button>
            </Box>
          </Box>
          <div className="control-group">
            <div className="button-group">
              <TextField
                id="width"
                type="number"
                min="320"
                max="1024"
                placeholder="width"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
              />
              <TextField
                id="height"
                type="number"
                min="180"
                max="720"
                placeholder="height"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
              <Button id="add" onClick={addYoutubeVideo}>
                Add YouTube video
              </Button>
            </div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Button onClick={addImage}>Add Image</Button>
          </div>
          <div className="control-group">
            <div className="button-group">
              <input
                type="color"
                onInput={(event) =>
                  editor.chain().focus().setColor(event.target.value).run()
                }
                value={editor.getAttributes("textStyle").color}
                data-testid="setColor"
              />
            </div>
          </div>
        </Box>
        {/* <Button
          className="scroll-button next"
          onClick={() => scroll("right")}
          sx={{
            width: "20%",
            background: "white",
            borderRight: "1px solid gray",
            borderTopLeftRadius: 0,
            boxShadow: 1,
            borderBottomLeftRadius: 0,
          }}
        >
          <ArrowRightIcon />
        </Button> */}
      </Box>

      {/* Bubble Menu */}
      {/* {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu bg-white shadow-lg rounded p-2 flex gap-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "is-active" : ""}
            >
              <u>U</u>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <s>S</s>
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
            >
              H3
            </button>
          </div>
        </BubbleMenu>
      )} */}

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          minHeight: "200px",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
          backgroundColor: "#f9f9f9",
        }}
      />
    </div>
  );
};

export default TipTapEditorWithToolbarAndBubbleMenu;
