"use client";

import { useState } from "react";
import Star from "./Star";

function StarRatings({ starRating }: { starRating: number }) {
  const [rating, setRating] = useState(0);
  return (
    <>
      <div className="scale-75 500:scale-[80%]">
        <Star rating={starRating} setRating={setRating} />
      </div>
    </>
  );
}
export default StarRatings;
