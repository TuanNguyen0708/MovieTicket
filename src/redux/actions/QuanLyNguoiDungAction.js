import { QLNguoiDung } from "../../service/QuanLyNguoiDung"
import { DANG_NHAP_ACTION } from '../actions/types/QuanLyNguoiDungType'
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