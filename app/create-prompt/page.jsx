"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
//allows you to programatically change routes inside client components by using router.push as seen in code below
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  //allows you to programatically change routes inside client components by using router.push as seen in code below
  const router = useRouter();
  //get access to any data stored in the session
  const { data: session } = useSession();

  //below is passed to Form.jsx and it is used to change the button from submit to submitting when we render
  //the form so when user clicks submit, the button will change to submitting so user has an idea the submit worked
  //and then once submit is completed then button will change back to submit
  const [submitting, setIsSubmitting] = useState(false);
  //creating an initial post with empty prompt and tag which we will update from our Form component
  const [post, setPost] = useState({ prompt: "", tag: "" });

  //function that will be used in Form.jsx when we pass it through this file to Form.jsx. We are passing the function
  //to the child component Form.jsx so we can have access to the data from the child in this file which we will use
  //to update database
  const createPrompt = async (e) => {
    //prevents page from submitting and refreshing when the create button is pressed in the form
    e.preventDefault();
    //changes state to true so in Form.jsx, there is a check that when isSubmitting is true, the button
    //will show submitting instead of submit
    setIsSubmitting(true);

    try {
      //based on the data that the user enters, an api call is made as a post request to the api we made
      //in the path specified. This api will attempt to save the data user submitted to database and return
      //success or error depending on the outcome
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      //response.ok checks the status code that was received from our api call that we stored in response above. ok menas
      //a status code in the 200-299 range which means the api call was successful
      if (response.ok) {
        //we imported useRouter so we can use router.push to navigate to / page if our api call was successful
        return router.push("/");
      }
    } catch (error) {
      console.log(error);
      //at the end no matter if it was successful or an error, isSubmitting is changed to false so the button
      //changes to submit instead of submitting
    } finally {
      setIsSubmitting(false);
    }
  };

  //we pass on the below variables and function to Form.jsx
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
