"use client";

import Image from "next/image";
import React from "react";

const ExploreBtn = () => {
  return (
    <button type="button" onClick={() => console.log("CLICK")} id="explore-btn" className="mt-7 mx-auto">
      <a href="#events">
        Explore Event
        <Image src="/icons/arrow-down.svg" alt="Arrow Down" width={24} height={24} />
      </a>
    </button>
  );
};

export default ExploreBtn;
