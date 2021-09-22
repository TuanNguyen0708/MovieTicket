import { QLNguoiDung } from "../../service/QuanLyNguoiDung"
import { DANG_KY, DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from '../actions/types/QuanLyNguoiDungType'
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
                history.push('/home')
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



export const dangKyAction = (thongTinDangKy) => {
    return async(dispatch) => {
        try {
            const result = await QLNguoiDung.dangKy(thongTinDangKy)
            console.log('result',result.data.content)

            if(result.data.statusCode === 200) {
                dispatch({
                    type:DANG_KY,
                    thongTinDangKy: result.data.content
                });
                alert('Đăng Ký Thành Công')
                //Chuyển hướng tới trang đăng nhập
                history.push('/login')
            }
        }catch(errors){
            console.log(errors.response.data,'errors')
        }
    }
    
}