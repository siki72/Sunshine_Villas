import { Spinner } from "flowbite-react";
import React from "react";

const PendingPage = () => {
  return (
    <div className="pending">
      <div className="flex flex-wrap items-center gap-2">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    </div>
  );
};

export default PendingPage;
