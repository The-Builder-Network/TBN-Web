import { io, Socket } from "socket.io-client";
import { getAccessToken } from "@/api/client";

// Derive server origin from the API URL (strip /api/v1 path)
const API_URL = import.meta.env.VITE_API_URL;
const SERVER_ORIGIN = API_URL.replace(/\/api\/v\d+\/?$/, "");

let chatSocket: Socket | null = null;
let notifSocket: Socket | null = null;

function createSocket(namespace: string): Socket {
  const socket = io(`${SERVER_ORIGIN}${namespace}`, {
    // Read the token on every (re)connect so a refreshed token is picked up.
    auth: (cb) => cb({ token: getAccessToken() }),
    transports: ["websocket", "polling"],
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 2000,
  });
  // A rejected handshake (e.g. expired access token) is not retried by
  // socket.io itself; try again once the HTTP client has refreshed the token.
  socket.on("connect_error", () => {
    setTimeout(() => {
      if (getAccessToken() && !socket.connected && socket === (namespace === "/ws/chat" ? chatSocket : notifSocket)) {
        socket.connect();
      }
    }, 5000);
  });
  return socket;
}

/**
 * Singleton sockets: listeners can be attached before the connection is up —
 * socket.io keeps them across reconnects.
 */
export function getChatSocket(): Socket {
  chatSocket ??= createSocket("/ws/chat");
  return chatSocket;
}

export function getNotifSocket(): Socket {
  notifSocket ??= createSocket("/ws/notifications");
  return notifSocket;
}

/** Connect both sockets (call after login / on mount when token exists) */
export function connectSockets() {
  if (!getAccessToken()) return;
  for (const s of [getChatSocket(), getNotifSocket()]) {
    if (!s.connected) s.connect();
  }
}

/** Disconnect both sockets (call on logout) */
export function disconnectSockets() {
  for (const s of [chatSocket, notifSocket]) {
    s?.removeAllListeners();
    s?.disconnect();
  }
  chatSocket = null;
  notifSocket = null;
}
