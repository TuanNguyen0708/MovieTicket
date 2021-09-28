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
    capNhatThongTinCaNhan = (formData) => {
        return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,formData)
    }
    layDanhSachNguoiDung = (tuKhoa='') => {
        if(tuKhoa != '') {
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`)
        }
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }
    themNguoiDung = (formData) => {
        return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`,formData)
    }
    layDanhSachLoaiNguoiDung = () => {
        return this.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }
    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
    capNhatThongTinNguoiDung = (formData) => {
        return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,formData)
    }

}

export const QLNguoiDung = new QuanLyNguoiDung()