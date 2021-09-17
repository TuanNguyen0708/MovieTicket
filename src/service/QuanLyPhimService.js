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
}

export const QL = new QuanLyPhimService()