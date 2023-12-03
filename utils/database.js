import mongoose from "mongoose";

let isConnected = false; // track the connection
//connection to DB is a lambda function meaning its needs to connect everytime we use it as after its done
//using the database such as to save data to the D, the connection is closed. So unlike our yelpcamp express
//app where the mongoDB was always running, in NextJs the DB is only ran when needed and closes after done using
export const connectToDB = async () => {
  //sets some mongoose options so we don't get random messages in the console
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    //URI is URI of our mongoDB atlas instance as we are storing the data on mongoDB atlas online so
    //we get the URI info from our online account similar to what we did in our old yelpcamp file to
    //connect to dtabase but here we will await this as we are exporting the connectToDB function to
    //use in our route.js file. Also unlike in express yelpcamp app, where the server mongodb connection
    //was always running, here we will only run the database connection when we need it (see route.js
    //file comments for more info) so we create a connectToDB function in this file and export it and
    //call it in the route.js file whenever we need to access the databse
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //if connected then this variable gets set to true
    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
