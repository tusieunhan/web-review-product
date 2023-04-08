import { useEffect, useState } from "react"
import { listAll } from "../post/apiPost";
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Trending() {


    const [dataList, setDataList] = useState([])
    useEffect(async () => {
        const res = await listAll()

        console.log(res);

        setDataList(res)
    }, [])
    return (
        <div className="p-10">
            <h1 className="font-extrabold leading-none mb-6 mt-8 lg:text-2xl text-lg text-gray-900 tracking-tight"> Trending </h1>

            <div className="w-full relative object-cover bg-pink-500 h-[400px] rounded-md mb-[60px] overflow-hidden">
                <img src='https://firebasestorage.googleapis.com/v0/b/bakery-9a92d.appspot.com/o/images%2Fcac-hang-ban-phim-co-tot-va-pho-bien-nhat-hien-nay-3.jpeg9f4a447b-e58c-4709-998d-d25d9ac7eed2?alt=media&token=a9dd3a49-58fa-4ce0-a662-61cd5f4221df' className="w-full bject-cover inset-0" />
                <div className="absolute z-2 inset-0 flex justify-center text-center px-10 bg-gray-900/60">
                    <div>
                        <h1 className="text-4xl text-white font-bold mt-28 mb-6">Top những sản phẩm tốt nhất thị trường</h1>
                        <p className="text-white px-10 ">Chào mừng đến với trang web đánh giá, nơi cung cấp cho bạn những đánh giá chân thực và đầy đủ về các sản phẩm và dịch vụ khác nhau. Chúng tôi cam kết cung cấp cho bạn những thông tin chính xác và đáng tin cậy để giúp bạn đưa ra quyết định tốt nhất khi mua </p>
                    </div>
                </div>
            </div>
            <div className="mt-6 grid lg:grid-cols-3 grid-cols-2 gap-3 hover:text-yellow-700 uk-link-reset">

                {dataList && dataList.map((item, index) => {
                    return (
                        <div key={index}>
                            <div
                                className="bg-blue-400 max-w-full lg:h-56  h-48 rounded-lg relative overflow-hidden shadow uk-transition-toggle">
                                <Link to={`/post/${item._id}`}>
                                    <img src={item?.image} className="w-full h-full absolute object-cover inset-0" />
                                </Link>
                                <div
                                    className="flex flex-1 items-center absolute bottom-0 w-full p-3 text-white custom-overly1">
                                    <Link to={`/post/${item._id}`} className="lg:flex flex-1 items-center ">
                                        <div className="bg-gradient-to-tr from-yellow-600 to-pink-600 p-1 rounded-full transform -rotate-2 hover:rotate-3 transition hover:scale-105 m-0.5 mr-2">
                                            <img src={item?.avatar}
                                                className="bg-gray-200 border border-white rounded-full w-10 h-10" />
                                        </div>
                                        <div className="flex-1 line-clamp-2"> {item?.title} </div>
                                    </Link>
                                    <div className="flex space-x-2 flex-1 lg:flex-initial justify-around">
                                        <a href="#"> <i className="uil-heart"></i> 150 </a>
                                        <a href="#"> <i className="uil-heart"></i> 30 </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}