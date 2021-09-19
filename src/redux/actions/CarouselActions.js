import axios from "axios";
import { QL } from "../../service/QuanLyPhimService";
import {SET_CAROUSEL} from './types/CarouselType'

export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
            const result = await QL.layDanhSachBanner()
            dispatch({
                type: SET_CAROUSEL,
                arrImg: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    }
}