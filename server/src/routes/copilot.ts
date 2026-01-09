import { Router } from "express"
import openRouterApi from "../api/openrouter"

const router = Router()

router.post("/copilot", async (req, res) => {
    try {
        const { prompt } = req.body

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" })
        }

        const response = await openRouterApi.post("/chat/completions", {
           model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a coding assistant. Generate ONLY code. No explanation.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        })

        const data = response.data as any

        const code =
            data.choices?.[0]?.message?.content ?? ""

        res.json({ code })
    } catch (err: any) {
        console.error("❌ COPILOT ERROR FULL:", err)
        res.status(500).json({ error: "Copilot failed" })
    }
})

export default router
