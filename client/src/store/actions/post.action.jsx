import axios from "axios";
import { NotificationManager } from "react-notifications";
import { startLoading, stopLoading } from "../actions/common.action";

const API_URL = process.env.REACT_APP_API_URL;

export const Post = ({ postBody, recipe, tool, history }) => {
  const userLogin = localStorage.getItem("userLogin");
  const token = userLogin ? JSON.parse(userLogin).token : "";

  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "POST",
      url: `${API_URL}/post`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      data: {
        postBody,
        recipe: {
          name: recipe.postBody,

          steps: recipe.steps.map((item, index) => {
            return {
              step: item.recipe.name,
              description: item.recipe.description,
              ingredients: item.tool.map((item, index) => {
                return {
                  id: 1,
                  quantity: index
                }
              }),
              image: item.recipe?.postImages ? item.recipe?.postImages[0].image : null

            }
          }),
          tool: ['a', 'b', 'c']
        }
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        history.push("/");
        NotificationManager.success("post was add successfully");
      })
      .catch((err) => {
        dispatch(stopLoading());
      });
  };
};

export const getListPost = (
  page,
  posts,
  setPosts,
  setTotalPages,
  setLoading
) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `${API_URL}/posts`,
    })
      .then((res) => {
        dispatch(stopLoading());
        setPosts([...posts, ...res.data]);
        setLoading(false);
        // setTotalPages(res.data.totalPage);
      })
      .catch((err) => {
        dispatch(stopLoading());
      });
  };
};

export const getComment = (id, setListComment) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `${API_URL}/comments/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: null,
    })
      .then((res) => {
        console.log(res.data);
        setListComment(res.data.comments);
      })
      .catch((err) => { });
  };
};

export const postComment = (
  text,
  userId,
  postId,
  setListComment,
  listComment
) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "POST",
      url: `${API_URL}/comments`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        comment: text,
        userId,
        postId
      },
    })
      .then((res) => {
        console.log(res.data);
        setListComment([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
