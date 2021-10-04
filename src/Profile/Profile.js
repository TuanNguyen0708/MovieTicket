import React, { useEffect, useState } from 'react'
import {
    Form,
    Input,
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinAction, layThongTinNguoiDungAction } from '../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../util/settings/config';

export default function Profile(props) {
    const [componentSize, setComponentSize] = useState('default');
    const {thongTinNguoiDung} = useSelector(state=>state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch()
    useEffect((thongTinNguoiDung)=> {
        dispatch(layThongTinNguoiDungAction(thongTinNguoiDung))
    },[])

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung?.taiKhoan,
            matKhau: thongTinNguoiDung?.matKhau,
            email: thongTinNguoiDung?.email,
            soDT: thongTinNguoiDung?.soDT,
            maNhom: thongTinNguoiDung?.maNhom,
            maLoaiNguoiDung: thongTinNguoiDung?.maLoaiNguoiDung,
            hoTen: thongTinNguoiDung?.hoTen

        },
        onSubmit: (values) => {
            values.maNhom = GROUPID;
            console.log(values)
            let formData = values
            
            dispatch(capNhatThongTinAction(formData))

        }
    })



    return (
        <Form style={{ paddingTop: 100, height:'100vh' }}

            onSubmitCapture={formik.handleSubmit}

            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 14,
            }}

            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
        >
            <h1 className='mb-5 text-center text-3xl'>Trang Cá Nhân</h1>

            <Form.Item label="Tài Khoản">
                <Input name='taiKhoan' disabled={true} onChange={formik.handleChange} value={formik.values.taiKhoan} />
            </Form.Item>
            <Form.Item label="Mật Khẩu">
                <Input name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} />
            </Form.Item>
            <Form.Item label="Họ Tên">
                <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
            </Form.Item>
            <Form.Item label="Email">
                <Input name='email' onChange={formik.handleChange} value={formik.values.email} />
            </Form.Item>
            <Form.Item label="Số Điện Thoại">
                <Input name='soDT' onChange={formik.handleChange} value={formik.values.soDT} />
            </Form.Item>
            <Form.Item label="Mã Loại Người Dùng">
                <Input name='loaiNguoiDung' disabled={true} onChange={formik.handleChange} value={formik.values.maLoaiNguoiDung} />
            </Form.Item>


            <div className='text-center m-10'>
                <button className='ant-btn ant-btn-primary'  type='submit'>Cập Nhật</button>
            </div>
        </Form>

    )
}
