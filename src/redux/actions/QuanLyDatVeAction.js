import { connection } from "../../index"
import { QLDatVe } from "../../service/QuanLyDatVeService"
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction"
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType"

export const LayChiTietPhongVeAction = (maLichChieu) => {
    return async dispatch => {
        try {
            const result = await QLDatVe.datVe(maLichChieu)
            
            if(result.data.statusCode === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }

        }catch(errors) {
            console.log('errors',errors.response?.data)
        }
    }
}

export const QuanLyDatVeAction = (thongTinDatVe) => {
    return async (dispatch,getState) => {
        try {
            dispatch(displayLoadingAction)
            const result = await QLDatVe.quanLyDatVe(thongTinDatVe)
            console.log('result',result.data.content)
            //Đặt vé thành công gọi API load lại phòng vé
            await dispatch(LayChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch({
                type: DAT_VE_HOAN_TAT
            })
            await dispatch(hideLoadingAction)
            dispatch({type:CHUYEN_TAB});

            // let userLogin = getState().QuanLyNguoiDungReducer.userLogin
            // connection.invoke('datGheThanhCong',userLogin.taiKhoan)

        }catch(errors) {
            dispatch(hideLoadingAction)
            
            console.log('errors',errors.response?.data)
        }
    }
}
// no render nhieu qua anh, khong hieu sao no render lien tuc ;v
export const datGheAction = (ghe,maLichChieu) => {
    // const maLichChieu = Number(maLichChieu)
    return async (dispatch,getState) => {

        //Đưa thông tin ghế lên reducer
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        });

        //Call api về backend 
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

        console.log('maLichChieu',maLichChieu );
        //Biến mảng thành chuỗi
        taiKhoan = JSON.stringify(taiKhoan)
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
        console.log('danhSachGheDangDat',danhSachGheDangDat);
        console.log('taiKhoan',taiKhoan );



        //Call api signalR
        // connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu);




    }

}