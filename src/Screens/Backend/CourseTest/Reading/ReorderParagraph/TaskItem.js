import React from "react";
import { Card, CardContent } from "@mui/material";

const TaskItem = React.memo(({ task, title, checkAnswerState = null }) => {
  // let color_status = task.correct == 1 ?  0 : 1;
  return (
    <Card>
      {task !== undefined && (
        <>
          {title == "Source" ? (
            <CardContent>{task.name}</CardContent>
          ) : task.correct == 0 ? (
            <CardContent>{task.name}</CardContent>
          ) : (
            <CardContent
              sx={{
                bgcolor:
                  checkAnswerState !== false
                    ? task.correct == 1
                      ? "#3B69B9"
                      : "#D60B0B"
                    : "",

                color: "#fff",
              }}
            >
              {task.name}
            </CardContent>
          )}
        </>
      )}
    </Card>
  );
});

export default TaskItem;
