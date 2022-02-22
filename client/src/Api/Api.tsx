import axios from "axios";
import {cars} from "../Redux/reducers/folderPageReducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/Redux-store";
const config = JSON.parse(String(localStorage.getItem('profile')));
const instance = axios.create({
    baseURL: 'http://192.168.0.6:9000/',
    headers : {"Authorization": `Bearer ${ config && config.accessToken}`},
})

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