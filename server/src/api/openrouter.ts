import dotenv from "dotenv"
dotenv.config()

import axios from "axios"

//console.log("OPENROUTER KEY:", process.env.OPENROUTER_API_KEY)

const openRouterApi = axios.create({
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "CodeVerse Copilot",
    },
})

export default openRouterApi
