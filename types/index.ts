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
  in_stock: boolean;
};

declare type ProductDetailsInfoType = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  desc: string;
};

declare type ProductCardType = {
  i: number;
  img: string;
  name: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  setHovered: (value: number) => void;
  hovered: number;
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
  id: number;
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  img: string;
};

declare type WishlistItemsType = {
  id: number;
  img: string;
  name: string;
  price: number;
  old_price?: number;
  discount?: number;
};
