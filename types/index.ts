declare type HeroCarouselType = {
  id: number;
  img: string;
  textFirst: string;
  textSecond: string;
  link: string;
};

declare type ProductsType = {
  id: number;
  discount?: number;
  img: string;
  name: string;
  price: number;
  old_price?: number;
  rating: number;
  num_ratings: number;
};

declare type ProductDetailsInfoType = {
  name: string;
  price: number;
  oldPrice?: number;
  starRating: number;
  numRatings: number;
  inStock: boolean;
  desc: string;
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

declare type MembersType = {
  name: string;
  position: string;
  img: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
};

declare type ProductCartType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

declare type CartItemType = {
  img: string | undefined;
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};
