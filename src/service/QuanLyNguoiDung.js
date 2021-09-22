import { baseService } from "./baseService";
import {GROUPID} from "../util/settings/config"

export class QuanLyNguoiDung extends baseService{
    constructor () {
        super();
    }

    dangNhap = (thongTinDangNhap) => { //{taiKhoan: '', matKhau: ''}
        return this.post(`api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
    }
    layThongTinNguoiDung = () => {
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
    dangKy = (thongTinDangKy) => {
        return this.post(`api/QuanLyNguoiDung/DangKy`,thongTinDangKy)
    }

}

export const QLNguoiDung = new QuanLyNguoiDung()