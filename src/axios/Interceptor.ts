    import axios, { AxiosInstance, AxiosError } from "axios";
    


    export const axiosInstance: AxiosInstance = axios.create({
        baseURL: "https://newyourchoice.shop",
        withCredentials: true,
    });
    
    export const interceptor = (error: AxiosError) => {
          
        
        let data:any=error?.response?.data
        if(data=='No refresh token'||data=='Refresh token has expired'||data=='Invalid refresh token'||data=='No token'){
           
        }   
        
        return Promise.reject(error);
    };

    axiosInstance.interceptors.response.use(
        (response) => response,
        interceptor
    );


    

    //----------------------------------------------------------------------------------------------------------------


    