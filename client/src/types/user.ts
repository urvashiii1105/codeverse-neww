/*
enum USER_CONNECTION_STATUS {
    OFFLINE = "offline",
    ONLINE = "online",
}

interface User {
    username: string
    roomId: string
}

interface RemoteUser extends User {
    status: USER_CONNECTION_STATUS
    cursorPosition: number
    typing: boolean
    currentFile: string
    socketId: string
    selectionStart?: number
    selectionEnd?: number
}

enum USER_STATUS {
    INITIAL = "initial",
    CONNECTING = "connecting",
    ATTEMPTING_JOIN = "attempting-join",
    JOINED = "joined",
    CONNECTION_FAILED = "connection-failed",
    DISCONNECTED = "disconnected",
}

export type { USER_CONNECTION_STATUS, USER_STATUS, RemoteUser, User }
*/
enum USER_CONNECTION_STATUS {
    OFFLINE = "offline",
    ONLINE = "online",
}

enum USER_STATUS {
    INITIAL = "initial",
    CONNECTING = "connecting",
    ATTEMPTING_JOIN = "attempting-join",
    JOINED = "joined",
    CONNECTION_FAILED = "connection-failed",
    DISCONNECTED = "disconnected",
}

interface User {
    username: string
    roomId: string
}

interface RemoteUser extends User {
    status: USER_CONNECTION_STATUS
    cursorPosition: number
    typing: boolean
    currentFile: string
    socketId: string
    selectionStart?: number
    selectionEnd?: number
}

/* ✅ CORRECT EXPORTS */
export { USER_CONNECTION_STATUS, USER_STATUS }
export type { User, RemoteUser }
