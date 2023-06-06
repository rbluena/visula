import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { faker } from "@faker-js/faker";
import isEmpty from "lodash/isEmpty";

const cors = Cors({
  methods: ["POST", "HEAD"],
});

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

/**
 *
 * @param req
 * @param res
 * @returns
 */
async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { modelId, schemaId, totalCount, data } = req.body;

    if (isEmpty(data)) {
      return res.status(400).json({
        statusText: "InvalidRequest",
        message: "No fields selected, please select a model and its fields.",
      });
    }

    if (totalCount > 25) {
      return res
        .status(400)
        .json({ statusText: "InvalidRequest", message: "" });
    }

    const generatedData = Array.from({ length: totalCount }, function () {
      return Object.keys(data).reduce((acc, next) => {
        const item = data[next] as { label: string; value: string };
        const [firstKey, secondKey] = item.value?.split(".");

        let fakerFn =
          // @ts-ignore
          secondKey?.length > 0 ? faker[firstKey][secondKey] : faker[firstKey];

        // @ts-ignore
        acc[next] = fakerFn?.();

        return acc;
      }, {});
    });

    if (!generatedData) {
      return res.status(400).json({
        statusText: "",
        message: "Error message...",
      });
    }

    return res
      .status(201)
      .json({ statusText: "Success", message: "", data: generatedData });
  } catch (error) {
    return res.status(500).json({
      message:
        "We couldn't be able to complete your request. We are checking the problem and fixing right away.",
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  // TODO: Run middle to check if user is the owner of the project.

  switch (req.method) {
    case "POST":
      return await POST(req, res);

    default:
      return res.status(500).json({
        error: {
          code: 500,
          error: true,
          statusText: "MethodNotAllowed",
          message: "Only PUT and GET is available on this API",
        },
      });
  }
}
