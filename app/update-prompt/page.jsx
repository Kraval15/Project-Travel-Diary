"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  //gets the id from the params of the url
  const promptId = searchParams.get("id");

  //creates an instance of the post as an empty post
  const [post, setPost] = useState({ prompt: "", tag: "" });
  //to change the state of submit so in order to display the submit or submitting button
  const [submitting, setIsSubmitting] = useState(false);

  //everytime promptID is updated this useEffect is called
  useEffect(() => {
    //calls the api to get each prompt for the user and stores it in response
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      //updates the state of post with the data we obtained from the api about the post
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    //checks if there is indeed a promptid and if there is then run the getPromptDetails method
    if (promptId) getPromptDetails();
  }, [promptId]);

  //once the user clicks submit on the edit form the below method is called.
  const updatePrompt = async (e) => {
    //stops the default submit which would refresh the webpage
    e.preventDefault();
    //changes the state of isSubmitting to true so then it cahnges the submit button from submit to
    //submitting and disables the button until submitting is completed
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    //takes the data that the user submitted in the edit form and updates the database on the backend
    //to reflect this information
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      //if the response was successful meaning a status from range 200-299 was returned then we
      //redirect the user to the main page
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      // once submitting is compelted we change isSubmitting to false and this changes the button back
      //to submit instead a disabled submitting button
    } finally {
      setIsSubmitting(false);
    }
  };
  //sends the post info, setPost, submitting variable and updatePrompt method to the Form component
  return (
    <Form
      type="Edit"
      // initially fetched information of the post based on the post ID through a get request in the
      //useEffect
      post={post}
      setPost={setPost}
      submitting={submitting}
      //method used to update the backend database after the form with the edited information is submitted
      //by the user
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
