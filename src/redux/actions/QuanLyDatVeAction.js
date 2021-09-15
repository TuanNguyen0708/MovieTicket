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
    return async dispatch => {
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
            dispatch({type:CHUYEN_TAB})

        }catch(errors) {
            dispatch(hideLoadingAction)
            
            console.log('errors',errors.response?.data)
        }
    }
}

export const datGheAction = (ghe,maLichChieu) => {


    return async (dispatch,getState) => {

        //Đưa thông tin ghế lên reducer
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        });

        //Call api về backend 
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

        console.log('taiKhoan',taiKhoan);
        console.log('maLichChieu',typeof(maLichChieu) );
        //Biến mảng thành chuỗi
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
        console.log('danhSachGheDangDat',danhSachGheDangDat);


        //Call api signalR
        connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu);




    }

}