import Hero from "../Hero";
import { Services } from "../Services";
import ProductViewer from "../ProductViewer";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Hero />
      <Services />
      <ProductViewer />
    </>
  );
};

export default Home;
