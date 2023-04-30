import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { isEmpty } from "lodash";
import {
  getContentfulClient,
  deploySchemaToContentful,
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

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data: { models: any; relations: any } = req.body;
  let responseData = null;
  const { contentType } = getContentfulClient();

  try {
    if (!isEmpty(data)) {
      const requestPayload = deploySchemaToContentful(
        data.models,
        data.relations
      ).map((item) =>
        contentType.createWithId(item.apiClientParams, item.model)
      );

      responseData = await Promise.all(requestPayload);
    }

    return res.status(201).json({
      code: 201,
      error: false,
      message: "Models were created successfully!",
      data: responseData,
    });
  } catch (error) {
    if (error?.status) {
      return res.status(error.status).json({
        error: true,
        statusText: error.statusText,
        message: error.message || "Failed to complete your request",
        data: null,
      });
    }

    return res.status(400).json({
      error: true,
      statusText: "Invalid request",
      message: "Failed to complete this request",
      data: null,
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case "POST":
      return await POST(req, res);

    default:
      return res.status(405).json({
        error: {
          code: 405,
          message: "Method Not Allowed",
          suggestion: "Only POST and GET are available on this API",
        },
      });
  }
}
