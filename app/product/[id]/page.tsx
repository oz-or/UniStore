import Header from "@/components/Header";
import OurProductsItems from "@/components/home/OurProducts/OurProductsItems";
import NavigationHeading from "@/components/NavigationHeading";
import ProductImages from "@/components/productDetails/ProductImages";
import ProductInfo from "@/components/productDetails/ProductInfo";
import { getProductById, getProducts } from "@/utils/apiProducts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getProducts();
  return (products ?? []).map((product) => ({
    id: product.id.toString(),
  }));
}

const Page = async ({ params }: { params: { id: string } }) => {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  const {
    id,
    name,
    img,
    price,
    old_price: oldPrice,
    in_stock: inStock,
    description: desc,
  } = product;

  return (
    <section id="productDetails" className="flex flex-col 500:items-center ">
      <div className="mt-2 500:w-[500px] 750:w-[750px] 1024:w-[1024px] 1200:w-[1200px] ">
        <NavigationHeading pageName1={name} />
        <div className="flex flex-col gap-y-8 pb-16 px-6 750:items-center 1024:flex-row 1024:gap-x-8 1200:gap-x-[74px] 1440:px-0 1440:gap-x-16">
          <ProductImages img={img} />

          <ProductInfo
            id={id}
            name={name}
            price={price}
            oldPrice={oldPrice}
            inStock={inStock}
            desc={desc}
          />
        </div>
        <div className="px-2 mt-2 pb-20">
          <Header text="Related Items" />

          <OurProductsItems />
        </div>
      </div>
    </section>
  );
};

export default Page;
