import { QLNguoiDung } from "../../service/QuanLyNguoiDung"
import { DANG_KY, DANG_NHAP_ACTION, DANH_SACH_MA_LOAI_NGUOI_DUNG, DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG } from '../actions/types/QuanLyNguoiDungType'
import { history } from "../../App"

export const dangNhapAction = (thongTinDangNhap) => {

    return async (dispatch) => {
        try {
            const result = await QLNguoiDung.dangNhap(thongTinDangNhap)

            if(result.data.statusCode === 200) {
                dispatch({
                    type:DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                //chuyển hướng đăng nhập về trang trước đó
                history.push('/home')
            }

            
        }catch (errors) {
            console.log(errors.response.data,'errors')
        }
    }
}


export const layThongTinNguoiDungAction = (thongTinDangNhap) => {



    return async (dispatch) => {
        try {
            const result = await QLNguoiDung.layThongTinNguoiDung(thongTinDangNhap)
            console.log(result,'result')
            if(result.data.statusCode === 200) {
                dispatch({
                    type:SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            }
    
        }catch (errors) {
            console.log(errors.response.data,'errors')
        }
    }
}



export const dangKyAction = (thongTinDangKy) => {
    return async(dispatch) => {
        try {
            const result = await QLNguoiDung.dangKy(thongTinDangKy)
            console.log('result',result.data.content)

            if(result.data.statusCode === 200) {
                dispatch({
                    type:DANG_KY,
                    thongTinDangKy: result.data.content
                });
                alert('Đăng Ký Thành Công')
                //Chuyển hướng tới trang đăng nhập
                history.push('/login')
            }
        }catch(errors){
            console.log(errors.response.data,'errors')
        }
    }
    
}

export const capNhatThongTinAction = (formData) => {
    return async(dispatch) => {
        try {
            const result = await QLNguoiDung.capNhatThongTinCaNhan(formData)
            console.log('result',result.data.content)
            alert('Cập Nhật Thành Công')
        }catch(errors){
            console.log(errors.response.data,'errors')
        }
    }
    
}

export const layDanhSachNguoiDungAction = (tuKhoa='') => {

    return async (dispatch) => {
        try {
            const result = await QLNguoiDung.layDanhSachNguoiDung(tuKhoa)
            console.log(result,'result')
            dispatch({
                type: DANH_SACH_NGUOI_DUNG,
                danhSachNguoiDung: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    }
}

export const themNguoiDungAction = (formData) => {
    return async (dispatch)=> {
        try {
            let result = await QLNguoiDung.themNguoiDung(formData);
            console.log(result,'dd')
                alert('Thêm Người Dùng Thành Công')
               
            }
        catch(errors) {
                console.log('errors',errors.responst?.data)
            }
    }
}

export const layDanhSacMaLoaihNguoiDungAction = () => {

    return async (dispatch) => {
        try {
            const result = await QLNguoiDung.layDanhSachLoaiNguoiDung()
            console.log(result,'result')
            dispatch({
                type: DANH_SACH_MA_LOAI_NGUOI_DUNG,
                dsMaLoaiNguoiDung: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch)=> {
        try {
            let result = await QLNguoiDung.xoaNguoiDung(taiKhoan);
               alert('Xóa Người Dùng thành công')
               console.log('result',result.data.content)
               //sau khi xóa load lại danh sách phim mới
               dispatch(layDanhSachNguoiDungAction())
            }
        catch(errors) {
                console.log('errors',errors.responst?.data)
            }
    }
}

export const capNhatThongTinNguoiDungAction = (formData) => {
    return async(dispatch) => {
        try {
            const result = await QLNguoiDung.capNhatThongTinNguoiDung(formData)
            console.log('result',result.data.content)
            alert('Cập Nhật Thành Công')
        }catch(errors){
            console.log(errors.response.data,'errors')
        }
    }
    
}