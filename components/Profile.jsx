import PromptCard from "./PromptCard";

//takes in name, desc and data as props from feed main page and profile main page and then takes in
//handleEdit and handleDelete only from profile main page because only on the profile page promptcards
//do we have the edit and delete button for each post
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {/* creates the promptcard by passing in the post and then also the handleEdit and handleDelte
if they exist and they would only exist on the profile page prompts as only the prompt cards on the
profile page have the edit and delete buttons */}
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
