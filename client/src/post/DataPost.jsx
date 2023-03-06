import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIsHidden } from "../hooks/useIsHidden";
import { getUser, getUser2 } from "../store/actions/user.action";
import Comment from "./Comment";

function DataPost({ post }) {


  return (
    <div className="bg-white shadow rounded-md dark:bg-gray-900 -mx-2 lg:mx-0">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex flex-1 items-center space-x-4">
          <Link to={`/user/${post.userId}`}>
            <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-0.5 rounded-full">
              <img
                src={`${post.avatar}`}
                onError={(e) => e.target.src = "https://i.imgur.com/6VBx3io.png"}
                alt="avatar"
                className="bg-gray-200 border border-white rounded-full w-8 h-8"
              />
            </div>
          </Link>
          <span className="block capitalize font-semibold text-gray-500 dark:text-gray-100">
            <p className="font-bold">{post.username} </p> on
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
      </div>
      <div>

        <Link to={`/post/${post.id}`}>
          <h2 className="px-4 py-1 font-bold text-lg">{post?.title}</h2>
          <div className="px-4 py-3 max-h-[500px] w-full object-cover overflow-hidden rounded-md">
            <img src={post.image} alt="" />
          </div>
        </Link>
      </div>
      <Comment post={post} />
    </div>
  );
}

export default DataPost;
