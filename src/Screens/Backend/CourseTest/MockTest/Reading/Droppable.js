import { useDroppable } from "@dnd-kit/core";
import React from "react";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      index: props.index,
    },
  });
  const style = {
    opacity: isOver ? 0.3 : 1,
    backgroundColor: isOver ? "lightGrey" : "white",
    borderRadius: "1rem",
    height: "2rem",
    width: "9rem",
  };

  return (
    <button ref={setNodeRef} style={style} className={props.className} id={props.id}>
      {props.children}
    </button>
  );
}
