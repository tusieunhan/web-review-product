import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Load from "../components/load";
import { useIsLogin } from "../hooks/useIsLogin";
import { getUser, putProfile } from "../store/actions/user.action";
import { storeImageToFireBase } from "../utils/storeImageToFirebase.";

function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, isLogin } = useIsLogin();
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
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

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

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
          setAvatar(imageUrl);
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
    dispatch(putProfile(user.about, user.email, user.country, avatar, history));
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
      <Link to={'/setting'} className="text-2xl leading-none text-gray-900 tracking-tight mt-3">
        Cài đặt tài khoản
      </Link>
      {user === null || users === null ? (
        <Load />
      ) : (
        <form onSubmit={clickSubmit} noValidate>
          <div className="grid lg:grid-cols-3 mt-12 gap-8">
            <div>
              <div className="px-4 py-3 -mx-5 -mt-4 mb-5 border-b">
                <h4>Profile Photo</h4>
              </div>
              <div className="flex justify-center flex-center text-center dark:text-gray-300">
                <div className="flex flex-col choose-upload text-center">

                  <div
                    className="bg-gray-400 border-2  border-dashed flex flex-col h-56 items-center justify-center relative w-full rounded-lg dark:bg-gray-800 dark:border-gray-600"
                    style={{
                      background: `url(${avatar ? avatar : user.avatar}) center center / cover no-repeat`,
                    }}
                  ></div>

                  <p className="my-3 leading-6">
                    Do you have a photo wants to share us <br /> please upload
                    her ..
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
                          Chọn ảnh
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 -mx-5 -mb-4 mt-5 border-t text-sm dark:border-gray-500 dark:text-gray-500">
                Bạn chỉ có thể tải lên một tệp dưới 99MB <br />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-md lg:shadow-lg shadow col-span-2 p-8 space-y-8 ">
              <div>
                <label htmlFor> Thông tin </label>
                <input
                  type="text"
                  name="about"
                  onChange={handleChange}
                  value={user.about}
                  placeholder="Your name.."
                  className="shadow-none bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor>Thành phố</label>
                <input
                  type="text"
                  name="country"
                  onChange={handleChange}
                  value={user.country}
                  placeholder="Your birth date.."
                  className="shadow-none bg-gray-100"
                />
                <div className="mt-8">
                  <label htmlFor> Email</label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={user.email}
                    placeholder="Your Email.."
                    className="shadow-none bg-gray-100 "
                  />
                </div>
              </div>

              <div className="bg-gray-10 p-6 pt-0 flex justify-end space-x-3">
                <Link
                  to="#"
                  className="p-2 px-4 rounded bg-gray-50 text-red-500"
                >
                  Cancel
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
                    Cập nhập
                    <Load isSmall={true} />
                  </button>
                ) : (
                  <button className="button bg-blue-700">Cập nhập</button>
                )}
              </div>
            </div>
          </div>
        </form>
      )
      }
    </div >
  );
}

export default EditProfile;
