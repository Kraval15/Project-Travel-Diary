import "../styles/globals.css";
import Nav from "@components/Nav";

import Provider from "@components/Provider";
//allows us to create links for the navbar to move between routes
import Link from "next/link";
export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className="bg-slate-500">
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />

          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
