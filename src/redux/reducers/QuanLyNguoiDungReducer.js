import { TOKEN, USE_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType"



let user = {};
if(localStorage.getItem(USE_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USE_LOGIN))
}

const stateDefault = {
    userLogin: user,

    thongTinNguoiDung: {}
}

export const QuanLyNguoiDungReducer = (state = stateDefault,action)=> {

    switch (action.type) {
        case DANG_NHAP_ACTION: {
            const {thongTinDangNhap} = action;
            localStorage.setItem(USE_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN,thongTinDangNhap.accessToken)

            return {...state,userLogin:thongTinDangNhap}
        }
        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return {...state}
        }
        

        default: return {...state}
    }
}