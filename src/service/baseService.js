import Axios from "axios"
import { DOMAIN, TOKEN_CYBERSOFT } from "../util/settings/config"

export class baseService {
    //put json về phía backend
    put = (url,model) => {
        return  Axios({
            url:`${DOMAIN}/${url}`,
            method:'PUT',
            data:model,
            // headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //JWT
            headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT
            }
        }) 
    }

    post = (url,model) => {
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'POST',
            data:model,
            // headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //JWT
            headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT
            }
        }) 
    }


    get = (url) => {
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'GET',
            // headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
             headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT
            }
        })
    }

    delete = (url) => {
        return Axios({
            url:`${DOMAIN}/${url}`,
            method:'DELETE',
            // headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
             headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT
            }
        })
    }
}