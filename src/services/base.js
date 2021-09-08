import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://documentmanager20210807155011.azurewebsites.net/api',
});
