import React, { useEffect, useState } from "react";
import { ws, client } from './lib/socket';
import ReactPlayer from 'react-player'



export default function App(props) {
  const inputRef = React.useRef(null)

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const ready = () => {
    const queue = getQueue();
    if (!queue || (queue.length && queue.length == 0)) {
      localStorage.setItem("storage", JSON.stringify([]));
    } else {
      setPlaying(true);
      setTimeout(() => {
        setMuted(false);
      }, 1000);
    }
  }

  const ended = () => {
    setPlaying(false);
    removeLatest();
    //get queue
    setTimeout(() => {
      const queue = getQueue();
      if (queue && queue.length > 0) {
        //play next
        setPlaying(true);
        setTimeout(() => {
          setMuted(false);
        }, 1000);
      }
      console.log(getQueue())
    }, 1000);

  }

  setInterval(() => {
    if (!playing) {
      const queue = getQueue();
      if (queue && queue.length > 0) {
        //play next
        setTimeout(() => {
          setMuted(false);
        }, 1000);
        setPlaying(true);
      }
    }
  }, 1000);


  return (
    <div className="App" id="player">
      <div className="grid gap-4 grid-cols-9">
        <div className="col-span-7 w-full h-[90vh]">
          {playing &&
            <>
              <ReactPlayer url={getLatest()}

                width={"100%"}
                height={"90vh"}

                onReady={ready}
                onEnded={ended}
                controls={true}
                autoPlay={true}
                muted={muted}
                loop={muted}
                playing

              />
              <div className="py-3 text-center">Added by: {getLatestUsername()}</div>
            </>
          }
          <div className="px-6 pb-3">
            <div onClick={() => skip(setPlaying)} className="mb-2 bg-blue-400 text-white rounded-lg px-4 py-2 mx-auto cursor-pointer text-center" > Skip this video </div>
          </div>
        </div>
        <div className="col-span-2 relative z-50">
          <iframe id="twitch-chat-embed"
            src="https://www.twitch.tv/embed/gibigbig/chat?parent=localhost"
            className="h-full"
            width="100%">
          </iframe>
          <div className="grid items-center justify-center h-[10vh]">
            <div><i class="fas fa-coffee"></i> &nbsp;Designed and coded by <a href="https://gibranali.com" className="text-blue-600" target="_blank">Gibran Ali</a> </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function extract(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return "https://www.youtube.com/watch?v=" + match[2];
  } else {
    return null;
  }
}

function getLatest() {
  const storage = localStorage.getItem("storage");
  const parsed = JSON.parse(storage);
  const latest = parsed[0].video;
  return latest
}

function getLatestUsername() {
  const storage = localStorage.getItem("storage");
  const parsed = JSON.parse(storage);
  const latest = parsed[0].username;
  return latest
}

function removeLatest() {
  const storage = localStorage.getItem("storage");
  const parsed = JSON.parse(storage);
  parsed.shift();
  localStorage.setItem("storage", JSON.stringify(parsed));
}

function skip(setPlaying) {
  removeLatest();
  setPlaying(false);
  setTimeout(() => {
    const queue = getQueue();
    setPlaying(true);
  }, 500);
}

function addLatest(id, username) {
  const storage = localStorage.getItem("storage");
  let parsed = JSON.parse(storage);
  if (parsed) {
    parsed.push({ video: id, username });
  } else {
    parsed = [id, username];
  }
  console.log(parsed)
  localStorage.setItem("storage", JSON.stringify(parsed));
}

function getQueue() {
  const storage = localStorage.getItem("storage");
  const parsed = JSON.parse(storage);
  return parsed;
}

const onMessageHandler = (target, context, msg, self) => {
  console.log("received")
  const video = extract(msg);
  if (video) {
    addLatest(video, context.username);
  }
}
client.on('message', onMessageHandler);

