import React from "react";
import Videos from "../data.json";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-custom-stale-primary h-screen scroll scroll-smooth overflow-y-auto">
      {Videos.map((video) => {
        return (
          <NavLink
            to={video.id}
            key={video.id}
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 p-2 align-middle cursor-pointer bg-custom-stale-primary-light"
                : "flex gap-2 p-2 align-middle cursor-pointer"
            }
          >
            <img
              className="w-16 h-12 rounded-md"
              src={"https://picsum.photos/300"}
              alt={video.title}
            />
            <div>
              <p className="text-sm text-white font-semibold">{video.title}</p>
              <p className="text-xs text-slate-300 font-normal">
                {video.subtitle}
              </p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
