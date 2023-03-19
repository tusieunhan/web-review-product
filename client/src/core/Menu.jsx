import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useIsLogin } from "../hooks/useIsLogin";
import { useDispatch } from "react-redux";
import { actLogout } from "../store/actions/user.action";

const Menu = () => {
  const dispatch = useDispatch();
  const { isLogin, avatar } = useIsLogin();
  const history = useHistory();
  const [text, setText] = useState("all");
  function handleLogout(e) {
    e.preventDefault();
    dispatch(actLogout());
  }
  const onSearch = (e) => {
    e.preventDefault();
    if (!text || text.length === 0) {
      return;
    }
    window.location.href = `/search/${text}`;
    setText("");

  };
  return (
    <header>
      <div className="header_inner">
        <div className="left-side">
          <div id="logo" className=" uk-hidden@s">

          </div>
          <div
            className="triger"
            uk-toggle="target: #wrapper ; cls: sidebar-active"
          >
            <i className="uil-bars" />
          </div>
          <form onSubmit={onSearch}>
            <div className="header_search">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Search.."
              />
              <button type="submit" className="icon-search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="right-side lg:pr-4">
          <Link
            to={`/post/create`}
            className="bg-pink-500 font-bold hover:bg-pink-600 hover:text-white lg:block max-h-10 mr-4 px-4 py-2 rounded text-white"
          >
            <ion-icon
              name="add-circle"
              class="-mb-1 mr-1 opacity-90 text-xl uilus-circle"
            ></ion-icon>{" "}
            Tạo bài viết
          </Link>

          <div>
            <Link href="#">
              <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-0.5 rounded-full ">
                <img
                  src={
                    isLogin.avatar
                      ? isLogin.avatar
                      : `https://www.tenforums.com/attachments/tutorials/146359d1501443008-change-default-account-picture-windows-10-a-user.png`
                  }
                  class="bg-gray-200 border border-white rounded-full w-8 h-8 object-cover"
                  alt="avatar"
                />
              </div>
            </Link>
            <div
              uk-drop="mode: click;offset:9"
              className="header_dropdown profile_dropdown border-t"
            >
              <ul>
                <li>
                  <Link to={'/setting'}> Cập nhập thông tin  </Link>
                </li>
                <li>
                  <Link href="#"> Ví của bạn </Link>
                </li>
                <li>
                  <Link href="#"> Trợ giúp mua hàng </Link>
                </li>
                <li>
                  <Link to="/signIn" onClick={handleLogout}>
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Menu;
