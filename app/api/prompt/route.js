import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//fetch all prompts currently in the database. aLso since the user database and the prompts database
//are linked in a one to many relationship, we can use the .populate to reveal the creator name as well
export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
