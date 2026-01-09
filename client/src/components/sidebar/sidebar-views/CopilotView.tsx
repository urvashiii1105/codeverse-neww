import { useCopilot } from "@/context/CopilotContext"
import { useFileSystem } from "@/context/FileContext"
import useResponsive from "@/hooks/useResponsive"
import toast from "react-hot-toast"
import {
   // LuCheck,
    LuTrash2,
    LuClipboardPaste,
    LuCopy,
} from "react-icons/lu"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"

function CopilotView() {
    const { viewHeight } = useResponsive()

    const {
        generateCode,
        isRunning,
        setInput,
        previewCode,
        clearPreview,
    } = useCopilot()

    const { activeFile, updateFileContent, setActiveFile } = useFileSystem()

    const cleanCode = previewCode?.trim() ?? ""

    /* 📄 COPY */
    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(cleanCode)
            toast.success("Code copied to clipboard")
        } catch {
            toast.error("Failed to copy code")
        }
    }

    /* 📋 PASTE */
    const pasteCode = () => {
        if (!activeFile) {
            toast.error("No active file")
            return
        }

        const content = activeFile.content
            ? `${activeFile.content}\n${cleanCode}`
            : cleanCode

        updateFileContent(activeFile.id, content)
        setActiveFile({ ...activeFile, content })

        toast.success("Code pasted into file")
    }

    /* ✔ REPLACE */
    /*
    const replaceCode = () => {
        if (!activeFile) {
            toast.error("No active file")
            return
        }

        const confirmed = confirm(
            "Are you sure you want to replace the entire file?",
        )
        if (!confirmed) return

        updateFileContent(activeFile.id, cleanCode)
        setActiveFile({ ...activeFile, content: cleanCode })

        toast.success("Code replaced successfully")
    }
        */

    return (
        <div
            className="flex max-h-full min-h-[400px] w-full flex-col gap-2 p-4"
            style={{ height: viewHeight }}
        >
            <h1 className="view-title">Copilot</h1>

            {/* PROMPT INPUT */}
            <textarea
                className="min-h-[120px] w-full rounded-md border-none bg-darkHover p-2 text-white outline-none"
                placeholder="What code do you want to generate?"
                onChange={(e) => setInput(e.target.value)}
            />

            {/* GENERATE BUTTON */}
            <button
                className="mt-1 flex w-full justify-center rounded-md bg-primary p-2 font-bold text-black outline-none disabled:cursor-not-allowed disabled:opacity-50"
                onClick={generateCode}
                disabled={isRunning}
            >
                {isRunning ? "Generating..." : "Generate"}
            </button>

            {/* PREVIEW */}
            {previewCode && (
                <>
                    {/* ACTION BUTTONS */}
                    <div className="flex justify-end gap-4 pt-2">
                        <button title="Copy" onClick={copyCode}>
                            <LuCopy
                                size={18}
                                className="cursor-pointer text-white"
                            />
                        </button>

                        <button title="Paste" onClick={pasteCode}>
                            <LuClipboardPaste
                                size={18}
                                className="cursor-pointer text-white"
                            />
                        </button>

                        {/* <button title="Replace" onClick={replaceCode}>
                            <LuCheck
                                size={18}
                                className="cursor-pointer text-green-400"
                            />
                        </button> */}

                        <button title="Clear preview" onClick={clearPreview}>
                            <LuTrash2
                                size={18}
                                className="cursor-pointer text-red-400"
                            />
                        </button>
                    </div>

                    {/* CODE PREVIEW */}
                    <div className="h-full w-full overflow-y-auto rounded-lg bg-gray-900 p-2">
                        <SyntaxHighlighter
                            style={dracula}
                            language="cpp"
                            PreTag="pre"
                        >
                            {cleanCode}
                        </SyntaxHighlighter>
                    </div>
                </>
            )}
        </div>
    )
}

export default CopilotView
