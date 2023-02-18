import React, { useEffect } from "react";
import SectionContainer from "../SectionContainer";
import SectionHeader from "../SectionHeader";
import styles from "./Popular.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import "aos/dist/aos.js";
import { Link } from "react-router-dom";

const Popular = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
    Aos.refresh();
  }, []);
  return (
    <div data-aos={"fade-down"}>
      <SectionContainer>
        <SectionHeader>Đánh giá sản phẩm từ người dùng thực tế</SectionHeader>
        <div className={styles["trip-container"]}>
          <div className={styles["trip-items"]}>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 hover:text-yellow-700 uk-link-reset">
              <div>
                <div className="bg-red-400 max-w-full lg:h-64 h-4 rounded-md relative overflow-hidden uk-transition-toggle shadow-sm">
                  <a href="#story-modal" uk-toggle>
                    <img
                      src={`https://source.unsplash.com/random/?product,review,1`}
                      alt=""
                      className="w-full h-full absolute object-cover inset-0"
                    />
                  </a>
                  <div className="absolut absolute bottom-0 flex items-center justify-between px-4 py-3 space-x-2 text-white w-full custom-overly1">
                    <Link to="#">Johnson </Link>
                    <div className="flex space-x-3">
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="heart"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="heart"
                        />
                        150
                      </Link>
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="chatbubble-ellipses"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="chatbubble ellipses"
                        />
                        30
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 lg:row-span-2">
                <div className="bg-pink-400 h-full max-w-full overflow-hidden relative rounded-md uk-transition-toggle shadow-sm">
                  <a href="#story-modal" uk-toggle>
                    <img
                      src={`https://source.unsplash.com/random/?tech,review,1`}
                      alt=""
                      className="w-full h-full absolute object-cover inset-0 transform scale-125"
                    />
                  </a>
                  <div className="absolut absolute bottom-0 p-6 space-y-2 text-white w-full custom-overly1 uk-light lg:block hidden">
                    <div className="flex flex-1 items-center space-x-2">
                      <Link to="#" className="flex items-center">
                        <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-1 rounded-full transform -rotate-2 hover:rotate-3 transition hover:scale-105 m-0.5 mr-2">
                          <img
                            src={`https://source.unsplash.com/random/?food,review,1`}
                            alt=""
                            className="bg-gray-200 border border-white rounded-full w-8"
                          />
                        </div>
                        Monroe Parker
                      </Link>
                      <div className="flex space-x-3">
                        <Link to="#" className="flex items-center">
                          <ion-icon
                            name="heart"
                            className="mr-1 md hydrated"
                            role="img"
                            aria-label="heart"
                          />
                          150
                        </Link>
                        <Link to="#" className="flex items-center">
                          <ion-icon
                            name="chatbubble-ellipses"
                            className="mr-1 md hydrated"
                            role="img"
                            aria-label="chatbubble ellipses"
                          ></ion-icon>
                          30
                        </Link>
                      </div>
                    </div>
                    <h1 className="font-bold text-3xl">
                      Sản phẩm tuyệt vời, mình rất thích
                    </h1>
                    <p>
                      Đánh giá chi tiết sản phẩm, mình rất thích sản phẩm này, mình
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-green-400 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle shadow-sm">
                  <a href="#story-modal" uk-toggle>
                    <img
                      src={`https://source.unsplash.com/random/?pepeo,review,1`}
                      alt=""
                      className="w-full h-full absolute object-cover inset-0"
                    />
                  </a>
                  <div className="absolut absolute bottom-0 flex items-center justify-between px-4 py-3 space-x-2 text-white w-full custom-overly1">
                    <Link to="#">James</Link>
                    <div className="flex space-x-3">
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="heart"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="heart"
                        />
                        150
                      </Link>
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="chatbubble-ellipses"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="chatbubble ellipses"
                        />
                        30
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-yellow-400 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden shadow-sm">
                  <a href="#story-modal" uk-toggle>
                    <img
                      src={`https://source.unsplash.com/random/?social,review,1`}
                      alt=""
                      className="w-full h-full absolute object-cover inset-0 object-cover object-left"
                    />
                  </a>
                  <div className="absolut absolute bottom-0 flex items-center justify-between px-4 py-3 space-x-2 text-white w-full custom-overly1">
                    <Link to="#">Martin</Link>
                    <div className="flex space-x-3">
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="heart"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="heart"
                        />
                        150
                      </Link>
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="chatbubble-ellipses"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="chatbubble ellipses"
                        />
                        30
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-purple-400 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden shadow-sm">
                  <a href="#story-modal" uk-toggle>
                    <img
                      src={`https://source.unsplash.com/random/?product,review,1`}
                      alt=""
                      className="w-full h-full absolute object-cover inset-0"
                    />
                  </a>
                  <div className="absolut absolute bottom-0 flex items-center justify-between px-4 py-3 space-x-2 text-white w-full custom-overly1">
                    <Link to="#">Johnson </Link>
                    <div className="flex space-x-3">
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="heart"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="heart"
                        />
                        150
                      </Link>
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="chatbubble-ellipses"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="chatbubble ellipses"
                        />
                        30
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-blue-400 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden shadow-sm">
                  <a href="#story-modal" uk-toggle>
                    <img
                      src={`https://firebasestorage.googleapis.com/v0/b/bakery-9a92d.appspot.com/o/images%2F6.jpg?alt=media&token=0fafc071-7da0-4559-9dd1-268375c30011`}
                      alt=""
                      className="w-full h-full absolute object-cover inset-0"
                    />
                  </a>
                  <div className="absolut absolute bottom-0 flex items-center justify-between px-4 py-3 space-x-2 text-white w-full custom-overly1">
                    <Link to="#">Jesse</Link>
                    <div className="flex space-x-3">
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="heart"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="heart"
                        />
                        150
                      </Link>
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="chatbubble-ellipses"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="chatbubble ellipses"
                        />
                        30
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-green-400 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden shadow-sm">
                  <a href="#story-modal" uk-toggle>
                    <img
                      src={`https://source.unsplash.com/random/?music,review,1`}
                      alt=""
                      className="w-full h-full absolute object-cover inset-0"
                    />
                  </a>
                  <div className="absolut absolute bottom-0 flex items-center justify-between px-4 py-3 space-x-2 text-white w-full custom-overly1">
                    <Link to="#">Johnson </Link>
                    <div className="flex space-x-3">
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="heart"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="heart"
                        />
                        150
                      </Link>
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="chatbubble-ellipses"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="chatbubble ellipses"
                        />
                        30
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-red-400 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden shadow-sm">
                  <a href="#story-modal" uk-toggle>
                    <img
                      src={`https://source.unsplash.com/random/?review,1`}
                      alt=""
                      className="w-full h-full absolute object-cover inset-0"
                    />
                  </a>
                  <div className="absolut absolute bottom-0 flex items-center justify-between px-4 py-3 space-x-2 text-white w-full custom-overly1">
                    <Link to="#">James</Link>
                    <div className="flex space-x-3">
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="heart"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="heart"
                        />
                        150
                      </Link>
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="chatbubble-ellipses"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="chatbubble ellipses"
                        />
                        30
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-yellow-400 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden shadow-sm">
                  <a href="#story-modal" uk-toggle>
                    <img
                      src={`https://source.unsplash.com/random/?website,review,1`}
                      alt=""
                      className="w-full h-full absolute object-cover inset-0"
                    />
                  </a>
                  <div className="absolut absolute bottom-0 flex items-center justify-between px-4 py-3 space-x-2 text-white w-full custom-overly1">
                    <Link to="#">Monroe</Link>
                    <div className="flex space-x-3">
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="heart"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="heart"
                        />
                        150
                      </Link>
                      <Link to="#" className="flex items-center">
                        <ion-icon
                          name="chatbubble-ellipses"
                          className="mr-1 md hydrated"
                          role="img"
                          aria-label="chatbubble ellipses"
                        />
                        30
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Popular;
