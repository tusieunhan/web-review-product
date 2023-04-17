import mem1 from '../images/mem1.png';
import mem2 from '../images/mem2.png';

export default function Members() {
    return (
       <div className="p-12">
        <div className='text-center lg:text-2xl'>
            <h1 class="font-extrabold leading-none mb-6 mt-8  text-lg text-gray-900 tracking-tight "> Giới thiệu đề tài khóa luận </h1>
            <strong >XÂY DỰNG HỆ THỐNG ĐÁNH GIÁ SẢN PHẨM TRÊN NỀN TẢNG AWS</strong>
            <h1>ThS.Trương Bá Phúc</h1>
        </div>
           <div className='flex flex-nowrap border-b-4 '>
                <div className="px-10" >
                    <img className=" rounded-full " width={200} src={mem1} alt="member1" />
                </div>
                <div className="p-10">
                    <strong className=" text-2xl">Lê Văn Tú</strong>
                    <span className='block font-semibold '>MSSV: 19510921 </span>
                    <p className='pt-3'>Học tại: Trường Đại học Công Nghiệp Thành phố Hồ Chí Minh </p>
                    <p>Email: levantu.iuh@gmai.com</p>
                </div>     
            </div>

           <div className='flex flex-row-reverse pt-5'>
                <div className='px-14'>
                    <img className=" rounded-full " width="200" src={mem2} alt="member1" />
                </div>
                <div className="p-5 ">
                    <strong className=" text-2xl">Trần Thị Quỳnh Như</strong>
                    <span className='block font-semibold'>MSSV: 19446801</span>
                    <p className='pt-3'>Học tại: Trường Đại học Công Nghiệp Thành phố Hồ Chí Minh</p>
                    <p>Email: ntran18112001@gmail.com</p>
                </div>
           </div>

    </div>

    )
}
