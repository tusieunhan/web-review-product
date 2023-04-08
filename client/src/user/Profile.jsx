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


  console.log(isAuthenticated());

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
                @{users.username}
              </h2>
              <p className="lg:text-left mb-2 text-center  dark:text-gray-100">
                {users.about}
              </p>
              <p className="lg:text-left mb-2 text-center  dark:text-gray-100">{`Joined ${new Date(
                users.createdAt
              ).toDateString()}`}</p>
              <div className="flex font-semibold mb-3 space-x-2  dark:text-gray-10">
                <a href={`mailto:` + users.email}>{users.email}</a>
              </div>
              <div className="capitalize flex font-semibold space-x-3 text-center text-sm my-2">
                {isAuthenticated().user &&
                  isAuthenticated().user._id === users._id ? (
                  <>
                    <Link
                      className="bg-pink-500 shadow-sm p-2 pink-500 px-6 rounded-md text-white hover:text-white hover:bg-pink-600"
                      to={`/setting`}
                    >
                      Sửa thông tin
                    </Link>
                    <Link
                      className="bg-pink-500 shadow-sm p-2 pink-500 px-6 rounded-md text-white hover:text-white hover:bg-pink-600"
                      to={`/post/create`}
                    >
                      Tạo bài viết
                    </Link>
                    {/* <DeleteUser userId={users._id} /> */}
                  </>
                ) : (
                  <FollowProfileButton
                    following={following}
                    onButtonClick={clickFollowButton}
                  />
                )}

                {isAuthenticated().user &&
                  isAuthenticated().user.isAdmin && (
                    <div class="card">
                      <div className="card-body">
                        <DeleteUser userId={users._id} />
                      </div>
                    </div>
                  )}
                <div>
                </div>
              </div>

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
