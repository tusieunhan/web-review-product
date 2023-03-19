import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Load from "../components/load";
import './user.css'

function Users() {

  const url = window.location.href;
  const [text, setText] = useState(url.split("/")[4]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {

    console.log("text", text)
    const fetchData = async () => {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_URL}/posts/search/${text ? text : 'all'}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setData(result)
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    };
    fetchData();
  }, [text]);




  return (
    <div className="container pro-container m-auto">
      <h2 className="mt-5 mb-5">{text === 'all' ? "Các bài viết đề xuất cho bạn" : "Bài viết với từ khoá " + text + " cho bạn"}</h2>
      <div className="my-6 grid lg:grid-cols-3 grid-cols-2 gap-6">
        {!loading ? (
          data && data.length !== 0 ? (
            <>
              {data.map((user) => (
                <Link to={`/post/${user._id}`}>
                  <div className="group bg-red-transparent max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle">
                    <img
                      className="w-full h-full absolute object-cover inset-0 hover:scale-110 transform transition duration-500 ease-in-out"
                      src={`${user.image}`}
                      onError={(i) =>
                        (i.target.src = `https://source.unsplash.com/random/?bakery,bake,${user.name}`)
                      }
                      alt={user.name}
                    />
                  </div>
                  <div className="flex gap-4 mt-6">

                    <img className='w-10 h-10 rounded-full object-cover overflow-hidden' src={user.avatar} alt=""
                      onError={(i) =>
                        (i.target.src = `https://source.unsplash.com/random/?bakery,bake,${user.name}`)
                      }
                    />
                    <div className="  flex-1 card-body">
                      <h5 className="card-title mb-2 font-bold text-lg text">{user.title}</h5>
                      <div className="card-text text" style={{ lineHeight: "40px" }} dangerouslySetInnerHTML={{ __html: user.desc }}></div>
                    </div>

                  </div>
                </Link>
              ))}
            </>
          ) : (
            "NOT FOUND"
          )
        ) : (
          <div>
            <Load isSmall={true} />
          </div>
        )}
      </div>
    </div >
  );
}

export default Users;
