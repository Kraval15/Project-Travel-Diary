import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  // creating one to many relationship with our user model and prompt so one user can create many prompts
  //they are linked by the objectIds
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

//the models object imported from mongoose is provided by the Mongoose library and stores all the registred
//models.
//If a model name "Prompt" already exists in the models object, it assigns that existing model to the
//"Prompt" variable
//This prevents redefining the model and ensures that the existing model is reused
//If a model name "Prompt" does not exist in the models object, the model function from Mongoose is called
//to create a new model
//The newly created model is then assigned to the "Prompt" variable.
//So if it was a regular express app like yelpcamp, we wouldn't need models.Prompt like we have below
//as the server is always running but for NextJs we only run the database server wehn required so we check
//if a Prompt model is already saved previously and if so then use that otherwise create a new model
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
