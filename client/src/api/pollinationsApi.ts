/*
import axios, { AxiosInstance } from "axios"

const pollinationsBaseUrl = "https://text.pollinations.ai/{prompt}"

const instance: AxiosInstance = axios.create({
    baseURL: pollinationsBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
})

export default instance
*/

/*
import axios, { AxiosInstance } from "axios"

const instance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/api", // backend
    headers: {
        "Content-Type": "application/json",
    },
})

export default instance

*/

import axios from "axios"

const pollinationApi = axios.create({
    baseURL: "https://text.pollinations.ai",
})

export default pollinationApi
