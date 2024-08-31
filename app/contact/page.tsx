import ContactForm from "@/components/contact/ContactForm";
import NavigationHeading from "@/components/NavigationHeading";
const page = () => {
  return (
    <section
      id="contact"
      className="flex flex-col 1440:items-center px-2 1200:px-6 1440:pb-24"
    >
      <div className="pb-16 1024:pb-24">
        <NavigationHeading pageName="Contact" />

        <div className="flex flex-col 500:items-center  ">
          <div className="flex flex-col gap-y-12 500:max-w-[475px] 750:max-w-full 1024:flex-row 1024:gap-x-24">
            <div className="flex flex-col gap-y-10 text-lg 750:flex-row 750:gap-x-12 1024:flex-col">
              <div className="border-b-[1px] border-b-black border-opacity-40 flex flex-col gap-y-4 pb-10 750:w-[300px] 750:border-hidden 1024:w-full 1024:border-solid">
                <div className="flex items-center gap-x-3">
                  <div className="bg-secondary-2 rounded-full p-3">
                    <img src="/Telephone.svg" alt="" />
                  </div>
                  <h2 className="text-2xl font-semibold">Call To Us</h2>
                </div>
                <p>We are available 24/7, 7 days a week.</p>
                <p>Phone: +8801611112222</p>
              </div>
              <div className="flex flex-col gap-y-4 750:w-[300px] 1024:w-96">
                <div className="flex items-center gap-x-3 ">
                  <div className="bg-secondary-2 rounded-full p-3 py-4">
                    <img src="/Mail.svg" alt="" />
                  </div>
                  <h2 className="text-2xl font-semibold">Write To Us</h2>
                </div>
                <p>
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p>Email: farkasozor@contact.com</p>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
