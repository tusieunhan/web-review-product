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
  const [usersReport, setUsersReport] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsReport, setPostsReport] = useState([]);
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
    getAllUserReport()
    getAllPost();
    getAllPostReport()
  }, [])


  function getAllPost() {
    axios({
      method: "GET",
      url: `${API_URL}/posts`,
    }).then((data) => {
      setPosts(data.data)
    })
  }

  function getAllPostReport() {
    axios({
      method: "GET",
      url: `${API_URL}/postsreport`,
    }).then((data) => {
      setPostsReport([])
      setPostsReport(data.data)
    })
  }
  function getAllUserReport() {
    axios({
      method: "GET",
      url: `${API_URL}/usersreport`,
    }).then((data) => {
      setUsersReport([])
      setUsersReport(data.data)
    })
  }

  const delPostReport = (id) => {
    axios({
      method: "DELETE",
      url: `${API_URL}/postsreport/${id}`,
    }).then((data) => {
      getAllPostReport()
    })
  }

  const handelUser = (id) => {
    axios({
      method: "DELETE",
      url: `${API_URL}/usersreport/${id}`
    })
      .then((data) => {
        getAllUserReport()
      })
  }

  const addRole = (id) => {
    if (id === '6405a47ed21b4a7c8f5a7359') {
      alert("Không thể xoá quyền người dùng này")
      return;
    }
    axios({
      method: "POST",
      url: `${API_URL}/usersreport/role/${id}`,
    }).then((data) => {
      findPeople().then((data) => {
        if (data) {
          setUsers(data);
        }
      });
      alert("Cấp / Xoá quyền thành công")
    })

  }


  return (
    <>
      <header className="px-10 font-bold text-pink-500">
        <div className="flex items-center justify-between w-full">
          <a href="/">Quay lại trang chủ </a>
          <p className="text-2xl font-bold uppercase">
            Trang quản trị
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
              Danh sách người dùng xấu
            </div>
            <div onClick={() => setTab(5)} className={`py-2 px-4 cursor-pointer hover:text-pink-600 border hover:border-pink-500 rounded-full ${tab == 5 ? 'text-pink-600 border-pink-500 ' : ''} `}>
              Xoá / Cấp quyền quản trị
            </div>

          </div>
          <div className="flex-1 w-full">
            {tab === 1 && <User arr={users} />}
            {tab === 5 && <User arr={users} role addRole={addRole} />}
            {tab === 2 && <Post arr={posts} />}
            {tab === 3 && <Post arr={postsReport} report delPostReport={delPostReport} />}
            {tab === 4 && <User arr={usersReport} report handelUser={handelUser} />}

            {/* {tab === 5 && <Post arr={posts} />} */}


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
