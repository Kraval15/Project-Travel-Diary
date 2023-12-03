"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
//usePathName helps you read the current URLs pathname and useRouter helps you use router.push to go
//to different routes
import { usePathname, useRouter } from "next/navigation";

//displays the prompt card in the main feed section at "/" and promt cards in my profile section as well
const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  //see comment above on useRouter and usePathname
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    //checks if creator id of post is same as the creator id of user currently logged in creator id
    //and if so then takes theuser to their profile page and if not then it uses another URL to go to/
    //the profile of the user that was clicked
    if (post.creator._id === session?.user.id) {
      return router.push("/profile");
    }

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  //Helps add copying functionality to the each prompt so when icon is clicked, it copies the post to clip
  //clipboard and then changes the icon from clipboard to copied icon.
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };
  //helps create the layout for the promptcard where if the profile is clicked it goes to the users profile
  //on the promtpcard it displays the profile pic, username, email and their text
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        {/* checks if there is post.prompt as state of copied and if so then displays the tick icon and 
if copied state is not post.prompt then it displays the copy icon */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      {/* checks if there is a tag and if so then calls the handletagclick function using the content
      of the tag that was clicked */}
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {/* displays the edit and delete button on the prompt card only if the user is logged in and on their
myprofile page */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm text-green-700 cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm text-red-500 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
