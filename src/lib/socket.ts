import { io, Socket } from "socket.io-client";
import { getAccessToken } from "@/api/client";

// Derive server origin from the API URL (strip /api/v1 path)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
const SERVER_ORIGIN = API_URL.replace(/\/api\/v\d+\/?$/, "");

let chatSocket: Socket | null = null;
let notifSocket: Socket | null = null;

function createSocket(namespace: string): Socket {
  const token = getAccessToken();
  return io(`${SERVER_ORIGIN}${namespace}`, {
    auth: { token },
    transports: ["websocket", "polling"],
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
  });
}

/** Get (or create) the chat socket — `/ws/chat` namespace */
export function getChatSocket(): Socket {
  if (!chatSocket || chatSocket.disconnected) {
    chatSocket?.removeAllListeners();
    chatSocket = createSocket("/ws/chat");
  }
  return chatSocket;
}

/** Get (or create) the notifications socket — `/ws/notifications` namespace */
export function getNotifSocket(): Socket {
  if (!notifSocket || notifSocket.disconnected) {
    notifSocket?.removeAllListeners();
    notifSocket = createSocket("/ws/notifications");
  }
  return notifSocket;
}

/** Connect both sockets (call after login / on mount when token exists) */
export function connectSockets() {
  const token = getAccessToken();
  if (!token) return;

  const chat = getChatSocket();
  if (!chat.connected) {
    chat.auth = { token };
    chat.connect();
  }

  const notif = getNotifSocket();
  if (!notif.connected) {
    notif.auth = { token };
    notif.connect();
  }
}

/** Disconnect both sockets (call on logout) */
export function disconnectSockets() {
  chatSocket?.disconnect();
  chatSocket?.removeAllListeners();
  chatSocket = null;

  notifSocket?.disconnect();
  notifSocket?.removeAllListeners();
  notifSocket = null;
}
