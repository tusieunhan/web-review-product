import React, { useEffect, useState } from "react";
import { singlePost, remove, likePost, unlike } from "./apiPost";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Comment from "./Comment";
import { useIsLogin } from "../hooks/useIsLogin";
import { update } from "./apiPost"
function SinglePost() {

  const { isLogin } = useIsLogin();
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  const [title, setTitle] = useState(post.title);
  const [desc, setDesc] = useState(post.title);

  const [edit, setEdit] = useState(true);
  const handleDel = async () => {
    await remove(post._id, isLogin._id, isLogin.token)
    window.location.reload()
  }
  const [isAdmin, setIsAdmin] = useState(post.userId == isLogin._id);


  const handleSave = async () => {
    let userId = isLogin._id
    await update(post._id, { title, desc, userId })
    window.location.reload()
  }

  useEffect(async () => {
    singlePost(postId).then((data) => {
      if (!data) {
        console.log(data);
      } else {
        setIsAdmin(data.userId == isLogin._id)
        setPost(data);
      }
    });
  },
    // eslint-disable-next-line
    [postId]
  );

  const updateComments = (comments) => {
    setComments(comments);
  };

  return (
    <div className="flex justify-center w-full mt-[100px]">
      <div className="bg-white shadow rounded-md dark:bg-gray-900 -mx-2 lg:mx-0 max-w-[800px] ">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex flex-1 items-center space-x-4">
            <Link to={edit ? `/userId/${post.userId}` : ''}>
              <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-0.5 rounded-full">
                <img
                  src={`${post.avatar}`}
                  onError={(i) =>
                    (i.target.src = `https://source.unsplash.com/random/?bakery,bake,${post.username}`)
                  }
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
              {!edit && <div onClick={handleSave} className="p-2 mr-1 rounded-sm hover:text-pink-500  cursor-pointer"> <svg width='18px' height='18px' fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg></div>}
              <div onClick={() => setEdit(!edit)} className={`${!edit && '! text-pink-500'} p-2 mr-1 rounded-sm text-gray-400 hover:text-pink-500 cursor-pointer `}> <svg width='18px' height='18px' fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg></div>
              <div onClick={handleDel} className="p-2 rounded-sm text-gray-400 hover:text-pink-500  cursor-pointer"> <svg width='18px' height='18px' fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></div>
            </>
          )}
        </div>
        <div>
          <h5 contentEditable={!edit} onInput={(e) => setTitle(e.target.innerText)} className="px-4 text-3xl">{post.title}</h5>

          <Link >
            <div className="px-4 py-3 max-h-[700px] w-full object-cover overflow-hidden rounded-md">
              <img src={post.image} alt="" className="h-full w-full object-cover" />
            </div>
          </Link>
          <div className="p-4 ">
            <div onInput={(e) => setDesc(e.target.innerHTML)} contentEditable={!edit} dangerouslySetInnerHTML={{ __html: post.desc }}></div>
          </div>


        </div>
        <Comment post={post} />
      </div>
    </div>
  );

}

export default SinglePost;
