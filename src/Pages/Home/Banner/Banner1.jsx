
// import { ArrowRight } from "@phosphor-icons/react";
// import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const book1 = "https://www.pojo.com/wp-content/uploads/2021/01/Pikachu-V-vv043.jpg";
const book2 = "https://images.pokemontcg.io/smp/SM212.png";
const book3 = "https://images.pokemontcg.io/smp/SM212.png";
// const signature = "https://images.pokemontcg.io/smp/SM212.png";
import bannerBg from "../../../assets/banner/hero.webp"
const books = [book1, book2, book3, book1, book2, book3, book1, book2, book3];

const Book = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollSpeed = 1;
    let requestId;

    const animateScroll = () => {
      setScrollPosition((prevScrollPosition) => {
        const newPosition = prevScrollPosition - scrollSpeed;
        const containerWidth = scrollContainer.scrollWidth / 2;

        if (Math.abs(newPosition) >= containerWidth) {
          return 0;
        }

        return newPosition;
      });
      requestId = requestAnimationFrame(animateScroll);
    };

    animateScroll();

    return () => cancelAnimationFrame(requestId);
  }, []);

  useEffect(() => {
    const handleScaling = () => {
      const books = scrollRef.current?.children;

      if (books) {
        Array.from(books).forEach((book) => {
          const rect = book.getBoundingClientRect();
          const bookCenter = rect.left + rect.width / 2;
          const screenCenter = window.innerWidth / 2;

          const distanceFromCenter = Math.abs(screenCenter - bookCenter);
          const maxScale = 1.1;
          const minScale = 0.8;
          const scale =
            maxScale -
            (distanceFromCenter / screenCenter) * (maxScale - minScale);

          book.style.transform = `scale(${scale})`;
        });
      }
    };

    window.addEventListener("scroll", handleScaling);
    handleScaling();

    return () => window.removeEventListener("scroll", handleScaling);
  }, [scrollPosition]);

  return (
    <div className="bg-black relative text-white">
           <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: `url(${bannerBg})` }}
              />
      <div className="container font-serif mx-auto px-5 py-10 md:py-48 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-16">
        <div className="space-y-9">
          <div className="space-y-4">
            <h4 className="font-semibold uppercase text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
              Patrick Bet-David&apos;s
            </h4>
            <h3 className="font-bold uppercase text-4xl sm:text-4xl md:text-5xl lg:text-6xl  text-red-500    ">
              Signed <br /> Collection
            </h3>
          </div>

          <button className="bg-white text-black flex items-center gap-2 py-3 px-8 rounded-xl transition-all duration-300 hover:bg-primary hover:text-white">
            <p className="font-medium">SHOP NOW</p>
            {/* <ArrowRight size={24} /> */}
          </button>

          {/* <img
            src={signature}
            alt="Patrick Bet-David's Signed Collection"
            className="w-full h-fit -ml-5"
          /> */}
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6"
            style={{
              transform: `translateX(${scrollPosition}px)`,
            }}
          >
            {books.concat(books).map((book, index) => (
              <div
                key={index}
                className="w-[300px]  rotate-z-30 h-[500px] flex-shrink-0 transition-transform duration-300 ease-out"
              >
                <img
                  src={book}
                  alt={`Patrick Bet-David's Book ${index + 1}`}
                  className="w-full rotate-z-30  h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;