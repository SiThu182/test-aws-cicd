import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Typography } from "@mui/material";
import React from "react";

export function Draggable(props) {
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: props.id,
      data: {
        index: props.index,
      },
    });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    backgroundColor: isDragging ? "lightCyan" : "#4dabf5",
  };
  const sxStyle = {
    width: "9rem",
    height: "2rem",
    margin: "3px",
    color: "white",
    borderRadius: "0.5rem",
    display: "inline-block",
    border: "2px solid black",
    textAlign: "center",
    cursor: "grab",
  };

  return (
    <>
      <Typography
        variant="span"
        ref={setNodeRef}
        sx={{ ...sxStyle }}
        style={style}
        {...listeners}
        {...attributes}
        id={props.id}
        className={props.className}
      >
        {props.children}
      </Typography>
    </>
  );
}
