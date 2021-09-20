import { QL } from '../../service/QuanLyPhimService'
import {SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM} from './types/QuanLyPhimType'
import { history } from '../../App'

export const layDanhSachPhimAction = (tenPhim='') => {

    return async (dispatch) => {
        try {
            const result = await QL.layDanhSachPhim(tenPhim)

            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrPhim: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    }
}

export const themPhimUpLoadHinhAction = (formData) => {
    return async (dispatch)=> {
        try {
            let result = await QL.themPhimUpLoadHinh(formData);
                alert('Thêm Phim Thành Công')
               
            }
        catch(errors) {
                console.log('errors',errors.responst?.data)
            }
    }
}
export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch)=> {
        try {
            let result = await QL.layThongTinPhim(maPhim);
                dispatch({
                    type: SET_THONG_TIN_PHIM,
                    thongTinPhim: result.data.content
                })
            }
        catch(errors) {
                console.log('errors',errors.responst?.data)
            }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch)=> {
        try {
            let result = await QL.capNhatPHimUpload(formData);
               alert('Cập nhật phim thành công')
               console.log('result',result.data.content)
               //sau khi cập nhật load lại danh sách phim mới
               dispatch(layDanhSachPhimAction())
               history.push('/admin/films')
            }
        catch(errors) {
                console.log('errors',errors.responst?.data)
            }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch)=> {
        try {
            let result = await QL.xoaPhim(maPhim);
               alert('Xóa Phim thành công')
               console.log('result',result.data.content)
               //sau khi xóa load lại danh sách phim mới
               dispatch(layDanhSachPhimAction())
            }
        catch(errors) {
                console.log('errors',errors.responst?.data)
            }
    }
}