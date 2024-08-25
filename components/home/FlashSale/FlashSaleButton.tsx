"use client";

import { useState } from "react";

const FlashSaleButton = () => {
  const [showAllItems, setShowAllItems] = useState(false);

  const handleShowitems = () => {
    setShowAllItems(!showAllItems);
  };
  return (
    <div className="flex justify-center mt-2 1024:mt-5">
      <button
        onClick={handleShowitems}
        className="bg-secondary-2 text-text py-2 px-8 text-xs w-[170px] font-medium 500:py-3 750:text-sm 500:w-[200px] rounded"
      >
        {!showAllItems ? "View All Products" : "Show Less"}
      </button>
    </div>
  );
};

export default FlashSaleButton;
