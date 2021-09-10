import { baseService } from "./baseService";
import {GROUPID} from "../util/settings/config"

export class QuanLyNguoiDung extends baseService{
    constructor () {
        super();
    }

    dangNhap = (thongTinDangNhap) => { //{taiKhoan: '', matKhau: ''}
        return this.post(`api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
    }

}

export const QLNguoiDung = new QuanLyNguoiDung()