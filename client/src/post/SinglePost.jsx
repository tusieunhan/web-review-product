import React, { useEffect, useState } from "react";
import { singlePost, remove, likePost, unlike } from "./apiPost";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Comment from "./Comment";
import { update } from "./apiPost"
import { useDispatch } from "react-redux";
import axios from "axios";




import Load from "../components/load";
import { useIsHidden } from "../hooks/useIsHidden";
import { useIsLogin } from "../hooks/useIsLogin";
import { getComment, postComment } from "../store/actions/post.action";


function SinglePost() {

  const API_URL = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();

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
        setTotal(data.likes?.length)
        setLikes(data.likes?.includes(isLogin._id))
      }
    });
  },
    [postId]
  );

  const updateComments = (comments) => {
    setComments(comments);
  };

  const { hidden, handleClick } = useIsHidden();
  const [loading, setLoading] = useState(false);
  const [listComment, setListComment] = useState(null);
  const [likes, setLikes] = useState(false);
  const [total, setTotal] = useState(0);
  const [report, setreport] = useState(false);



  const [text, setText] = useState("");
  const onClickPostId = (id) => {
    handleClick();
    setLoading(true);
    dispatch(getComment(id, setListComment));
    setLoading(false);
  };
  const fomatDate = (date) => {
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    let diffDays;
    if (diffTime > 3600000) {
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + ' ngày trước';
    } else {
      diffDays = Math.ceil(diffTime / (1000 * 60)) + ' phút trước';
    }
    return diffDays;
  }

  const onClickLike = async (e) => {
    const res = await likePost(isLogin._id, e)
    setLikes(!res.likes.includes(isLogin._id))
    setTotal(likes ? total - 1 : total + 1)
  }

  const handleReport = (id) => {
    setreport(true)
    axios({
      method: "POST",
      url: `${API_URL}/postsreport/${id}`,
    }).then(() => {
      alert('Báo cáo thành công')
    })
  }

  const onComment = (e) => {
    e.preventDefault();
    dispatch(
      postComment(
        text,
        isLogin._id,
        post._id,
        setListComment,
        listComment
      )
    );
    setText("");
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
          <button onClick={() => handleReport(post._id)} className="mr-2 hover:text-red-600 cursor-pointer ">{!report ? 'Báo cáo' : "Đã báo cáo"}</button>
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
        {/* <Comment post={post} /> */}
        <div className="py-3 px-4 space-y-3">
          <div className="flex space-x-4 lg:font-bold">
            <button
              onClick={() => onClickLike(post._id)}
              className={likes ? 'text-red-500 flex items-center space-x-2' : 'flex items-center space-x-2'} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width={22}
                height={22}
                className=''
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <div>  {total} Thích </div>
            </button>
            <button
              className="flex items-center space-x-2"
              onClick={() => onClickPostId(post._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width={22}
                height={22}
                className="dark:text-gray-100 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                />
              </svg>
              <div> {post?.comments?.length ? post?.comments?.length + " Người đã đánh giá" : "Đánh giá ngay"}</div>
            </button>
            <button className="flex items-center space-x-2 flex-1 justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width={22}
                height={22}
                className="dark:text-gray-100 text-gray-500"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              <a href={`http://www.facebook.com/share.php?u=${encodeURIComponent(window.location.href)}`} > Chia sẽ ngay</a>
            </button>
          </div>
          {hidden && (
            <>
              <div className="border-t pt-4 space-y-4 dark:border-gray-600">
                {loading ? (
                  <Load isSmall={true} />
                ) : (
                  <>
                    {listComment && (
                      <>
                        {listComment.length > 0 ? (
                          <>
                            {listComment.map((comment, i) => (
                              <div className="flex" key={i}>
                                <div className="w-10 h-10 rounded-full relative flex-shrink-0">
                                  <img
                                    src={comment.avatar ? comment.avatar : 'https://firebasestorage.googleapis.com/v0/b/bakery-9a92d.appspot.com/o/images%2Favatardefault_92824.webp0049579c-755c-41f3-9785-e443b6b03679?alt=media&token=17bf565a-0fbf-4b5a-afa8-6866564608c7'}
                                    alt=""
                                    className="absolute h-full rounded-full w-full"
                                  />
                                </div>
                                <div className="text-gray-700 py-2 px-3 rounded-md bg-gray-100 h-full relative lg:ml-5 ml-2 lg:mr-20  dark:bg-gray-800 dark:text-gray-100">
                                  <p className="font-bold">@{comment.username}  -  <span className="text-sm opacity-50 font-light">{fomatDate(comment.dateNow)}</span></p>
                                  <p className="leading-6">
                                    {comment.comment}
                                    <i className="uil-grin-tongue-wink"> </i>
                                  </p>
                                  <div className="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800" />
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="flex">comment not found</div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              <form onSubmit={onComment}>
                <div className="bg-gray-100 bg-gray-100 rounded-full rounded-md relative dark:bg-gray-800">
                  <input
                    type="text"
                    placeholder="Add your Comment.."
                    className="bg-transparent max-h-10 shadow-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );

}

export default SinglePost;
