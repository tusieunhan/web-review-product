import { Link } from "react-router-dom";


export default function ItemUser({ arr }) {
    return (
        <div className="">
            <h1 className="text-pink-500 font-bold mb-4 text-2xl">Danh sách người dùng</h1>
            {arr &&
                arr?.map((user, i) => i < 5 && (
                    <div className="flex items-center justify-between py-3 rounded-sm " key={i}>
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
                            className="border border-gray-200 font-semibold px-4 py-1 rounded-full bg-pink-600 text-white "
                        >
                            Xem
                        </Link>
                        <div
                            className="border ml-4 hover:border-pink-300 border-gray-200 font-semibold px-4 py-1 rounded-full text-red-600  cursor-pointer"
                        >
                            Xoá
                        </div>
                    </div>
                ))}



        </div>
    );
}