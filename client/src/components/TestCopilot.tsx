import pollinationApi from "@/api/pollinationsApi"

export const generateCodeFromCopilot = async (prompt: string) => {
    const response = await pollinationApi.get("/", {
        params: {
            prompt: "Write ONLY code.\n\n" + prompt,
        },
    })

    return response.data
}
