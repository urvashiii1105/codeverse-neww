import pollinationApi from "@/api/pollinationsApi"

export const generateCodeFromCopilot = async (prompt: string) => {
    const response = await pollinationApi.post("/copilot", {
        prompt,
    })

    return response.data
}
