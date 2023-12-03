//since we will be using react hooks for this file we need to say use client
"use client";
//allows us to create links for the navbar to move between routes
import Link from "next/link";
//allows us to optimize the images
import Image from "next/image";

import { useState, useEffect } from "react";
//things from next-auth needed to help us with our sign in functionality
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  //providers are the ways to can login so we can have google auth, twitter, github, etc as our providers for login. We can
  //have multiple providers like when we see on websites that have multiple types of logins. initial state we set to null.
  const [providers, setProviders] = useState(null);

  //state to keep track of toggle. If toggle icon for dropdown menu is clicked then toggle is set to true and menu dropsdown
  //and opposite if menu icon is clicked when menu is already dropped down. This is only on smaller screens as seen in code
  //below when rendering isMobile version of site
  const [toggleDropdown, setToggleDropdown] = useState(false);

  //gets called on the first render and then we use an async function to use getProviders method that we imported from
  //next-auth above to save all providers we have set up using next auth. In this program we will only set up google auth
  //but we could have set up multiple providers and then set them as state in our porviders variable using setProviders below.
  useEffect(() => {
    const setUpProviders = async () => {
      //the response will be an object
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Travel Logo"
          width={50}
          height={50}
          className="object-contain"
        />
        {/* logo_text is from globals.css and one of the things it has is to hide the text on small devices */}
        <p className="logo_text"> Kuldeep's Travel Diary</p>
      </Link>

      {/* Desktop Navigation, the below div is hidden on small screens*/}
      <div className="sm:flex hidden">
        {/* when user is logged in we show certain items such as create post button. So check in session is a user exists and if so then
        proceed with code further */}

        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Leave Comment
            </Link>
            {/* sign out button only shows when user is logged in and calls the signout function when button from next auth is clicked */}
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            {/* profile pic image when logged in that when clicked goes to thee /profile page */}
            <Link href="/profile">
              <Image
                // gets image from user model which required each user data to have an image and then shows that iamge on webpage
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          // if user is not logged in then does the below code
          // to sign in we need to have access to providers for next auth and we will be using google auth as our provider so we
          //need to set that up
          <>
            {/* checks if providers exists which we set up using setProviders in above code and if so then maps over providers
          and displays a button for each of the providers. In our cause only google auth but if we had multiple providers such as twitter
          or github, the buttons for those would be displayed as well */}
            {providers &&
              //providers state will be an object so .values can be used to iterate over objects. Thr values helps create an array
              //from the object and then we can use map to map over each item in the array. The values gets each of the value fromm
              //the key value pair and stores it in the array. So if it was tom: jerry as the key value pair, .values would store
              //jerry as the value in the array
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  //   sign in is imported from next-auth and provider.id would be "google" when it maps
                  //through the google provider through out object.values and then map of the array above.
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation . Tailwind is mobile first so sm is 576px and above and the below div will hidden*/}
      <div className="sm:hidden flex relative">
        {/* checks if user is logged in and if so then creates an image that will be used as the dropdown menu when clicked. 
        So check in session is a user exists and if so then proceed with code further */}
        {session?.user ? (
          <div className="flex">
            <Image
              // gets image from user model which required each user data to have an image and then shows that image on webpage
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              //onClick of downdropmenu icon, updates the state so when clicked if menu is not already droppeddown then it dropsdown
              //and viceversa if menu is already dropped down
              onClick={() =>
                setToggleDropdown((toggleDropdown) => !toggleDropdown)
              }
            />
            {/* if toggledropdown is true then the below code executes*/}
            {toggleDropdown && (
              // creates a dropdown menu with the below links
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  //once clicked it goes to the href and also the menu is toggled back up
                  onClick={() =>
                    setToggleDropdown((toggleDropdown) => !toggleDropdown)
                  }
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  //once clicked it goes to the href and also the menu is toggled back up
                  onClick={() =>
                    setToggleDropdown((toggleDropdown) => !toggleDropdown)
                  }
                >
                  Create Comment
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown((toggleDropdown) => !toggleDropdown);
                    // sign out is imported from next-auth
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          //   if user is not logged in then does the below code
          <>
            {/* checks if providers exists which we set up using setProviders in above code and if so then maps over providers
          and displays a button for each of the providers. In our cause only google auth but if we had multiple providers such as twitter
          or github, the buttons for those would be displayed as well */}
            {providers &&
              //providers state will be an object so .values can be used to iterate over objects. Thr values helps create an array
              //from the object and then we can use map to map over each item in the array. The values gets each of the value fromm
              //the key value pair and stores it in the array. So if it was tom: jerry as the key value pair, .values would store
              //jerry as the value in the array
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  //   sign in is imported from next-auth
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
