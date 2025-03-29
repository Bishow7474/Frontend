
import axios from "axios";
import { getLocalStroage, removeLocalStroage} from "../utilities/helpers";
import { toast } from "react-toastify";


const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_APP_URL,
    timeout:30000,
    timeoutErrorMessage:"Server timed out...",
    responseType:"json",
})

axiosInstance.interceptors.request.use((config) => {
    let token = getLocalStroage('token') as unknown as string | null;
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
})

axiosInstance.interceptors.response.use((Response) => {
    return Response.data
},
async (error) => {
    if(error.response) {
        const {status,data} = error.response;

        if(status === 401 && data.status === 'TOKEN_EXPECTED') {
            toast.error("Please login first");
            removeLocalStroage('token')
            window.location.href = "/"
        } else if(status === 401 && data.status === "TOKEN_EXPECTED") {
        //    let respones =await authSvc.getRequest("/auth/refresh",{refresh:true})
        //    setLocalStroage("token",respones.data.token)
        //    setLocalStroage("refresh",respones.data.refresh)
        }
        // if(status ===400) {

        // }else if(status === 422) {

        // } else if(status === 401) {
            
        // } else if(status === 403) {
            
        // } else if(status === 404) {
            
        // }
        // else if(status === 405) {
            
        // }else {

        // }
        throw {
            status,data, message: error.message
        }
    }
    else if(error.request) {
        console.log("No Response:",error.request);
    } else {
        console.log("Request Error", error.message);
        
    }
})

export default axiosInstance;