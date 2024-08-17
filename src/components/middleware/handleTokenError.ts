
// import axios,{AxiosError} from "axios";

// export const handleTokenError=(error,toast,navigate,context)=>{
//     const err = error as AxiosError
//         if (err?.response) {
//           let data:any=err?.response?.data
//           toast.error(data);
//           if(data=='No refresh token'||data=='Refresh token has expired'||data=='Invalid refresh token'||data=='No token'){
//              context?.cleareAdminData()
//              navigate('/login')
//           }
//        }
// }