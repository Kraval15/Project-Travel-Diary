import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    //if it fails then the messagee email already exists gets sent
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    //pattern that the username has to follow for it to be valid
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

//the models object imported from mongoose is provided by the Mongoose library and stores all the registred
//models.
//If a model name "User" already exists in the models object, it assigns that existing model to the
//"User" variable
//This prevents redefining the model and ensures that the existing model is reused
//If a model name "User" does not exist in the models object, the model function from Mongoose is called
//to create a new model
//The newly created model is then assigned to the "User" variable.
//So if it was a refular express app like yelpcamp, we wouldn't need models.user like we have below
//as the server is always running but for NextJs we only run the database server wehn required so we check
//if a User model is already saved previously and if so then use that otherwise create a new model
const User = models.User || model("User", UserSchema);

export default User;
