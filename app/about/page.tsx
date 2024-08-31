import AboutHero from "@/components/about/AboutHero";
import Achievements from "@/components/about/Achievements";
import MemberCard from "@/components/about/MemberCard";
import MembersCarousel from "@/components/about/MembersCarousel";
import NavigationHeading from "@/components/NavigationHeading";
import Perks from "@/components/Perks";

const page = () => {
  return (
    <section
      id="contact"
      className="flex flex-col 1440:items-center px-2 1200:px-6 "
    >
      <div className="pb-16 1024:pb-16">
        <div className="1440:pl-8">
          <NavigationHeading pageName="About" />
        </div>

        <AboutHero />

        <Achievements />

        {/* TODO: The MembersCarousel should be here but for styling reasons it is not yet */}
        <MembersCarousel />

        <div>
          <Perks />
        </div>
      </div>
    </section>
  );
};

export default page;
