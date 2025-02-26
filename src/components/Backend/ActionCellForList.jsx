import { Box, Button, TableCell, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import swal from "sweetalert";
import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

function ActionCellForList({
  item,
  // confirmDeletePost,
  url,
  table,
  urlParam = null,
  to = "edit",
  editExist = true,
  editDisabled = false,
  deleteDisabled = false,
  leftTooltip = "Edit",
  deleteMessage = "",
}) {
  const ellipsisStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "350px",
    maxWidth: "350px",
  };
  const navigate = useNavigate();
  const clickHandler = (route) => {
    if (urlParam !== null) {
      navigate(`${route}/${item.id}`, {
        state: {
          value: urlParam,
        },
      });
    } else {
      navigate(`${route}/${item.id}`);
    }
  };

  function confirmDeletePost(e, id) {
    e.stopPropagation();

    swal({
      title: "Are you sure?",
      text:
        deleteMessage !== ""
          ? deleteMessage
          : "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePost(id, url);
      } else {
        swal({ text: "Your record is safe!", timer: 1500 });
      }
    });
  }

  const deletePost = async (id, url) => {
    const btn = document.getElementById(id);

    btn.innerText = "Deleting...";
    let token = getCookie("userToken");
    if (!token) navigate("/login");
    else {
      let config = { headers: { Authorization: "Bearer " + token } };
      const res = await axios.delete(`${url}/${id}`, config);
      if (res.data.status) {
        btn.innerText = "Delete";
        //
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "OK!",
          timer: 1500,
        });
        btn.closest("tr").style.display = "none";
      }
    }
  };
  return (
    <TableCell sx={{ ...ellipsisStyle, width: "20%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {table !== "score" && editExist && (
          <Tooltip title={leftTooltip}>
            <span>
              <Button
                variant="contained"
                size="small"
                disabled={editDisabled}
                sx={{
                  mr: 3,
                  bgcolor: "#2196f3",
                  "&:hover": {
                    bgcolor: "white",
                    "& .MuiSvgIcon-root": {
                      color: "black",
                    },
                  },
                }}
                onClick={() => clickHandler(to, item.id)}
              >
                <SaveAsIcon sx={{ color: "white" }}></SaveAsIcon>
              </Button>
            </span>
          </Tooltip>
        )}

        <Tooltip title="Delete">
          <span>
            <Button
              variant="contained"
              size="small"
              disabled={deleteDisabled}
              sx={{
                backgroundColor: "red",
                "&:hover": {
                  bgcolor: "white",
                  "& .MuiSvgIcon-root": {
                    color: "black",
                  },
                },
              }}
              onClick={(e) => confirmDeletePost(e, item.id)}
            >
              <DeleteIcon sx={{ color: "white" }}></DeleteIcon>
            </Button>
          </span>
        </Tooltip>
      </Box>
    </TableCell>
  );
}

export default ActionCellForList;
