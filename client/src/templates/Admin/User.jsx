import { Link } from "react-router-dom";
import DeleteUser from "../../user/DeleteUser";

export default function ItemUser({ arr, handelUser, report, role, addRole }) {
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
                                    className={`border-yellow-200 border-2 rounded-full w-10 h-10    ${user.isAdmin ? 'border-green-500' : ''}`}
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

                        {report && (<button
                            onClick={() => handelUser(user._id)}
                            className="border cursor-pointer ml-4 hover:border-pink-300 border-gray-200 font-semibold rounded-full bg-green-600 text-white px-3 py-1  cursor-pointer"
                        >
                            Loại bỏ
                        </button>)}
                        {role && (<button
                            onClick={() => addRole(user._id)}
                            className={`border min-w-[150px] ${user.isAdmin ? '!bg-yellow-400' : ''} cursor-pointer ml-4 hover:border-pink-300 border-gray-200 font-semibold rounded-full bg-green-600 text-white px-3 py-1  cursor-pointer`}
                        >
                            {user.isAdmin ? 'Xoá quyền' : 'Cấp quyền'}
                        </button>)}
                        <div
                            className="border ml-4 hover:border-pink-300 border-gray-200 font-semibold rounded-full text-red-600  cursor-pointer"
                        >
                            <DeleteUser userId={user._id} />
                        </div>
                    </div>
                ))}



        </div>
    );
}