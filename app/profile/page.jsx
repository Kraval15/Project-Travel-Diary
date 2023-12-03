"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

//when we go to "/profile", the profile page is rendered through the below
const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  //initial state for posts is empty and then useEffect is used on everu render when the session
  //updates for example when a new user logs in to populate with info
  const [myPosts, setMyPosts] = useState([]);

  //used when session updates which happens when a user logs in and then based on that calls api
  //to get all posts associated with the user and updates the state of myPosts with this data
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  //if user clicks the edit button then redirects them to the url with the edit form
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  //if user clicks delete button, it asks them to confirm that they want to delete the post and if so
  //then has a delete request to the api /api/prompt/[id]
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        //updates the state of posts to remove the post in the state that the user wanted to delete.
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //component where we pass name, desc, myPosts which are the users posts, handle edit and handle delete
  //functions so the promptcards can be made for the profile page
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional thoughts and inspire others!"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
