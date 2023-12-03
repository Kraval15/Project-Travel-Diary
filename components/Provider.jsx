"use client";
//this is a parent component that we will be wrapping some child components around. We will be wrapping this Provider that we expoer
//from here in layout as we want it over all our components

//from nextAuth, using session provider allows instances of useSession which we have used in some of our
//routes such as the profile page to share the session object across components. It also takes care of
//keeping the session updated and synced between tabs/windows.
import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
  //session prover always needs to be at the top level of the application and must be across every page
  //and that is why we have all the children under sessionprovider and then this Provider file will be
  //referenced in the main layout.jsx file
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default Provider;
