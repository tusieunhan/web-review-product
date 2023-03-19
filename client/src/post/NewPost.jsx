import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Load from "../components/load";
import { useIsLogin } from "../hooks/useIsLogin";
import { getUser, putProfile } from "../store/actions/user.action";
import { storeImageToFireBase } from "../utils/storeImageToFirebase.";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { create } from "./apiPost";
function NewPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const { loading, isLogin } = useIsLogin();
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState("");
  useEffect(
    () => {
      dispatch(getUser(isLogin._id));
    },

    []
  );
  const { users } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(users || {});
  }, [users]);

  function handleChange(value) {
    setContent(value);
  }

  console.log(title);

  useEffect(
    () => {
      const uploadImage = async () => {
        setIsLoading(true);
        if (!selectedFile) {
          setIsLoading(false);
          return;
        }
        const { isSuccess, imageUrl, message } = await storeImageToFireBase(
          selectedFile
        );
        if (isSuccess) {
          setPhoto(imageUrl);
          setIsLoading(false);
          return imageUrl;
        } else {
          console.log(message);
        }
        setIsLoading(false);
      };
      uploadImage();
    },
    // eslint-disable-next-line
    [selectedFile]
  );

  const clickSubmit = (event) => {
    event.preventDefault();
    create(user._id, content, photo, isLogin, title).then((data) => {
      if (data) history.push("/");
    });
  };
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };


  return (
    <div className="container m-auto">
      <h1 className="text-2xl leading-none text-gray-900 tracking-tight mt-3">
        Tạo một bài viết review mới
      </h1>
      {user === null || users === null ? (
        <Load />
      ) : (
        <form onSubmit={clickSubmit} noValidate>
          <div className=" mt-12 gap-8">
            <div>
              <div className="px-4 py-3 -mx-5 -mt-4 mb-5 border-b w-full">
                <h4>Hình ảnh chính cho sản phẩm</h4>
              </div>
              <div className="w-full min-h-[300px]">
                <div
                  className="bg-gray-400 border-2 min-h-full border-dashed flex flex-col h-[500px]  items-center justify-center relative w-full rounded-lg dark:bg-gray-800 dark:border-gray-600"
                  style={{
                    background: `url(${photo}) center center / cover no-repeat`,
                  }}
                >
                  <p className="my-3 leading-6">
                    Bạn muốn thay đổi hình ảnh chính cho sản phẩm này?
                  </p>
                  <div uk-form-custom className="uk-form-custom">
                    {isLoading ? (
                      <>
                        <button
                          type="button"
                          disabled
                          style={{
                            opacity: ".4",
                            display: "inline-flex",
                            alignItems: "center",
                            height: "40px",
                          }}
                          className="button soft-warning small"
                        >
                          Choose file <Load isSmall={true} />
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          onChange={onSelectFile}
                          type="file"
                          accept="image/*"
                          className="shadow-none bg-gray-100"
                        />
                        <button
                          type="button"
                          className="button soft-warning small"
                        >
                          Choose file
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

            </div>
            <div className="my-4">
              <label className="mt-4" htmlFor="">Tiêu đề của sản phẩm</label>
              <input className="w-full border" type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="bg-white post-content dark:bg-gray-900 rounded-md lg:shadow-lg shadow col-span-2 p-8 space-y-8 min-h-[200px] mb-10">
              <label className="" htmlFor="">Nội dung của sản phẩm</label>
              <ReactQuill
                value={content}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-10 p-6 pt-0 flex justify-end space-x-3">
              <Link
                to="#"
                className="p-2 px-4 rounded bg-gray-50 text-red-500"
              >
                Thoát
              </Link>
              {loading ? (
                <button
                  className="button bg-blue-700"
                  disabled
                  style={{
                    opacity: ".4",
                    display: "inline-flex",
                    alignItems: "center",
                    height: "40px",
                  }}
                >
                  Đăng ngay
                  <Load isSmall={true} />
                </button>
              ) : (
                <button className="button bg-blue-700">Đăng ngay</button>
              )}
            </div>
          </div>
        </form>
      )
      }
    </div >
  );
}

export default NewPost;
