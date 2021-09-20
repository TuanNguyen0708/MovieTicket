import { baseService } from "./baseService";

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
    taoLichChieu = (thongTinLichChieu) => {
        return this.post(`api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu);
    }

}

export const QLDatVe = new QuanLyDatVeService()