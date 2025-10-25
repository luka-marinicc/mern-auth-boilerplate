import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL ?? "http://localhost:5000/api",
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest: any = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refreshRes = await axios.get(
                    "http://localhost:5000/api/auth/refresh",
                    { withCredentials: true }
                );
                const newToken = refreshRes.data.token;
                localStorage.setItem("accessToken", newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                window.dispatchEvent(new Event("session-expired"));
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
