import axios from "axios";
import { QL } from "../../service/QuanLyPhimService";

export const getCarouselAction = async (dispatch) => {
    try {
        const result = await QL.layDanhSachBanner()
        console.log(result)
        dispatch({
            type: 'SET_CAROUSEL',
            arrImg: result.data.content
        })
    } catch (errors) {
        console.log('errors', errors)
    }
}