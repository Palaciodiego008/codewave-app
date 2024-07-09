import axios from "axios";
import { AppInterceptors } from "@/app/config/interceptors";

export const ApiGateway = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_CODEWAVE_API_GATEWAY,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  timeout: 10000,
})

ApiGateway.interceptors.request.use(AppInterceptors.req, AppInterceptors.reqErr)
ApiGateway.interceptors.response.use(AppInterceptors.res, AppInterceptors.resErr)
