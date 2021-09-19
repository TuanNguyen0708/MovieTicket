import { baseService } from "./baseService";
import {GROUPID} from "../util/settings/config"

export class QuanLyPhimService extends baseService{
    constructor () {
        super();
    }

    layDanhSachBanner = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`)
    }

    layDanhSachPhim = () => {
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }
    themPhimUpLoadHinh = (formData) => {
        return this.post(`api/QuanLyPhim/ThemPhimUploadHinh`,formData)
    }
    layThongTinPhim = (maPhim) => {
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }
    capNhatPHimUpload = (formData) => {
        return this.post(`api/QuanLyPhim/CapNhatPhimUpload`, formData)
    }
    xoaPhim = (maPhim) => {
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const QL = new QuanLyPhimService()