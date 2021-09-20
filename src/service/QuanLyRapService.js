import { baseService } from "./baseService";
import {GROUPID} from "../util/settings/config"

export class QuanLyRapService extends baseService{
    constructor () {
        super();
    }

    layDanhSachRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }

    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    layThongTinHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
    }
    layThongTinCumRap = (maHeThongRap) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    }
}

export const QLRapService = new QuanLyRapService()