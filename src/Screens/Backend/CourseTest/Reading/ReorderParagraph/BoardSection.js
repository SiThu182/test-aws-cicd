import React from "react";
import Box from "@mui/material/Box";
import { useDroppable } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Typography from "@mui/material/Typography";
import TaskItem from "./TaskItem";
import SortableTask from "./SortableTask";

const BoardSection = ({ id, title, tasks, checkAnswerState }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <Box sx={{ backgroundColor: isOver ? "#eee" : "#eee", padding: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {tasks.map((task, index) => (
            <Box key={task?.id || index} sx={{ mb: 2 }}>
              <SortableTask id={task?.id}>
                <TaskItem
                  task={task}
                  title={title}
                  checkAnswerState={checkAnswerState}
                />
              </SortableTask>
            </Box>
          ))}
        </div>
      </SortableContext>
    </Box>
  );
};

export default BoardSection;
