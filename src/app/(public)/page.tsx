import CategoryRow from "@/components/card/CategoryCard";
import Carousel from "@/components/slider/Slider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

import "@/general-styles/public-home.scss";
import CarouselProduct from "@/components/latest/Slider";

export default function Home() {
  return (
    <section className="home">
      <div className="container">
        <div className="home__main">
          <Carousel />
        </div>
        <div className="home__categories__header">
          <h1 className="home__title__categories">Oxirgi mahsulotlar</h1>
        </div>
        <div className="home__main">
          <CarouselProduct />
        </div>
        <div className="home__categories__header">
          <h1 className="home__title__categories">Mahsulotlar kategoriyasi</h1>
        </div>
        <div className="home__categories">
          <CategoryRow />
        </div>
      </div>
    </section>
  );
}
