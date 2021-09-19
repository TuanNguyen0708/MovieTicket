import { QLRapService } from '../../service/QuanLyRapService'
import {SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU} from './types/QuanLyRapType'


export const layDanhSachHeThongRapAction = () => {
    return async dispatch => {
        try {
            const result = await QLRapService.layDanhSachRap();
            if(result.status === 200){
                dispatch({
                    type: SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: result.data.content
                })
            }
        }catch(errors) {
            console.log('errors',errors.response?.data)
        }
    }
}

export const layThongTinChiTietPhim = (id) => {

    return async dispatch => {
        try {
            const result = await QLRapService.layThongTinLichChieuPhim(id)
            //lấy được dữ liệu từ api về => đưa lên reducer
            dispatch({
                type: SET_CHI_TIET_PHIM,
                phimDetail: result.data.content
            })
        }
        catch(errors) {
            console.log('errors',errors.response.data)
        }
    }
}