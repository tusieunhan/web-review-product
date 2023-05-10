import { Link } from "react-router-dom";

export default function Post({ arr, report, delPostReport }) {


    return (
        <div className="">
            <h1 className="text-pink-500 font-bold mb-4 text-2xl">Danh sách người dùng</h1>
            {arr.map((user) => (
                <>
                    {report && (
                        <div className="flex items-center justify-between rounded-t-md" >
                            <button onClick={() => delPostReport(user._id)} className='p-1 bg-green-400 text-white flex justify-end w-full font-bold px-4'>Loại bỏ khỏi bài viết xấu</button>
                            <Link to={`/post/${user._id}`} className='p-1 bg-red-400 text-white flex justify-end w-full font-bold px-4'>Xem chi tiết bài viết / Xoá bài viết</Link>
                        </div>
                    )}
                    <Link to={`/post/${user._id}`} className='flex gap-4 h-[200px] mb-8 bg-gray-50 hover:shadow-md'>
                        <div className="group bg-red-transparent  lg:w-64 w-40 rounded-md relative overflow-hidden uk-transition-toggle">
                            <img
                                className="w-full h-full absolute object-cover inset-0 hover:scale-110 transform transition duration-500 ease-in-out"
                                src={`${user.image}`}
                                onError={(i) =>
                                    (i.target.src = `https://source.unsplash.com/random/?bakery,bake,${user.name}`)
                                }
                                alt={user.name}
                            />
                        </div>
                        <div className="flex-1  gap-4 mt-6">

                            <div className="  flex-1 card-body">
                                <h5 className="card-title mb-2 font-bold text-lg text">{user.title}</h5>
                                <div className="card-text text" style={{ lineHeight: "40px" }} dangerouslySetInnerHTML={{ __html: user.desc }}></div>
                            </div>
                            <div className="flex gap-2  mt-4  items-center">
                                <img className='w-8 h-8 rounded-full object-cover overflow-hidden' src={user.avatar} alt=""
                                    onError={(i) =>
                                        (i.target.src = `https://source.unsplash.com/random/?bakery,bake,${user.name}`)
                                    }
                                />
                                <p>Người dùng: <span className="font-bold text-pink-600">{user.username}</span></p>
                            </div>
                        </div>
                    </Link>
                </>

            ))}
        </div>
    );
}