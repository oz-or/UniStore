declare type ProductsType = {
  discount?: number;
  img: string;
  name: string;
  price: number;
  old_price?: number;
  rating: number;
  num_ratings: number;
};

declare type ProductCardType = {
  i: number;
  img: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  setHovered: React.Dispatch<React.SetStateAction<number>>;
  hovered: number;
  numberOfRatings: number;
  discount?: number;
};
