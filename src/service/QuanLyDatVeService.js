import { baseService } from "./baseService";
import {GROUPID} from "../util/settings/config"

export class QuanLyDatVeService extends baseService{
    constructor () {
        super();
    }

    datVe = (maLichChieu) => { // mã lịch chiếu lấy từ url 
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }
    quanLyDatVe = (thongTinDatVe) => { 
        return this.post(`api/QuanLyDatVe/DatVe`, thongTinDatVe);
    }

}

export const QLDatVe = new QuanLyDatVeService()