import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import { Link, useParams } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
// import ProfileTabs from "./ProfileTabs"; 
import PostByUser from "./PostByUser";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getPostByUser } from "../store/actions/user.action";
import Load from "../components/load";

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(false);
  const checkFollow = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.find((follower) => {
      return follower._id === jwt.user._id;
    });
    return match;
  };



  useEffect(
    () => {
      dispatch(getUser(userId, setFollowing, checkFollow));
      dispatch(getPostByUser(userId));
    },
    // eslint-disable-next-line
    [userId]
  );

  const { loading } = useSelector((state) => state.common);
  const { users, postByUser } = useSelector((state) => state.user);
  const clickFollowButton = (callApi) => {
    // console.log(isAuthenticated())
    const userId = isAuthenticated().id;
    const token = isAuthenticated().token;
    callApi(userId, token, users.id).then((data) => {
      setFollowing(!following);
    });
  };

  console.log(users);
  return (
    <>
      {loading || !users ? (
        <>
          <Load />
        </>
      ) : (
        <div className="container pro-container m-auto">
          <div className="flex lg:flex-row flex-col items-center lg:py-8 lg:space-x-8">
            <div>
              <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-1 rounded-full m-0.5 mr-2  w-56 h-56 relative overflow-hidden uk-transition-toggle">
                <img
                  src={`${users.avatar}`}
                  onError={(i) =>
                    (i.target.src = `https://www.tenforums.com/attachments/tutorials/146359d1501443008-change-default-account-picture-windows-10-a-user.png`)
                  }
                  alt={users.username}
                  className="bg-gray-200 border-4 border-white rounded-full w-full h-full dark:border-gray-900"
                />
                <div className="absolute -bottom-3 custom-overly1 flex justify-center pt-4 pb-7 space-x-3 text-2xl text-white uk-transition-slide-bottom-medium w-full">
                  <Link href="#" className="hover:text-white">
                    <i className="uil-camera" />
                  </Link>
                  <Link href="#" className="hover:text-white">
                    <i className="uil-crop-alt" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w/8/12 flex-1 flex flex-col lg:items-start items-center">
              <h2 className="font-semibold lg:text-2xl text-lg mb-2">
                {users.username}
              </h2>
              <p className="lg:text-left mb-2 text-center  dark:text-gray-100">
                {users.about}
              </p>
              <p className="lg:text-left mb-2 text-center  dark:text-gray-100">{`Joined ${new Date(
                users.createdAt
              ).toDateString()}`}</p>
              <div className="flex font-semibold mb-3 space-x-2  dark:text-gray-10">
                <Link href="#">Travailing</Link> , <Link href="#">Sports</Link>{" "}
                ,<Link href="#">Movies</Link>
              </div>
              <div className="capitalize flex font-semibold space-x-3 text-center text-sm my-2">
                {isAuthenticated().user &&
                  isAuthenticated().user._id === users._id ? (
                  <>
                    <Link
                      className="bg-gray-300 shadow-sm p-2 px-6 rounded-md dark:bg-gray-700"
                      to={`/post/create`}
                    >
                      Create Post
                    </Link>
                    <Link
                      className="bg-pink-500 shadow-sm p-2 pink-500 px-6 rounded-md text-white hover:text-white hover:bg-pink-600"
                      to={`/user/edit/${users._id}`}
                    >
                      Edit Profile
                    </Link>
                    <DeleteUser userId={users._id} />
                  </>
                ) : (
                  <FollowProfileButton
                    following={following}
                    onButtonClick={clickFollowButton}
                  />
                )}
                {isAuthenticated().user &&
                  isAuthenticated().user.role === "admin" && (
                    <div class="card mt-5">
                      <div className="card-body">
                        <h5 className="card-title">Admin</h5>
                        <p className="mb-2 text-danger">
                          Edit/Delete as an Admin
                        </p>
                        <Link
                          className="btn btn-raised btn-success mr-5"
                          to={`/user/edit/${users._id}`}
                        >
                          Edit Profile
                        </Link>
                        <DeleteUser userId={users._id} />
                        <DeleteUser />
                      </div>
                    </div>
                  )}
                <div>
                  <Link
                    href="#"
                    className="bg-gray-300 flex h-12 h-full items-center justify-center rounded-full text-xl w-9 dark:bg-gray-700"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </Link>
                  <div
                    className="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base dark:bg-gray-900 uk-drop"
                    uk-drop="mode: click"
                  >
                    <ul className="space-y-1">
                      <li>
                        <Link
                          href="#"
                          className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700"
                        >
                          <i className="uil-user-minus mr-2" />
                          Unfriend
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700"
                        >
                          <i className="uil-eye-slash  mr-2" />
                          Hide Your Story
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-700"
                        >
                          <i className="uil-share-alt mr-2" /> Share This
                          Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="-mx-2 my-2  dark:border-gray-700" />
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600"
                        >
                          <i className="uil-stop-circle mr-2" /> Block
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <ProfileTabs
                followers={users.followers}
                following={users.following}
                posts={postByUser}
              /> */}
            </div>
            <div className="w-20" />
          </div>
          {postByUser !== null && <PostByUser posts={postByUser} />}
        </div>
      )}
    </>
  );
};

export default Profile;
