import { QL } from '../../service/QuanLyPhimService'
import {SET_DANH_SACH_PHIM} from './types/QuanLyPhimType'


export const layDanhSachPhimAction = () => {

    return async (dispatch) => {
        try {
            const result = await QL.layDanhSachPhim()

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
                console.log('result',result.data.content)
            }
        catch(errors) {
                console.log('errors',errors.responst?.data)
            }
    }
}