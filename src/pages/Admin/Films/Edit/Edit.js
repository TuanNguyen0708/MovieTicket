import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { GROUPID } from '../../../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction, themPhimUpLoadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';
import { useEffect } from 'react';

const Edit = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch()
  const { ThongTinPhim } = useSelector(state=>state.QuanLyPhimReducer)

  useEffect(()=> {
    let {id} = props.match.params;
    dispatch(layThongTinPhimAction(id))
  },[])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: ThongTinPhim.maPhim,
      tenPhim: ThongTinPhim?.tenPhim,
      trailer: ThongTinPhim?.trailer,
      moTa: ThongTinPhim?.moTa,
      ngayKhoiChieu: ThongTinPhim?.ngayKhoiChieu,
      dangChieu: ThongTinPhim?.dangChieu,
      sapChieu: ThongTinPhim?.sapChieu,
      hot: ThongTinPhim?.hot,
      danhGia: ThongTinPhim?.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      values.maNhom = GROUPID;
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        } else {
            if(values.hinhAnh != null) {
              formData.append('File', values.hinhAnh, values.hinhAnh.name);
            }
        }
      }
      //Cập nhật phim + upload hình
      dispatch(capNhatPhimUploadAction(formData))
    }
  })


  const hangdleChangeDatePicker = (value) => {
    let ngayChieu = moment(value)
    formik.setFieldValue('ngayKhoiChieu', ngayChieu)
  }

  const handleChangeSwich = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handleChangeFile = async(e) => {
    //lấy file ra từ e
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
    // đem dữ liệu file lưu vào formik
    await formik.setFieldValue('hinhAnh', file);
    //Tạo đối tượng để đọc file
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload= (e) => {
      setImgSrc(e.target.result) // Hình base 64
    }
  }
}


  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  }

return (
  <>
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
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
      <h1 className='mb-5'>Chỉnh Sửa Phim</h1>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên Phim">
        <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
      </Form.Item>
      <Form.Item label="Mô Tả">
        <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
      </Form.Item>
      <Form.Item label="Ngày Khởi Chiếu">
        <DatePicker format={'DD/MM/YYYY'} onChange={hangdleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
      </Form.Item>
      <Form.Item label="Đang Chiếu">
        <Switch onChange={handleChangeSwich('dangChieu')} checked={formik.values.dangChieu} />
      </Form.Item>
      <Form.Item label="Sắp Chiếu">
        <Switch onChange={handleChangeSwich('sapChieu')} checked={formik.values.sapChieu} />
      </Form.Item>
      <Form.Item label="Hot">
        <Switch onChange={handleChangeSwich('hot')} checked={formik.values.hot} />
      </Form.Item>


      <Form.Item label="Đánh Giá">
        <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
      </Form.Item>

      <Form.Item label="Hình Ảnh">
        <Input type='file' onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png"  />
        <br />
        <img style={{ width: '100px', height: '100px' }} src={imgSrc === '' ? ThongTinPhim.hinhAnh : imgSrc} />
      </Form.Item>

      <Form.Item>
        <button className='ant-btn ant-btn-primary' type='submit'>Cập Nhật</button>
      </Form.Item>
    </Form>
  </>
);
};
export default Edit;