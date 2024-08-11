function Star({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (star: number) => void;
}) {
  return (
    <div className="scale-75">
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            key={star}
            className={`start cursor-pointer text-[35px]`}
            style={{
              color: rating >= star ? "gold" : "gray",
            }}
            onClick={() => {
              setRating(star);
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default Star;
