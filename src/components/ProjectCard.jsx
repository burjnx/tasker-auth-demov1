import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const COLORS = ["#6A5ACD", "#20B2AA", "#D9488F", "#4169E1", "#B22222", "#B8860B", "#4F7FD9"];

// Original colours for the sample projects; new projects get one from the palette
const FIXED = {
  PRJ001: "#6A5ACD", PRJ002: "#20B2AA", PRJ003: "#FF69B4", PRJ004: "#4169E1",
  PRJ005: "#B22222", PRJ006: "#DAA520", PRJ007: "#6495ED",
};

function cardColor(id) {
  if (FIXED[id]) return FIXED[id];
  let hash = 0;
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return COLORS[hash % COLORS.length];
}

function ProjectCard({ project, onToggleFavourite, onSelectProject }) {
  const { name, id, progress, isFavourite } = project;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => onSelectProject(id)}
      onKeyDown={(e) => e.key === "Enter" && onSelectProject(id)}
      className="relative flex min-h-[140px] w-[240px] shrink-0 cursor-pointer flex-col justify-between rounded-xl px-5 pt-5 pb-3 text-white shadow-md transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#903DE2]"
      style={{ backgroundColor: cardColor(id) }}
    >
      <div className="pr-8">
        <h3 className="text-[16px] font-bold leading-snug">{name}</h3>
        <p className="text-[14px] text-white/80">{id}</p>
      </div>
      <button
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavourite(id);
        }}
        aria-label={isFavourite ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
        aria-pressed={isFavourite}
      >
        {isFavourite ? (
          <AiFillHeart className="size-[24px] transition-transform hover:scale-110" />
        ) : (
          <AiOutlineHeart className="size-[24px] transition-transform hover:scale-110" />
        )}
      </button>
      <div>
        <div className="flex justify-between text-[12px] font-medium">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-1 h-[5px] w-full overflow-hidden rounded-md bg-white/25">
          <div className="h-full rounded-md bg-white" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
