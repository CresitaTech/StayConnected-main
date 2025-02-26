import { io } from "socket.io-client";

const SOCKET_URL = "http://198.38.88.235:8082/chat";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const connectSocket = (token) => {
  socket.io.opts.extraHeaders = {
    Authorization: token,
  };
  socket.auth = { token };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};
