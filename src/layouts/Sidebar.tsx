import { useState } from "react";
import Videos from "../data.json";
import { NavLink } from "react-router-dom";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { MdOutlineDragIndicator } from "react-icons/md";
import { IoIosArrowDropupCircle } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [videos, setVideos] = useState([...Videos]);

  const handleDrop = (droppedItem: DropResult) => {
    if (!droppedItem.destination) return;
    const updatedList = [...videos];

    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);

    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

    // Update State
    setVideos(updatedList);
  };

  return (
    <div
      className={`md:flex-none w-full md:w-80 fixed ${
        isOpen ? "bottom-0" : "-bottom-64"
      } md:left-0 z-10 md:mt-14 bg-custom-stale-primary transition-all`}
    >
      <IoIosArrowDropupCircle
        onClick={() => setIsOpen((prev) => !prev)}
        className={`text-sky-500 text-4xl absolute -top-6 right-2 z-20 sm:invisible ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      />

      <div className="h-72 md:h-[calc(100vh-3.5rem)] scroll-smooth overflow-y-auto">
        <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {videos.map((video, index) => {
                  return (
                    <Draggable
                      key={index}
                      draggableId={`item-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="payment__gateway--item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <NavLink
                            to={video.id}
                            key={video.id}
                            className={({ isActive }) =>
                              isActive
                                ? "flex gap-2 p-2 items-center cursor-pointer bg-custom-stale-primary-light"
                                : "flex gap-2 p-2 items-center cursor-pointer"
                            }
                          >
                            <MdOutlineDragIndicator className="text-white text-base min-w-4" />
                            <img
                              className="min-w-14 h-10 rounded-md"
                              src={video.imageUrl}
                              alt={video.title}
                            />
                            <div>
                              <p className="text-sm text-white font-semibold">
                                {video.title}
                              </p>
                              <p className="text-xs text-slate-300 font-normal my-1">
                                {video.subtitle}
                              </p>
                            </div>
                          </NavLink>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Sidebar;
