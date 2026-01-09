import { ICopilotContext } from "@/types/copilot"
import { createContext, ReactNode, useContext, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const CopilotContext = createContext<ICopilotContext | null>(null)

export const useCopilot = () => {
    const context = useContext(CopilotContext)
    if (!context) {
        throw new Error("useCopilot must be used within CopilotContextProvider")
    }
    return context
}

const CopilotContextProvider = ({ children }: { children: ReactNode }) => {
    const [input, setInput] = useState("")
    const [previewCode, setPreviewCode] = useState("") // 👈 LEFT PANEL PREVIEW
    const [output, setOutput] = useState("") // 👈 EDITOR INJECTION ONLY
    const [isRunning, setIsRunning] = useState(false)

    // 🔵 Generate code (PREVIEW ONLY)
    const generateCode = async () => {
        if (!input.trim()) {
            toast.error("Please write a prompt")
            return
        }

        try {
            setIsRunning(true)
            toast.loading("Generating code...")

            const response = await axios.post(
                "https://codeverse-neww.onrender.com/api/copilot",
                //"http://localhost:3000/api/copilot",
                { prompt: input }
            )

            let code = response.data.code || ""

            // Safety: remove markdown if backend didn’t
            code = code
                .replace(/```[a-zA-Z]*\n?/g, "")
                .replace(/```/g, "")

            setPreviewCode(code) // ✅ ONLY PREVIEW
            toast.dismiss()
            toast.success("Code ready. Click Apply to insert.")
        } catch (err) {
            console.error(err)
            toast.dismiss()
            toast.error("Failed to generate code")
        } finally {
            setIsRunning(false)
        }
    }

    // 🔥 Manual apply (EDITOR ME TAB JAYEGA)
    const applyCodeToEditor = () => {
        if (!previewCode) return
        setOutput(previewCode)
        toast.success("Code applied to editor")
    }

    // 🧹 Optional: clear preview
    const clearPreview = () => {
        setPreviewCode("")
    }

    return (
        <CopilotContext.Provider
            value={{
                setInput,
                previewCode,
                output,
                isRunning,
                generateCode,
                applyCodeToEditor,
                clearPreview,
            }}
        >
            {children}
        </CopilotContext.Provider>
    )
}

export { CopilotContextProvider }
export default CopilotContext
