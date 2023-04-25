import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import {
  getContentfulClient,
  spaceId,
  environmentId,
} from "@/lib/server/contentful-api";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Run the middleware
    await runMiddleware(req, res, cors);

    const { contentType } = await getContentfulClient();

    const response = await contentType.createWithId(
      {
        contentTypeId: "blogpost",
        environmentId,
        spaceId,
      },
      {
        name: "Blog post",
        fields: [
          {
            id: "title",
            name: "Title",
            required: true,
            localized: false,
            type: "Text",
          },
        ],
      }
    );

    res.status(202).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error occured" });
  }
}
