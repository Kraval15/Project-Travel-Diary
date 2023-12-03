//since we will be using react hooks for this file we need to say use client
"use client";
//allows us to create links for the navbar to move between routes
import Link from "next/link";
//allows us to optimize the images
import Image from "next/image";

import { useState, useEffect } from "react";

const CityNav = () => {
  //state to keep track of toggle. If toggle icon for dropdown menu is clicked then toggle is set to true and menu dropsdown
  //and opposite if menu icon is clicked when menu is already dropped down. This is only on smaller screens as seen in code
  //below when rendering isMobile version of site
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <div className="flex flex-wrap gap-8 text-center justify-evenly sm:justify-between">
        <Link href="/Britain" className="black_btn">
          Britain
        </Link>

        <Link href="/Dubai" className="black_btn">
          Dubai
        </Link>

        <Link href="/France" className="black_btn">
          France
        </Link>

        <Link href="/Italy" className="black_btn">
          Italy
        </Link>

        <Link href="/Swiss" className="black_btn">
          Switzerland
        </Link>

        <Link href="/Poland" className="black_btn">
          Poland
        </Link>

        <Link href="/Slovakia" className="black_btn">
          Slovakia
        </Link>

        <Link href="/Austria" className="black_btn">
          Austria
        </Link>

        <Link href="/Hungary" className="black_btn">
          Hungary
        </Link>

        <Link href="/Czech" className="black_btn">
          Czech Republic
        </Link>

        <Link href="/Portugal" className="black_btn">
          Portugal
        </Link>

        <Link href="/Netherlands" className="black_btn">
          Netherlands
        </Link>

        <Link href="/Germany" className="black_btn">
          Germany
        </Link>

        <Link href="/Spain" className="black_btn">
          Spain
        </Link>

        <Link href="/India" className="black_btn">
          India
        </Link>

        <Link href="/Australia" className="black_btn">
          Australia
        </Link>

        <Link href="/US" className="black_btn">
          United States
        </Link>
      </div>
    </nav>
  );
};

export default CityNav;
