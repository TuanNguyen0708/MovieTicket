import { TOKEN, USE_LOGIN } from "../../util/settings/config";
import { DANG_KY, DANG_NHAP_ACTION, DANH_SACH_MA_LOAI_NGUOI_DUNG, DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType"



let user = {};
if(localStorage.getItem(USE_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USE_LOGIN))
}

const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    thongTinDangKy: {},
    danhSachNguoiDung: [],
    dsMaLoaiNguoiDung: {}
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
        case DANG_KY : {
            state.thongTinDangKy = action.thongTinDangKy
            return {...state}
        }
        case DANH_SACH_NGUOI_DUNG : {
            state.danhSachNguoiDung = action.danhSachNguoiDung
            return {...state}
        }
        case DANH_SACH_MA_LOAI_NGUOI_DUNG : {
            state.dsMaLoaiNguoiDung = action.dsMaLoaiNguoiDung
            return {...state}
        }

        
        default: return {...state}
    }
}