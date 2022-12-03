import Vue from "vue";

let SOCKET_CONNECTING = 0;
let SOCKET_OPEN = 1;
let SOCKET_CLOSING = 2;
let SOCKET_CLOSED = 3;

let host = "ws://" + document.location.host + "/webserialws";
//let host = "ws://datalogger.local/webserialws"; // For Local Testing

// let host = "ws://192.168.1.x/dashws"; // For Local Testing via npm run serve

const socket = new WebSocket(host);

const emitter = new Vue({
  methods: {
    send(message) {
      if (SOCKET_OPEN === socket.readyState) socket.send(message);
    },
  },
});

socket.onopen = function () {
  emitter.$emit("connected");
};

socket.onclose = function () {
  emitter.$emit("disconnected");
};

socket.onmessage = function (msg) {
  emitter.$emit("message", msg.data);
};

socket.onerror = function (err) {
  emitter.$emit("error", err);
};

setInterval(() => {
  if (socket.readyState === SOCKET_CONNECTING) {
    emitter.$emit("disconnected");
  } else if (socket.readyState === SOCKET_OPEN) {
    // console.log("OPEN");
  } else if (socket.readyState === SOCKET_CLOSING) {
    console.log("CLOSING");
  } else if (socket.readyState === SOCKET_CLOSED) {
    refresh(false);
  }
}, 1500);

function refresh(test) {
  if (test) return;
  var url = location.origin;
  var pathname = location.pathname;
  var hash = location.hash;

  location =
    url +
    pathname +
    "?application_refresh=" +
    Math.round(Math.random() * 100000) +
    hash;
}

export default emitter;
