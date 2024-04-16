import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router";
import Videos from "../data.json";
import { IoMdDownload, IoMdTime, IoIosPlayCircle } from "react-icons/io";
import {
  MdForward5,
  MdReplay5,
  MdOutlinePauseCircleFilled,
} from "react-icons/md";

const VideoPlayer = () => {
  const { id } = useParams();

  // selected video
  const video = useMemo(() => {
    return Videos.find((video) => video.id === id);
  }, [id]);

  const videoRef = useRef(null);

  // component states
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [crTime, setCrTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCrTime(videoRef.current.currentTime);
    }, 1000 * speed);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // video functionality
  const togglePlay = useCallback(() => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setDuration(videoRef.current?.duration);
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [videoRef]);

  const handlePlayback = (value: number) => {
    const pTime = videoRef.current.currentTime + value;

    if (pTime <= 0 || pTime >= duration) {
      videoRef.current.currentTime = 0;
      // setCrTime(0);
    } else {
      videoRef.current.currentTime = pTime;
      // setCrTime(pTime);
    }
  };

  const handleSeek = (event) => {
    videoRef.current.currentTime = event.target.value;
  };

  const handleSpeed = useCallback((event) => {
    const playbackRate = parseFloat(event.target.value);
    setSpeed(playbackRate);
    videoRef.current.playbackRate = playbackRate;
  }, []);

  const toggleFullScreen = () => {
    // if (!document.fullscreenElement) {
    //   videoRef.current.requestFullscreen();
    // } else {
    //   document.exitFullscreen();
    // }
  };

  //  formated time to display
  const formatTime = useCallback((time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return min + ":" + sec;
  }, []);

  return (
    <div className="md:ml-80">
      <div
        className="relative"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          key={video?.id}
        //   autoPlay
          className="rounded-t-md h-full w-full"
        >
          <source src={video?.sources[0]} type="video/mp4" />
          <p>Your browser doesn't support HTML5 video.</p>
        </video>

        {showControls && (
          <div className="absolute bottom-0 w-full p-2 bg-gradient-to-t from-black to-transparent">
            {/* progressbar */}
            <div className="flex items-center gap-2">
              <span className="text-white text-xs font-normal ">
                {formatTime(crTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration}
                value={crTime}
                onChange={handleSeek}
                onMouseDown={togglePlay}
                onMouseUp={togglePlay}
                className="w-full h-0.5 my-3 rounded-md bg-zinc-300 outline-none cursor-progress"
              />
              <span className="text-white text-xs font-normal">
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {/* play toggle */}
                <button onClick={togglePlay}>
                  {isPlaying ? (
                    <MdOutlinePauseCircleFilled className="text-white text-3xl hover:text-sky-500" />
                  ) : (
                    <IoIosPlayCircle className="text-white text-3xl hover:text-sky-500" />
                  )}
                </button>

                <button onClick={() => handlePlayback(-5)}>
                  <MdReplay5 className="text-white text-3xl hover:text-sky-500" />
                </button>
                <button onClick={() => handlePlayback(5)}>
                  <MdForward5 className="text-white text-3xl hover:text-sky-500" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* playback speed */}
                <select
                  className="w-11 text-white font-medium bg-transparent border  rounded-md  border-none focus:outline-none focus:border-blue-500 hover:text-sky-500"
                  value={speed}
                  onChange={handleSpeed}
                >
                  <option className="text-black" value={0.5}>
                    .5x
                  </option>
                  <option className="text-black" value={1}>
                    1x
                  </option>
                  <option className="text-black" value={2}>
                    2x
                  </option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-custom-stale-primary rounded-b-md">
        <div className="flex justify-between pb-2 p-3 md:p-5">
          <div>
            <p className="text-xl text-white font-semibold">
              {video?.title || "No title"}
            </p>

            <p className="text-sm text-slate-300 my-2 font-semibold">
              {video?.subtitle || "No subtitle"}
              <span className="text-sky-400 font-medium cursor-pointer">
                {" "}
                +Follow
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-1 bg-custom-stale-primary-light rounded-md  cursor-pointer">
              <IoMdTime className="text-white text-xl hover:text-sky-500" />
            </div>

            <div className="p-1 bg-custom-stale-primary-light rounded-md  cursor-pointer">
              <a href={video?.sources[0]} download={video?.title || "my-video"}>
                <IoMdDownload className="text-white text-xl hover:text-sky-500" />
              </a>
            </div>
          </div>
        </div>

        {/* <hr /> */}
        <div className="text-sm font-medium text-slate-300 p-3 md:px-5 py-2 border-b border-b-gray-600">
          Description
        </div>
        <div className="p-3 md:p-5">
          <div className="bg-custom-stale-primary-light p-2 rounded-md">
            <p className="text-sm text-gray-400 font-normal">
              {video?.description || "No description"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;
