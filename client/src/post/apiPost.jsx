import axios from "axios";
import { useIsLogin } from "../hooks/useIsLogin";

export const create = (userId, content, photo, isLogin, title) => {
  console.log(isLogin);
  return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, desc: content, image: photo, avatar: isLogin.avatar, username: isLogin.username, title }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const list = (page) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post?page=${page}&size=5`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response.json());
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const listAll = async () => {
  return await (await axios.get(`${process.env.REACT_APP_API_URL}/post?page=1&size=30`)).data.list;
};

export const singlePost = (postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listByUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/by/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const remove = (postId, userId) => {

  return fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(userId),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const update = (postId, post) => {

  return fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...post }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const likePost = (userId, postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/posts/like/unlike`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, postId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const unlike = (userId, token, postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const comment = (userId, token, postId, comment) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId, comment }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const uncomment = (userId, token, postId, comment) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId, comment }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
