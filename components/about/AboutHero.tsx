const AboutHero = () => {
  return (
    <div className="flex flex-col 750:flex-row 750:mr-[-8px] 1200:mr-[-24px] 750:gap-x-8 1200:justify-between">
      <div className="flex flex-col 750:justify-center 750:ml-4 1024:ml-8">
        <h1 className="text-[40px] font-semibold mb-6">Our Story</h1>
        <div className="text-sm flex flex-col gap-y-5 w-full 500:gap-y-10 max-w-[800px] 750:max-w-[600px] 750:gap-y-6 750:text-xs 1024:text-base ">
          <p>
            Launched in 2015, UniStore is the premier online shopping
            makterplace in Western Europe with an active presense in the United
            Kingdom. Supported by wide range of tailored marketing, data and
            service solutions, UniStore has 10,500 sallers, 300 brands and
            serves 3 millions customers across the region.
          </p>
          {/* hidden above 750px */}
          <div className="750:hidden">
            <img
              src="/about/Women.svg"
              alt="Two women are browsing the UniStore website on their phone with shopping bags in their hands"
              className="w-full"
            />
          </div>
          <p>
            UniStore has more than 1 Million products to offer, growing at a
            very fast rate. UniStore offers a diverse selection of products
            ranging from electronics to fashion.
          </p>
        </div>
      </div>
      {/* hidden below 750px */}
      <div className="hidden 750:block max-w-[705px]">
        <img
          src="/about/Women.svg"
          alt="Two women are browsing the UniStore website on their phone with shopping bags in their hands"
        />
      </div>
    </div>
  );
};

export default AboutHero;
