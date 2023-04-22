import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { findPeople } from "../../user/apiUser";
import User from "./User";
import Post from "./Post";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;



function AdminTemplate() {
  const isAdmin = isAuthenticated();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState(1);
  useEffect(async () => {

    if (!isAdmin?.user?.isAdmin) {
      window.location.href = "/";
    }

    findPeople().then((data) => {
      if (data) {
        setUsers(data);
      }
    });

    getAllPost();

  }, [])


  function getAllPost() {
    axios({
      method: "GET",
      url: `${API_URL}/posts`,
    }).then((data) => {
      setPosts(data.data)
    })
  }

  return (
    <>
      <header className="px-10 font-bold text-pink-500">
        <div className="flex items-center justify-between w-full">
          <a href="/">Back to home </a>
          <p className="text-3xl font-bold">
            Admin
          </p>
        </div>

      </header>
      <main className="d-flex container m-auto ">
        <div className="flex gap-10">
          <div className="space-y-2 w-[250px] font-bold">
            <div onClick={() => setTab(1)} className={`py-2 px-4 cursor-pointer hover:text-pink-600 border hover:border-pink-500 rounded-full ${tab == 1 ? 'text-pink-600 border-pink-500 ' : ''} `}>
              Danh sách người dùng
            </div>
            <div onClick={() => setTab(2)} className={`py-2 px-4 cursor-pointer hover:text-pink-600 border hover:border-pink-500 rounded-full ${tab == 2 ? 'text-pink-600 border-pink-500 ' : ''} `}>
              Danh sách sản phẩm
            </div>
            <div onClick={() => setTab(3)} className={`py-2 px-4 cursor-pointer hover:text-pink-600 border hover:border-pink-500 rounded-full ${tab == 3 ? 'text-pink-600 border-pink-500 ' : ''} `}>
              Danh sách tin xấu
            </div>
            <div onClick={() => setTab(4)} className={`py-2 px-4 cursor-pointer hover:text-pink-600 border hover:border-pink-500 rounded-full ${tab == 4 ? 'text-pink-600 border-pink-500 ' : ''} `}>
              Danh sách người dùng
            </div>
            <div onClick={() => setTab(5)} className={`py-2 px-4 cursor-pointer hover:text-pink-600 border hover:border-pink-500 rounded-full ${tab == 5 ? 'text-pink-600 border-pink-500 ' : ''} `}>
              Danh sách bình luận xấu
            </div>
          </div>
          <div className="flex-1 w-full">
            {tab === 1 && <User arr={users} />}
            {tab === 2 && <Post arr={posts} />}
            {/* {tab === 3 && <Post arr={posts} />}
            {tab === 4 && <Post arr={posts} />}
            {tab === 5 && <Post arr={posts} />} */}

          </div>
        </div>
      </main>
    </>
  );
}

const RouterAdminTemplate = ({ path, exact, Component }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isAuthenticated() ? (
          <AdminTemplate>
            <Component {...props} />
          </AdminTemplate>
        ) : (
          <Redirect
            to={{
              pathname: "/signIn",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default RouterAdminTemplate;
