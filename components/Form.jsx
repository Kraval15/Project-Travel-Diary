import Link from "next/link";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
//takes in the below props from the update-prompt page.jsx file
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  //will use session to check later on in code if user is logged in then only allow to stay on this
  //page to create post otherwise if user is not logged in then redirect to main page as user can't
  //create post if they are not logged in
  const { data: session } = useSession();
  const router = useRouter();
  // renders a form with the old information about the post that the user can then edit as required
  //and submit
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Comment</span>
      </h1>
      <p className="desc text-left max-w-md">
        Please leave a comment on your thoughts on my travels! If you have any
        suggestions or travel stories as well, I would love to hear them!
      </p>
      {/* once submitted handlesubmit which is a method from the update-prompt page will be called
which will help update the backend database with the edited data */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Comment
          </span>
          {/* setPost is used to update the form field on the webpage based on if there is change in the form */}
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your comment here"
            required
            className="form_textarea "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag the Country{" "}
            <span className="font-normal">
              (Germany, Australia, Italy, Portugal, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="Country"
            required
            className="form_input"
          />
        </label>
        {/* if cancel is clicked, it redirects back to the main page */}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            // if submitting is true then the button is disabled so it cannot be submitted
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {/* if submitting is true then button will say creating otherwise button will say create */}
            {submitting ? `Creating...` : type}
          </button>
        </div>
      </form>
      )
    </section>
  );
};

export default Form;
