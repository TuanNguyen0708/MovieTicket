import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayChiTietPhongVeAction, QuanLyDatVeAction } from '../../redux/actions/QuanLyDatVeAction'
import style from './Checkout.module.css'
import './Checkout.css'
import { DAT_VE } from '../../redux/actions/types/QuanLyDatVeType'
import _ from 'lodash'

export default function Checkout(props) {

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
            if(indexGheDD != -1) {
                classGheDaDat = 'gheDangDat'
            }

            if(userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheMinhDat = 'gheMinhDat'
            }



            return <Fragment key={index} >
                <button disabled={ghe.daDat}  className={`ghe ${classGheVip}  ${classGheDaDat} ${classGheDD} ${classGheMinhDat}`} onClick={()=> {
                    dispatch({
                        type: DAT_VE,
                        gheDuocChon: ghe
                    })
                }} >
                    {ghe.daDat === true ? <span className='font-bold'>X</span>  :  ghe.stt}
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
                    <div className='flex justify-center flex-col items-center ' style={{width:'80%', margin:'0 auto'}}>
                        <div className='bg-black' style={{ width: '80%', height: 10, display: 'block' }}>
                        </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className='mt-3'>Màn Hình</h3>
                        </div>
                        <div className='mt-5 text-center'>
                            {renderSeats()}
                        </div>
                    </div>
                </div>
                <div className='col-span-3'>
                    <h3 className='text-center text-3xl text-green-400'>{danhSachGheDangDat.reduce((thanhTien,ghe,index)=> {
                                    return thanhTien += ghe.giaVe 
                        },0).toLocaleString()} đ</h3>
                    <hr />
                    <h3 className='text-xs mt-3'>{thongTinPhim?.tenPhim}</h3>
                    <p>{thongTinPhim?.tenCumRap} </p>
                    <p>Ngày chiếu: {thongTinPhim?.ngayChieu} {thongTinPhim?.gioChieu} - {thongTinPhim?.tenRap} </p>
                    <hr />
                    <div className='flex flex-row my-4'>
                        <div className='w-4/5'>
                            <span className='text-red-400 text-lg'>Ghế: </span>
                            {_.sortBy(danhSachGheDangDat,['stt']).map((gheDD,index)=> {
                                return <span key={index} className='text-lg text-green-600'> {gheDD.stt}</span>
                            })}
                        </div>
                    </div>
                    <hr />
                    <div className='my-4 text-lg text-green-600'>Thành Tiền: {danhSachGheDangDat.reduce((thanhTien,ghe,index)=> {
                                    return thanhTien += ghe.giaVe 
                        },0).toLocaleString()} đ
                                
                           
                        </div>
                    <hr />
                    <div className='my-4'>
                        <i>Email</i> <br />
                        {userLogin.email}
                    </div>
                    <hr />
                    <div className='my-4'>
                        <i>Phone</i> <br />
                        {userLogin.soDT}
                    </div>
                    <hr />
                    <div >
                        <div className='bg-green-500 text-white w-full text-center py-3 font-bold text-xl cursor-pointer' onClick={()=> {
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
