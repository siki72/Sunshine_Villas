import React from "react";

const ReviewsSkeleton = () => {
  return (
    <div className="flex animate-pulse w-64">
      <div className="flex-shrink-0 ml-4">
        <span className="w-12 h-12 ml-4 block bg-gray-200 rounded-full dark:bg-gray-700 mr-10"></span>
      </div>
      <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px]"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ReviewsSkeleton;
