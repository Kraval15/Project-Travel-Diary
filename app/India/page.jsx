"use client";

import Image from "next/image";
import Feed from "@components/Feed";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { imagesIndia } from "@/lib/images";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Page() {
  return (
    <section>
      <div className="container">
        <Swiper
          navigation
          pagination={{ type: "fraction" }}
          modules={[Navigation, Pagination]}
          onSwiper={(swiper) => console.log(swiper)}
          className="h-96 w-1/2 rounded-lg bg-slate-200"
        >
          {imagesIndia.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="block h-full w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <Feed />
      </div>
    </section>
  );
}
