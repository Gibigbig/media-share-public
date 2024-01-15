import tmi from "tmi.js";
import config from "./config.js";


// Define configuration options
const opts = {
  identity: {
    username: config.username,
    password: config.password
  },
  channels: [
    config.channel
  ]
};





const ws = new WebSocket('wss://pubsub-edge.twitch.tv/v1');
ws.onerror = (e) => console.error(e);

ws.onclose = () => console.log("Disconnected from Rewards WS.");


// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('redeem', e => console.log(e));
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();


// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}


export { ws, client }