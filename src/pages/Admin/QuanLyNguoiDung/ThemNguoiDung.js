import React, { useEffect } from 'react'
import { useState } from 'react';
import {
    Form,
    Input,
    Radio,
} from 'antd';
import { useFormik } from 'formik';
import { GROUPID } from '../../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { layDanhSacMaLoaihNguoiDungAction, themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';




const { Option } = Select;

const ThemNguoiDung = () => {
    const [componentSize, setComponentSize] = useState('default');
    const dispatch = useDispatch()
    // const {dsMaLoaiNguoiDung} = useSelector(state=>state.QuanLyNguoiDungReducer)
    // useEffect(() => {
    //     dispatch(layDanhSacMaLoaihNguoiDungAction());
    // }, [])
    const handleChangeLoaiNguoiDung = (value) => {
        
       formik.setFieldValue('maLoaiNguoiDung',value)
    }
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maLoaiNguoiDung: '',
            hoTen: '',
        },
        onSubmit: values => {
            values.maNhom = GROUPID;
            //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
            let formData = values;
            //gọi API gởi các giá trị formData về backend 
            dispatch(themNguoiDungAction(formData))

        }
    })

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    return (
        <>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 5,
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
                <h1 className='mb-5'>Thêm Người Dùng Mới</h1>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Tài Khoản">
                    <Input name='taiKhoan' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mật Khẩu">
                    <Input name='matKhau'  onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Email">
                    <Input name='email'  onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Họ Tên">
                    <Input name='hoTen'  onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Số Điện Thoại">
                    <Input name='soDt'  onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Loại Người Dùng">
                    <Select name='maLoaiNguoiDung' onChange={handleChangeLoaiNguoiDung} style={{ width: 120 }} >
                        <Option  value="KhachHang">Khách Hàng</Option>
                        <Option value="QuanTri">Quản Trị</Option>
                    </Select>
                </Form.Item>
                <div className='text-center m-10'>
                    <button className='ant-btn ant-btn-primary mr-4' type='submit'>Thêm Người Dùng</button>
                    <button className='ant-btn ant-btn-danger' type='submit'>Lưu Thay Đổi</button>
                </div>
            </Form>
        </>
    )
}
export default ThemNguoiDung