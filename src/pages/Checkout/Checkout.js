import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datGheAction, LayChiTietPhongVeAction, QuanLyDatVeAction } from '../../redux/actions/QuanLyDatVeAction'
import style from './Checkout.module.css'
import './Checkout.css'
import { DAT_VE } from '../../redux/actions/types/QuanLyDatVeType'
import _ from 'lodash'
import { Button, Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction'
import moment from 'moment'

import { history } from '../../App'
import { TOKEN, USE_LOGIN } from '../../util/settings/config'
import { NavLink } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next';



function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer)

    const dispatch = useDispatch();

    //gọi API
    useEffect(() => {
        //Gọi hàm tạo ra 1 async function 
        const action = LayChiTietPhongVeAction(props.match.params.id);
        //Dispatch function này đi
        dispatch(action);

        // Có 1 client nào thực hiện việc đặt vé thành công mình sẽ load lại danh sách phòng vé của lịch chiếu đó
        // connection.on('datVeThanhCong', () =>  {
        //     dispatch(action);
        // })



        //Vừa vào trang load tất cả ghế của các người khác đang đặt
        //connection.invoke('loadDanhSachGhe',props.match.params.id);


        //Load danh sách ghế đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
        //connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
        //Bước 1: Loại mình ra khỏi danh sách 
        //dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
        //Bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung 

        // let arrGheKhachDat = dsGheKhachDat.reduce((result,item,index)=>{
        //     let arrGhe = JSON.parse(item.danhSachGhe);

        //     return [...result,...arrGhe];
        // },[])
        // arrGheKhachDat = _.uniqBy(arrGheKhachDat,'maGhe')
        // //Đưa dữ liệu ghế khách đặt về redux
        // dispatch({ 
        //     type: 'DAT_GHE',
        //     arrGheKhachDat
        // })
        // })
        //Cài đặt sự kiện khi reload trang
        //  window.addEventListener("beforeunload", clearGhe);

        //  return () => {
        //      clearGhe();
        //      window.removeEventListener('beforeunload',clearGhe);
        //  }


    }, [])
    // const clearGhe = function(event) {
    //     connection.invoke('huyDat',userLogin.taiKhoan,props.match.params.id)
    // }



    // console.log(chiTietPhongVe, 'chiTietPhongVe')

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
            //Kiểm tra từng render xem có phải ghế khách đặt hay không
            let classGheKhachDat = '';
            let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe)
            if (indexGheKD != -1) {
                classGheKhachDat = 'gheKhachDangDat'
            }



            return <Fragment key={index} >
                <button disabled={ghe.daDat || classGheKhachDat != ''} className={`ghe ${classGheVip}  ${classGheDaDat} ${classGheDD} ${classGheMinhDat} ${classGheKhachDat}`} onClick={() => {
                    const action = datGheAction(ghe, props.match.params.id);
                    dispatch(action);
                }} >
                    {ghe.daDat === true ? <span className='font-bold'>X</span> : classGheKhachDat != '' ? <span className='font-bold'>O</span> : ghe.stt}
                </button>


                {/* 16 ghế tự động xuống hàng */}
                {(index + 1) % 16 === 0 ? <br /> : ''}

            </Fragment>
        })
    }

    const { t, i18n } = useTranslation();
    return (
        <div className='mt-5'>
            <div className='checkout grid grid-cols-12'>
                <div className='checkout_item col-span-9'>
                    <div className='checkout_number flex justify-center flex-col items-center ' style={{ width: '80%', margin: '0 auto' }}>
                        <div className='bg-black' style={{ width: '80%', height: 10, display: 'block' }}>
                        </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className='mt-3'>Màn Hình</h3>
                        </div>
                        <div className='checkout_seat mt-5 text-center'>
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
                                    <th>Ghế Khách Đặt</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><button className='ghe'>X</button></td>
                                    <td><button className='ghe gheDaDat'>X</button></td>
                                    <td><button className='ghe gheDangDat'>X</button></td>
                                    <td><button className='ghe gheVip'>X</button></td>
                                    <td><button className='ghe gheMinhDat'>X</button></td>
                                    <td><button className='ghe gheKhachDangDat'>X</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='checkout_pay col-span-3'>
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

                            dispatch(QuanLyDatVeAction(thongTinDatVe))
                        }} >
                            {t('book ticket')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




const { TabPane } = Tabs;

function callback(key) {
}

export default function CheckoutTab(props) {

    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)
    const dispatch = useDispatch();

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    useEffect(() => {
        return () => {
            dispatch({
                type: 'CHANGE_TAB_ACTIVE',
                number: '1'
            })
        }
    }, [])

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment> <button onClick={() => {
            history.push('/profile')
        }}><span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 50, height: 50, margin: '0 auto' }} className='rounded-full bg-red-200 border-2'>{userLogin.taiKhoan.substr(0, 1)}</span>Hello ! {userLogin.taiKhoan} </button> <button className='text-blue-800' onClick={() => {
            localStorage.removeItem(USE_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/home');
            window.location.reload();
        }}>Đăng Xuất</button> </Fragment> : ''}
    </Fragment>



    return <div className='p-5'>
        <Tabs tabBarExtraContent={operations} defaultActiveKey='1' activeKey={tabActive} onChange={(key) => {
            dispatch({
                type: 'CHANGE_TAB_ACTIVE',
                number: key
            })
        }}>
            <TabPane tab="CHỌN GHẾ" key="1">
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="KẾT QUẢ" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
            <TabPane tab={<NavLink className='text-2xl' style={{ marginLeft: '100px' }} to='/'><HomeOutlined /></NavLink>} key='3'>

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
    const renderTicketItem = function () {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            return <div className="p-4 lg:w-1/2" key={index}>
                <div className="h-full flex sm:flex-row flex-col sm:justify-start justify-center sm:text-left">
                    <div style={{ backgroundImage: `url(${ticket.hinhAnh})`, backgroundPosition: 'center', backgroundSize: 'cover', width: '250px', height: '250px', backgroundRepeat: 'no-repeat' }}>
                    </div>
                    <div className="flex-grow sm:pl-8">
                        <h1 className="title-font font-medium text-2xl text-gray-900">{ticket.tenPhim}</h1>
                        <h2 className="text-gray-500 mb-3">Ngày Chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - {moment(ticket.ngayDat).format('DD/MM/YYYY')}</h2>
                        <h2 className="text-gray-500 mb-3">{_.first(ticket.danhSachGhe).tenCumRap} - Ghế: {ticket.danhSachGhe?.map((ghe, index) => {
                            return <span key={index}>
                                [{ghe.tenGhe}]

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