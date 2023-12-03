//our prompt model where we will save the data for prompts that the user submits
import Prompt from "@models/prompt";
//connect to db file we made in our utils folder to connect to our mongodb
import { connectToDB } from "@utils/database";

//to create our route we need to export the POST route in this case as we want to use the POST route
//to add the create post information the user enters and save it to our mongoDB database
export const POST = async (req, res) => {
  //deconstruct the data. The post request is sent from our page.jsx file in create-prompt section when the
  //user writes the detail and submits create post. The submittion calls a function in page.jsx which makes
  //a Post request api call to the Post request in this file.
  const { userId, prompt, tag } = await req.json();

  //connect to DB and save the data from the user about their post and return success or failure based
  //on if the data saves to the database successfully or not.
  try {
    //connection to DB is a lambda function meaning its needs to connect everytime we use it as after its done
    //using the database such as to save data to the D, the connection is closed. So unlike our yelpcamp express
    //app where the mongoDB was always running, in NextJs the DB is only ran when needed and closes after done using
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
