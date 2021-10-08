import React, { useEffect, useState } from 'react'
import { Cascader, DatePicker, Space, Form, Input, Button, Checkbox, InputNumber, Select } from 'antd';
import { QLRapService } from '../../../service/QuanLyRapService';
import { useFormik } from 'formik'
import { QLDatVe } from '../../../service/QuanLyDatVeService';
import moment from 'moment';



export default function Showtime(props) {
    const formik =  useFormik({
        initialValues:{
            maPhim:props.match.params.id,
            ngayChieuGioChieu:'',
            maRap:'',
            giaVe:''
        },
        onSubmit : async (values) => {
            console.log('values',values);
            try {
                const result = await QLDatVe.taoLichChieu(values);

                alert(result.data.content);

            }catch(errors) {
                console.log('errors',errors.response?.data)
            }
        }
    })

    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: []
    })

    useEffect(async () => {
        try {
            let result = await QLRapService.layThongTinHeThongRap();
            setState({
                ...state,
                heThongRapChieu: result.data.content
            })
        } catch (errors) {
            console.log('errors',errors.response?.data)
        }
    }, [])

    const handleChangeHeThongRap = async (value) => {
        //Từ hệ thống rạp call API lấy thông tin rạp
        try {
            let result = await QLRapService.layThongTinCumRap(value);
            setState({
                ...state,
                cumRapChieu: result.data.content
            })
        } catch (errors) {
            console.log('errors',errors.response?.data)
        }
    }
    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap',value)
    }

    const onOk = (value) => {
        formik.setFieldValue('ngayChieuGioChieu',moment(value).format('DD/MM/YYYY hh:mm:ss'))
        console.log('value',moment(value).format('DD/MM/YY hh:mm:ss'))
    }
    const onChangeDate = (value) => {
        formik.setFieldValue('ngayChieuGioChieu',moment(value).format('DD/MM/YYYY hh:mm:ss'))
        console.log('value',moment(value).format('DD/MM/YY hh:mm:ss'))
    }
    const handleChangeInputNumber = (value) => {
        formik.setFieldValue('giaVe',value)
    }
    const renderHeThongRap = () => {
        return state.heThongRapChieu?.map((htrc, index) => {
            return { label: htrc.tenHeThongRap, value: htrc.tenHeThongRap }
        })
    }
    const renderCumRap = () => {
        return state.cumRapChieu?.map((crc, index) => {
            return { label: crc.tenCumRap, value: crc.maCumRap }
        })
    }
    return (
        <div className='container'>
            <Form
                onSubmitCapture={formik.handleSubmit}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}>
                <h3 style={{marginBottom:'40px'}}>Tạo Lịch Chiếu - {props.match.params.tenPhim}</h3>
                <Form.Item label="Hệ Thống Rạp">
                    <Cascader options={renderHeThongRap()} onChange={handleChangeHeThongRap} placeholder="Chọn Hệ Thống Rạp" />
                </Form.Item>

                <Form.Item label="Cụm Rạp">
                    <Select options={renderCumRap()} onChange={handleChangeCumRap} placeholder="Chọn Cụm Rạp" />
                </Form.Item>

                <Form.Item label="Ngày Chiếu Giờ Chiếu">
                    <DatePicker format='DD/MM/YYYY hh:mm:ss' showTime onChange={onChangeDate} onOk={onOk} />
                </Form.Item>

                <Form.Item label="Giá Vé">
                    <InputNumber onChange={handleChangeInputNumber} />
                </Form.Item>

                <Form.Item label="Chức Năng">
                    <Button htmlType='submit'>Tạo Lịch Chiếu</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
