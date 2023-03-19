import React, { useEffect, useState } from "react";
import { findPeople } from "./apiUser";
import { Link } from "react-router-dom";

function FindPeople() {
  const [users, setUsers] = useState([]);
  useEffect(
    () => {
      findPeople().then((data) => {
        if (data) {
          console.log(data);
          setUsers(data);
        }
      });
    },

    []
  );

  return (
    <div className="lg:w-5/12">
      <div className="uk-sticky" uk-sticky="offset:90; bottom:true ; media @m">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 flex items-baseline justify-between py-4 px-6 dark:border-gray-800">
            <h2 className="font-semibold text-lg">Người dùng nổi bật</h2>
            <Link to="#"> Refresh</Link>
          </div>
          <div className="divide-gray-300 divide-gray-50 divide-opacity-50 divide-y px-4 dark:divide-gray-800 dark:text-gray-100">
            {users &&
              users?.map((user, i) => i < 5 && (
                <div className="flex items-center justify-between py-3" key={i}>
                  <div className="flex flex-1 items-center space-x-4">
                    <Link to={`/user/${user._id}`}>
                      <img
                        src={`${user.avatar}`}
                        onError={(i) =>
                          (i.target.src = `https://i.imgur.com/6VBx3io.png`)
                        }
                        alt={user.name}
                        className="bg-gray-200 rounded-full w-10 h-10"
                      />
                    </Link>
                    <div className="flex flex-col ">
                      <span className="block capitalize font-semibold text-gray-500 dark:text-gray-100">
                        @{user.username}
                      </span>
                      <span className="block capitalize text-sm text-gray-500 dark:text-gray-100  ">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <Link to={`/user/${user._id}`}
                    // onClick={() => clickFollow(user)}
                    className="border border-gray-200 font-semibold px-4 py-1 rounded-full bg-pink-600 text-white hover:border-pink-600 dark:border-gray-800"
                  >
                    Xem
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden mt-5">
          <div className="bg-gray-50 border-b border-gray-100 flex items-baseline justify-between py-4 px-6 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="font-semibold text-lg">Các bài viết đề xuất</h2>
            <Link to="#"> See all</Link>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3 uk-link-reset">
            <div className="bg-red-500 max-w-full h-32 rounded-lg relative overflow-hidden uk-transition-toggle">
              <a href="#story-modal" uk-toggle>
                <img
                  src="https://source.unsplash.com/random/?bakery,bake,1"
                  alt=""
                  className="w-full h-full absolute object-cover inset-0"
                />
              </a>
              <div className="flex flex-1 justify-around items-center absolute bottom-0 w-full p-2 text-white custom-overly1 uk-transition-slide-bottom-medium">
                <Link to="#">
                  <i className="uil-heart" /> 150
                </Link>
                <Link to="#">
                  <i className="uil-heart" /> 30
                </Link>
              </div>
            </div>
            <div className="bg-red-500 max-w-full h-40 rounded-lg relative overflow-hidden uk-transition-toggle">
              <Link to="#story-modal" uk-toggle>
                <img
                  src="https://source.unsplash.com/random/?bakery,bake,2"
                  alt=""
                  className="w-full h-full absolute object-cover inset-0"
                />
              </Link>
              <div className="flex flex-1 justify-around items-center absolute bottom-0 w-full p-2 text-white custom-overly1 uk-transition-slide-bottom-medium">
                <Link to="#">
                  <i className="uil-heart" /> 150
                </Link>
                <Link to="#">
                  <i className="uil-heart" /> 30
                </Link>
              </div>
            </div>
            <div className="bg-red-500 max-w-full h-40 -mt-8 rounded-lg relative overflow-hidden uk-transition-toggle">
              <Link to="#story-modal" uk-toggle>
                <img
                  src="https://source.unsplash.com/random/?bakery,bake,3"
                  alt=""
                  className="w-full h-full absolute object-cover inset-0"
                />
              </Link>
              <div className="flex flex-1 justify-around  items-center absolute bottom-0 w-full p-2 text-white custom-overly1 uk-transition-slide-bottom-medium">
                <Link to="#">
                  <i className="uil-heart" /> 150
                </Link>
                <Link to="#">
                  <i className="uil-heart" /> 30
                </Link>
              </div>
            </div>
            <div className="bg-red-500 max-w-full h-32 rounded-lg relative overflow-hidden uk-transition-toggle">
              <Link to="#story-modal" uk-toggle>
                <img
                  src="https://source.unsplash.com/random/?bakery,bake,4"
                  alt=""
                  className="w-full h-full absolute object-cover inset-0"
                />
              </Link>
              <div className="flex flex-1 justify-around  items-center absolute bottom-0 w-full p-2 text-white custom-overly1 uk-transition-slide-bottom-medium">
                <Link to="#">
                  <i className="uil-heart" /> 150
                </Link>
                <Link to="#">
                  <i className="uil-heart" /> 30
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindPeople;
