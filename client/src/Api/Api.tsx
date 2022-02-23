import axios from "axios";
import {cars} from "../Redux/reducers/folderPageReducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/Redux-store";


const instance = axios.create({
    baseURL: 'http://192.168.0.3:9000/',
})
instance.interceptors.request.use((config) => {
    let accessToken = JSON.parse(String(localStorage.getItem('profile')));
    //@ts-ignore
    config.headers.Authorization = `Bearer ${ accessToken && accessToken.accessToken}`
    return config;
})
instance.interceptors.response.use((config)=>{
    return config;
},(async error => {
    const originalRequest = error.config;
    if(error.response.status == 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;
        try{
            const access = JSON.parse(String(localStorage.getItem('profile')));
            const responce = await instance.post(`auth/refresh`, {"token": access.refreshToken}).then(res=> res.data.accessToken);
            access.accessToken = responce;
            await localStorage.setItem('profile', JSON.stringify(access));
            return instance.request(originalRequest);
        } catch (e){
            console.log('НЕ АВТОРЕЗОВАН')
        }
    }
    throw error;
}))
export const adminApi = {
    getGoods() {
        return instance.get<Array<cars>>(`api/cars`).then(res=> res.data);
    },
    addNewFolder(data:any){
        return instance.post(`api/cars`, {...data}).then(res=>res.data);
    },
    updateFolderName(id:string,data:any){
        return instance.put(`api/cars/${id}`, {...data}).then(res=>res.data);
    },
    deleteFolder(id:any, userId:any) {
        const mainId= `?id=${id}&userId=${userId}`;
        return instance.delete(`api/cars${mainId}`, ).then(res=> res.data);
    },
    loginMe(data:{email: string, password: string}) {
        const {email,password} = data;
        return instance.post(`/auth/signIn`, {email,password}).then(res=>res.data);
    },
    signUp(data:{email: string, password: string}) {
        return instance.post(`/auth/signUp`, data).then(res=>res.data);
    },
    getFolders(id:string){
        return instance.get(`/api/users/${id}`).then(res=>res.data);
    },
    addIdOfCar(data:any){
        return instance.post(`/api/users`, data).then(res=>res.data);
    }

}