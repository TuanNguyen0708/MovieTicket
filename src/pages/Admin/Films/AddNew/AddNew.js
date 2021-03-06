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
import { useDispatch } from 'react-redux';
import { themPhimUpLoadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';

const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      values.maNhom = GROUPID;
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        } else {
            formData.append('File', values.hinhAnh, values.hinhAnh.name);
        }
      }
      //gọi API gởi các giá trị formData về backend 
      dispatch(themPhimUpLoadHinhAction(formData))
    }
  })


  const hangdleChangeDatePicker = (value) => {
    let ngayChieu = moment(value).format('DD/MM/YYYY')
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

  const handleChangeFile = (e) => {
    //lấy file ra từ e
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {

    //Tạo đối tượng để đọc file
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload= (e) => {
      setImgSrc(e.target.result) // Hình base 64
    }
      // đem dữ liệu file lưu vào formik
  formik.setFieldValue('hinhAnh', file);
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
      <h1 className='mb-5'>Thêm Phim Mới</h1>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên Phim">
        <Input name='tenPhim' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name='trailer' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô Tả">
        <Input name='moTa' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Ngày Khởi Chiếu">
        <DatePicker format={'DD/MM/YYYY'} onChange={hangdleChangeDatePicker} />
      </Form.Item>
      <Form.Item label="Đang Chiếu">
        <Switch onChange={handleChangeSwich('dangChieu')} />
      </Form.Item>
      <Form.Item label="Sắp Chiếu">
        <Switch onChange={handleChangeSwich('sapChieu')} />
      </Form.Item>
      <Form.Item label="Hot">
        <Switch onChange={handleChangeSwich('hot')} />
      </Form.Item>


      <Form.Item label="Đánh Giá">
        <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
      </Form.Item>

      <Form.Item label="Hình Ảnh">
        <Input type='file' onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png"  />
        <br />
        <img style={{ width: '100px', height: '100px' }} src={imgSrc} />
      </Form.Item>

      <div>
        <button style={{display:'block', margin:'0 auto'}} className='ant-btn ant-btn-primary' type='submit'>Thêm Phim</button>
      </div>
    </Form>
  </>
);
};
export default AddNew;