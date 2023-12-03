import Feed from "@components/Feed";
import CityNav from "@components/CityNav";
const Home = () => {
  return (
    // flex-col means the elements will fall one below another
    <section className="w-full flex flex-center flex-col">
      {/* head_text is from the globals.css file, anything with _ is from the css file */}
      <h1 className="head_text text-center">
        The Pursuit of Happiness and Adventure
        <br />
        <span className="text-amber-400 text-center">
          Explore. Dream. Discover.
        </span>
      </h1>
      <p className="desc text-center">
        Travel is one of my passions. Coding is another. In 2023, I combined the
        two and travelled the world while learning to code. Explore pictures of
        my travel journey below.
      </p>
      <div className="mt-5">
        <CityNav />
      </div>
      <h2 className="font-sans text-4xl text-amber-400 text-center">
        What Others Have Said!
      </h2>
      <Feed />
    </section>
  );
};

export default Home;
