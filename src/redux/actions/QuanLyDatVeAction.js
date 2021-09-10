import { QLDatVe } from "../../service/QuanLyDatVeService"
import { SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType"

export const LayChiTietPhongVeAction = (maLichChieu) => {
    return async dispatch => {
        try {
            const result = await QLDatVe.datVe(maLichChieu)
            
            console.log(result,'result')
            if(result.data.statusCode === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }

        }catch(errors) {
            console.log('errors',errors.response?.data)
        }
    }
}