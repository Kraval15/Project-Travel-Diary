import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//called when the session updates so for example when a new user logs in. then all the posts for that
//user are gathered from the database using the GET request in this file
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
