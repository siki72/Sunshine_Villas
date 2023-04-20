import React from "react";

const CardsSkeleton = () => {
  return (
    <div className="cards_skeleton">
      <div className="mx-auto bg-white  shadow-lg w-96 rounded-2xl">
        <div className="h-80 p-3 overflow-hidden bg-gray-200 animate-pulse"></div>
        <div className="p-3 h-">
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="..."></div>
            <div className="col-span-2 ..."></div>
          </div>
        </div>
      </div>
      <div className="mx-auto bg-white  shadow-lg w-96 rounded-2xl">
        <div className="h-80 p-3 overflow-hidden bg-gray-200 animate-pulse"></div>
        <div className="p-3 h-">
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="..."></div>
            <div className="col-span-2 ..."></div>
          </div>
        </div>
      </div>

      <div className="mx-auto bg-white  shadow-lg w-96 rounded-2xl">
        <div className="h-80 p-3 overflow-hidden bg-gray-200 animate-pulse"></div>
        <div className="p-3 h-">
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 col-span-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="..."></div>
            <div className="col-span-2 ..."></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsSkeleton;
