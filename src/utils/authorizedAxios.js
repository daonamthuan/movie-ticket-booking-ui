import axios from "axios";
import { toast } from "react-toastify";
import { handleLogoutAPI, refreshTokenAPI } from "~/apis";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

let navigate = null;

export const setNavigate = (nav) => {
    navigate = nav;
};

let authorizedAxiosInstance = axios.create({ baseURL: `${baseURL}/${apiVersion}` });

// Config timeout
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

authorizedAxiosInstance.defaults.withCredentials = true;

// Add a request interceptor: intervene in request from CLIENT to SERVER
authorizedAxiosInstance.interceptors.request.use(
    (config) => {
        // Do something before request is sent to server

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

/*
 * Mục địch tạo Promise này để khi nhận yêu cầu refreshToken đầu tiên thì hold lại việc gọi API refresh token
 * cho tới xong xuôi thì mới retry lại những api lỗi trước đó thay vì cứ thế gọi liền các refreshTokenAPI liên tục
 */
let refreshTokenPromise = null;

// Add a response interceptor: intervene in response from SERVER to CLIENT
authorizedAxiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    (error) => {
        console.log("Error in interceptor response error", error);

        if (error.response?.status === 401) {
            console.log("Check reload");
            handleLogoutAPI().then(() => {
                localStorage.removeItem("userInfo");

                navigate("/login");
            });
        }

        const originalRequest = error.config;
        if (error.response?.status === 410 && originalRequest) {
            if (!refreshTokenPromise) {
                // gọi API refreshToken
                refreshTokenPromise = refreshTokenAPI()
                    .then((res) => {
                        console.log("Refresh token successfully : ", res);
                    })
                    .catch((_error) => {
                        // Nếu như gặp bất kỳ lỗi nào từ API Refresh Token thì logout luôn
                        handleLogoutAPI().then(() => {
                            // điều hướng tới login sau khi logout thành công
                            navigate("/login");
                        });

                        return Promise.reject(_error);
                    })
                    .finally(() => {
                        // Dù cho API refresh_token có thành công hay lỗi thì vẫn gán lại refreshTokenPromise như ban đầu
                        refreshTokenPromise = null;
                    });
            }

            // Cuối cùng mới return lại cái refreshTokenPromise trong trường hợp success ở đây
            return refreshTokenPromise.then(() => {
                // Bước cuối: Gọi lại API ban đầu bị lỗi (return lại axios instance của chúng ta kết hợp với originalRequest)
                return authorizedAxiosInstance(originalRequest);
            });
        }

        // Any status codes that falls outside the range of 2xx cause this function to trigger

        // Do something with response error
        // Trừ mã 410 - GONE: mã này để riêng để phục vụ khi accessToken hết hạn thì dùng để refreshToken
        if (error.response?.status !== 410) {
            toast.error(error.response?.data?.message || error?.message);
        }

        return Promise.reject(error);
    }
);

export default authorizedAxiosInstance;
