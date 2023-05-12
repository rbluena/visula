import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import isEmpty from "lodash/isEmpty";
import { createMigrationCode } from "@/lib/server/migrations/contentful";

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

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data: { models: any; relations: any } = req.body;
  let migrationCode = "";

  if (!isEmpty(data)) {
    // Transform models and relations into migration code.
    // Check if we are creating migrations or updating existing one.
    migrationCode = createMigrationCode(data.models, data.relations);
  }

  return res.status(201).json({
    code: 201,
    error: false,
    message: "Migration was created successfully",
    data: migrationCode,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case "PUT":
      return await POST(req, res);

    default:
      return res.status(405).json({
        error: {
          code: 405,
          message: "Method Not Allowed",
          suggestion: "Only POST is available on this API",
        },
      });
  }
}
