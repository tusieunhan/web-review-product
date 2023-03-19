import React, { Component } from "react";
import { Link } from "react-router-dom";

class PostByUser extends Component {
  render() {
    const { posts } = this.props;
    return (
      <>
        <div class="flex items-center justify-between mt-8 space-x-3">
          <h1 class="flex-1 font-extrabold leading-none lg:text-2xl text-lg text-gray-900 tracking-tight uk-heading-line">
            <span>Bài viết của người dùng </span>
          </h1>

        </div>
        <div className="my-6 grid lg:grid-cols-4 grid-cols-2 gap-6 hover:text-yellow-700 uk-link-reset">
          {posts?.length > 0
            ? posts?.map((post, i) => (
              <Link to={`/post/${post._id}`} key={i}>
                <div
                  className="max-w-full radio w-full h-full rounded-md relative overflow-hidden uk-transition-toggle"
                  tabIndex={0}
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt=""
                      onError={(i) =>
                        (i.target.src = `https://source.unsplash.com/random/?bakery,bake,${post.postBody}`)
                      }
                      className="w-full h-full absolute object-cover inset-0"
                    />
                  )}

                  <div className="absolute bg-black bg-opacity-40 bottom-0 flex h-full items-center justify-center space-x-5 text-lg text-white uk-transition-scale-up w-full">
                    1 {/* {post.likes.length} */}
                    <ion-icon
                      name="heart"
                      className="mr-1 md hydrated"
                      role="img"
                      aria-label="heart"
                    />
                    <ion-icon
                      name="chatbubble-ellipses"
                      className="mr-1 md hydrated"
                      role="img"
                      aria-label="chatbubble ellipses"
                    />
                  </div>
                </div>
              </Link>
            ))
            : "not found"}
        </div>
      </>
    );
  }
}

export default PostByUser;
