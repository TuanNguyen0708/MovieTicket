import { QLNguoiDung } from "../../service/QuanLyNguoiDung"
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from '../actions/types/QuanLyNguoiDungType'
import { history } from "../../App"

export const dangNhapAction = (thongTinDangNhap) => {



    return async (dispatch) => {
        try {
            const result = await QLNguoiDung.dangNhap(thongTinDangNhap)

            if(result.data.statusCode === 200) {
                dispatch({
                    type:DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                //chuyển hướng đăng nhập về trang trước đó
                history.goBack()
            }

            
        }catch (errors) {
            console.log(errors.response.data,'errors')
        }
    }
}




export const layThongTinNguoiDungAction = (thongTinDangNhap) => {



    return async (dispatch) => {
        try {
            const result = await QLNguoiDung.layThongTinNguoiDung()

            if(result.data.statusCode === 200) {
                dispatch({
                    type:SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            }
            
            
        }catch (errors) {
            console.log(errors.response.data,'errors')
        }
    }
}