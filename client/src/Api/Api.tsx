import axios from "axios";
import {cars} from "../Redux/reducers/folderPageReducer";

const instance = axios.create({
    baseURL: 'http://192.168.0.6:9000/',
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
    deleteFolder(id:any) {
        return instance.delete(`api/cars/${id}`).then(res=> res.data);
    }
    /*
    getOne(id:any) {
        return instance.get(`api/goods/${id}`).then(res=> res.data);
    },
    searchFunca(query:string){
        return instance.get(`api/goods/search?query=${query}`).then(res=> res.data);
    },
    searchFilterFunca(query2:string,query3:string){
        return instance.get(`api/goods/search2?query2=${query2}&query3=${query3}`).then(res=> res.data);
    }*/

}