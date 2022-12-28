import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const data = [
  {
    id: 1,
    img: "https://links.papareact.com/gi1",
  },
  {
    id: 2,
    img: "https://links.papareact.com/6ff",
  },
  {
    id: 3,
    img: "https://links.papareact.com/7ma",
  },
];
export default function Banner() {
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {data.map((items) => (
          <div key={items.id}>
            <img loading="lazy" src={items.img} alt="/" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
