import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIsLogin } from "../hooks/useIsLogin";
import Comment from "./Comment";
import { remove } from "./apiPost";

function DataPost({ post }) {
  const { isLogin } = useIsLogin();
  const [isAdmin, setIsAdmin] = useState(post.userId == isLogin._id || isLogin.isAdmin);
  const handleDel = async () => {
    await remove(post._id, isLogin._id)
    window.location.reload()
  }

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
        {isAdmin && (
          <>
            <div onClick={handleDel} className="p-2 rounded-sm text-gray-400 hover:text-pink-500 hover:bg-pink-50 cursor-pointer"> <svg width='18px' height='18px' fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></div>
          </>
        )}
      </div>
      <div>

        <Link to={`/post/${post._id}`}>
          <h2 className="px-4 py-1 font-bold text-lg">{post?.title}</h2>
          <div className=" py-6 max-h-[500px] w-full object-cover overflow-hidden">
            <img src={post.image} alt="" className="w-full h-full object-contain " />
          </div>
        </Link>
      </div>
      <Comment post={post} />
    </div>
  );
}

export default DataPost;
