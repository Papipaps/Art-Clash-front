import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import comments_mock from "../mock/mock-comments";
import { useState, useEffect, useLayoutEffect } from "react";
import mockComments from "../mock/mock-comments";
// import CommentService from "../service/comment-service";
// import commentDTO from "../data/dto/commentDTO";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function CommentSection({ postId, id }) {
  const [filteredComments, setFilteredComments] = useState([]);

  useLayoutEffect(() => {
    setFilteredComments(
      mockComments.filter(function (comment) {
        return comment.postId == postId;
      })
    );
  }, []);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {filteredComments.map((comment) => {
        return (
          <div key={comment.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  {...stringAvatar(comment.ownerFullName)}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={comment.description}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      fontWeight={700}
                    >
                      {comment.ownerFullName}
                    </Typography>
                    {" — "}
                    <span> {comment.createdDate} </span>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </List>
  );
}
