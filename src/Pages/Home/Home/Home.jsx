import Banner from "../Banner/Banner";

import About from "../About/About";
import PokemonCardsCollection from "../PokemonCardsCollection/PokemonCardsCollection";
import Subscription from "../Subscription/Subscription";
import DonateSection from "../DonateSection/DonateSection";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner className="bg-black" />

      <PokemonCardsCollection />
      <Subscription />
      <About />
      <DonateSection />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
