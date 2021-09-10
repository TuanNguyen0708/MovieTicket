import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction'
import style from './Checkout.module.css'

export default function Checkout(props) {

    const {userLogin} = useSelector(state=>state.QuanLyNguoiDungReducer)
    const {chiTietPhongVe} = useSelector(state=>state.QuanLyDatVeReducer)

    const dispatch = useDispatch()

    //gọi API
    useEffect(()=> {
        //gọi hàm tạo ra 1 asyn function
        const action = LayChiTietPhongVeAction(props.match.params.id)
        //Dispatch function này đi
        dispatch(action)
    },[])
    console.log(chiTietPhongVe,'chiTietPhongVe')
    return (
        <div className='mt-2'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9'>
                
                    <div className='flex justify-center flex-col mt-4 items-center'>
                    <div className='bg-black' style={{width:'80%', height:10, display:'block'}}>
                    </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className='mt-3'>Màn Hình</h3>
                        </div>
                    </div>
                </div>
                <div className='col-span-3'>
                    <h3 className='text-center text-xl text-green-400'>0 đ</h3>
                    <hr />
                    <h3 className='text-xs mt-3'>Lật Mặt 48h</h3>
                    <p>Địa điểm: BHD Star - Vincom 3/2</p>
                    <p>Ngày chiếu: 25/04/2021 - 12:05 RẠP 5</p>
                    <hr />
                    <div className='flex flex-row my-4'>
                        <div className='w-4/5'>
                            <span className='text-red-400 text-lg'>Ghế</span>
                        </div>
                        <div className='text-right col-span-1'>
                            <span className='text-green-400 text-lg'>0 đ</span>
                        </div>

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
                    <div className='flex flex-col justify-end h-full items-center'>
                        <div className='bg-green-500 text-white w-full text-center py-3 font-bold text-xl'>
                            ĐẶT VÉ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
