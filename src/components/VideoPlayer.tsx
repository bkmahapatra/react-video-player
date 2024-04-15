import React, { useMemo } from "react";
import { useParams } from "react-router";
import Videos from "../data.json";
import { IoMdDownload, IoMdTime } from "react-icons/io";

const VideoPlayer = () => {
  const { id } = useParams();

  const video = useMemo(() => {
    console.log("first");
    return Videos.find((video) => video.id === id);
  }, [id]);

  return (
    <div className="p-5">
      <video controls className="rounded-t-md">
        <source src={video?.sources[0]} type="video/mp4" />
      </video>
      <div className="bg-custom-stale-primary rounded-b-md p-5">
        <div className="flex justify-between">
          <div>
            <p className="text-xl text-white font-semibold">
              {video?.title || "No title"}
            </p>

            <p className="text-xs text-slate-300 font-normal my-2">
              {video?.subtitle || "No subtitle"}
              <span className="text-sky-400 font-medium"> +Follow</span>
            </p>
          </div>

          <div className="flex gap-3">
            <div className="p-1 bg-custom-stale-primary-light rounded-md my-auto cursor-pointer">
              <IoMdTime className="text-white text-xl" />
            </div>

            <div className="p-1 bg-custom-stale-primary-light rounded-md my-auto cursor-pointer">
              <a href={video?.sources[0]} download={video?.title || "my-video"}>
                <IoMdDownload className="text-white text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-custom-stale-primary-light my-5 p-2 rounded-md">
          <p className="text-sm text-gray-400 font-normal">
            {video?.description || "No description"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;
