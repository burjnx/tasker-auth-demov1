import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function ProjectCard({ project, onToggleFavourite }) {
  const { name, id, progress, isFavourite } = project;
  const getCardBackgroundColor = (projectId) => {
    const colors = {
      PRJ001: "#6A5ACD",
      PRJ002: "#20B2AA",
      PRJ003: "#FF69B4",
      PRJ004: "#4169E1",
      PRJ005: "#B22222",
      PRJ006: "#DAA520",
      PRJ007: "#6495ED",
    };
    return colors[projectId] || "#6A5ACD";
  };

  return (
    <div
      className="rounded-xl px-5 pt-2 text-whit flex flex-col min-h-[140px] min-w-[240px] shadow-md relative
      "
      style={{ backgroundColor: getCardBackgroundColor(id) }}
    >
      <div className="flex flex-col justify-between items-start mb-1">
        <h3 className="text-[16px] text-white font-bold mt-5">{name}</h3>

        <p className="text-[16px] text-gray-200 mb-4">{id}</p>
        <div
          className="w-full bg-white/[.2] roundd-md transition-all duration-300 eas-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span
        className="absolute right-2 cursor-pointer flex items-center justify-center w-8 h-8"
        onClick={() => onToggleFavourite(id)}
        role="button"
        aria-label={
          isFavourite ? "Remove from favourites" : "Add to favourites"
        }
      >
        {isFavourite ? (
          <AiFillHeart className="size-[24px] text-white transition-color duration-200 hover:scale-110" />
        ) : (
          <AiOutlineHeart className="text-2xl text-white transition-color duration-200 hover:scale-110" />
        )}
      </span>
      <div>
        <span className="text-[12px] font-medium text-white">Progress</span>
        <div className="w-full bg-white/[.2] rounded-md h-[5px] overflow-hidden mt-1 mb-1">
          <div
            className="h-full bg-white rounded-md transition-all duration-300 eas-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
