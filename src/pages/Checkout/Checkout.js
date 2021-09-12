import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayChiTietPhongVeAction, QuanLyDatVeAction } from '../../redux/actions/QuanLyDatVeAction'
import style from './Checkout.module.css'
import './Checkout.css'
import { DAT_VE } from '../../redux/actions/types/QuanLyDatVeType'
import _ from 'lodash'
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction'
import moment from 'moment'

function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer)

    const dispatch = useDispatch();

    //gọi API
    useEffect(() => {
        //gọi hàm tạo ra 1 asyn function
        const action = LayChiTietPhongVeAction(props.match.params.id)
        //Dispatch function này đi
        dispatch(action)
    }, [])
    console.log(chiTietPhongVe, 'chiTietPhongVe')

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    const renderSeats = () => {
        return danhSachGhe?.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let classGheDD = '';
            let classGheMinhDat = '';
            //kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không?

            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            if (indexGheDD != -1) {
                classGheDaDat = 'gheDangDat'
            }

            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheMinhDat = 'gheMinhDat'
            }



            return <Fragment key={index} >
                <button disabled={ghe.daDat} className={`ghe ${classGheVip}  ${classGheDaDat} ${classGheDD} ${classGheMinhDat}`} onClick={() => {
                    dispatch({
                        type: DAT_VE,
                        gheDuocChon: ghe
                    })
                }} >
                    {ghe.daDat === true ? <span className='font-bold'>X</span> : ghe.stt}
                </button>


                {/* 16 ghế tự động xuống hàng */}
                {(index + 1) % 16 === 0 ? <br /> : ''}

            </Fragment>
        })
    }

    return (
        <div className='mt-5'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9'>
                    <div className='flex justify-center flex-col items-center ' style={{ width: '80%', margin: '0 auto' }}>
                        <div className='bg-black' style={{ width: '80%', height: 10, display: 'block' }}>
                        </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className='mt-3'>Màn Hình</h3>
                        </div>
                        <div className='mt-5 text-center'>
                            {renderSeats()}
                        </div>
                    </div>
                    <div className='mt-5 flex justify-center'>
                        <table className='table' style={{ border: 'none', width: "80%" }}>
                            <thead>
                                <tr>
                                    <th>Ghế Chưa Đặt</th>
                                    <th>Ghế Đã Đặt</th>
                                    <th>Ghế Đang Đặt</th>
                                    <th>Ghế Víp</th>
                                    <th>Ghế Mình Đặt</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><button className='ghe'>X</button></td>
                                    <td><button className='ghe gheDaDat'>X</button></td>
                                    <td><button className='ghe gheDangDat'>X</button></td>
                                    <td><button className='ghe gheVip'>X</button></td>
                                    <td><button className='ghe gheMinhDat'>X</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-span-3'>
                    <h3 className='text-center text-3xl text-green-400'>{danhSachGheDangDat.reduce((thanhTien, ghe, index) => {
                        return thanhTien += ghe.giaVe
                    }, 0).toLocaleString()} đ</h3>
                    <hr />
                    <h3 className='text-lg mt-3'>{thongTinPhim?.tenPhim}</h3>
                    <p>{thongTinPhim?.tenCumRap} </p>
                    <p><span className='font-bold text-green-600'>Ngày chiếu: </span> {thongTinPhim?.ngayChieu} {thongTinPhim?.gioChieu} - {thongTinPhim?.tenRap} </p>
                    <hr />
                    <div className='flex flex-row my-4'>
                        <div className='w-4/5'>
                            <span className='text-green-600 text-lg font-bold'>Ghế: </span>
                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return <span key={index} className='text-lg text-green-600'> {gheDD.stt}</span>
                            })}
                        </div>
                    </div>
                    <hr />
                    <div className='my-4 text-lg text-green-600'><span className='font-bold'>Thành Tiền: </span>{danhSachGheDangDat.reduce((thanhTien, ghe, index) => {
                        return thanhTien += ghe.giaVe
                    }, 0).toLocaleString()} đ


                    </div>
                    <hr />
                    <div className='my-4'>
                        <i className='font-bold text-green-600'>Email</i> <br />
                        {userLogin.email}
                    </div>
                    <hr />
                    <div className='my-4'>
                        <i className='font-bold text-green-600'>Phone</i> <br />
                        {userLogin.soDT}
                    </div>
                    <hr />
                    <div >
                        <div className='bg-green-500 text-white w-full text-center py-3 font-bold text-xl cursor-pointer' onClick={() => {
                            const thongTinDatVe = {};
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;

                            console.log(thongTinDatVe);
                            dispatch(QuanLyDatVeAction(thongTinDatVe))
                        }} >
                            ĐẶT VÉ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

export default function (props) {
    return <div className='p-5'>
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="01 CHỌN GHẾ VÀ THANH TOÁN" key="1">
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>
    </div>
};

function KetQuaDatVe(props) {
    const dispatch = useDispatch()
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action)
    }, []);
    console.log(thongTinNguoiDung, 'ttnd')
    const renderTicketItem = function () {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            return <div className="p-4 lg:w-1/2" key={index}>
                <div className="h-full flex sm:flex-row flex-col sm:justify-start justify-center sm:text-left">
                    <div style={{backgroundImage:`url(${ticket.hinhAnh})`, backgroundPosition:'center',backgroundSize:'cover', width:250, height:250, backgroundRepeat:'no-repeat'}}>
                    </div>
                    <div className="flex-grow sm:pl-8">
                        <h1 className="title-font font-medium text-2xl text-gray-900">{ticket.tenPhim}</h1>
                        <h2 className="text-gray-500 mb-3">Ngày Chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - {moment(ticket.ngayDat).format('DD/MM/YYYY')}</h2>
                        <h2 className="text-gray-500 mb-3">{_.first(ticket.danhSachGhe).tenCumRap} - Ghế: {ticket.danhSachGhe?.map((ghe,index)=> {
                            return <span key={index}>
                               {ghe.tenGhe}
                               
                            </span>
                        })}</h2>
                        <p className="mb-4">Địa Điểm: {_.first(ticket.danhSachGhe).tenHeThongRap}</p>
                    </div>
                </div>
            </div>

        })
    }

    return <section className="text-gray-600 body-font">
        <div className="container py-10 mx-auto">
                <h1 className="text-2xl text-center font-medium title-font mb-4 text-gray-900 tracking-widest">LỊCH SỬ ĐẶT VÉ</h1>
            <div className="flex flex-wrap -m-4">
            {renderTicketItem()}
            </div>
        </div>
    </section>

}