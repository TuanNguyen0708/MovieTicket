import { SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../actions/types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";


const stateDefault = {
    arrPhim: [
        {
            "maPhim": 1283,
            "tenPhim": "Lat mat 48h123",
            "biDanh": "lat-mat-48h123",
            "trailer": "",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h123_gp01.jpg",
            "moTa": "",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2020-10-10T00:00:00",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": true
        },
        {
            "maPhim": 4668,
            "tenPhim": "Doraemon-3",
            "biDanh": "doraemon-3",
            "trailer": "doraemon-2",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/doraemon-_gp01.jpg",
            "moTa": "Ryan Reynolds sẽ thủ vai một chuyên gia bảo vệ, được đánh giá hạng AAA còn Samuel Jackson thì hóa thân nhân vật sát thủ bị săn lùng nhất thế giới. Hai người, như hai kẻ không đội trời chung, nhưng lại bị ép phải “bảo vệ” nhau trong suốt 24 giờ. Thật trớ trêu khi một sát thủ “khét tiếng” mà cũng có lúc cần đến vệ sĩ riêng. Và trên hành trình đồng hành từ Anh đến Hague, họ sẽ phải đối mặt và “xử lý” rất nhiều tình huống nguy hiểm hay sự truy đuổi của nhiều nhóm khác nhau.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2021-08-26T00:00:00",
            "danhGia": 10,
            "hot": false,
            "dangChieu": true,
            "sapChieu": false
          }
    ],
    dangChieu: true,
    sapChieu: true,
    arrPhimDefault: [],
    PhimDetail:{},

    ThongTinPhim: {}
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch(action.type){
        case SET_DANH_SACH_PHIM : {
           state.arrPhim = action.arrPhim;
           state.arrPhimDefault = state.arrPhim;
           return {...state}
        }
        case SET_PHIM_DANG_CHIEU: {
            state.dangChieu = !state.dangChieu;
            state.arrPhim = state.arrPhimDefault.filter(phim => phim.dangChieu === state.dangChieu);
            return {...state}
        }
        case SET_PHIM_SAP_CHIEU: {
            state.sapChieu = !state.sapChieu;
            state.arrPhim = state.arrPhimDefault.filter(phim => phim.sapChieu === state.sapChieu);
            return{...state}
        }
        case SET_CHI_TIET_PHIM:{
            state.PhimDetail = action.phimDetail;
            return {...state}
        }
        case SET_THONG_TIN_PHIM: {
            state.ThongTinPhim = action.thongTinPhim
            return {...state}
        }
        default: return {...state}
    }
}