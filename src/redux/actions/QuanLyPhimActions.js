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