import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { isEmpty } from "lodash";
import prisma from "@/lib/server/prisma";
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
  const { schemaId } = req.body;
  const projectId = req.query.id as string | undefined;

  // TODO: Check if project is owned by current user

  try {
    const schemaData = await prisma.projectSchema.findFirst({
      where: {
        id: schemaId,
        projectId,
      },
      select: {
        data: true,
      },
    });

    if (isEmpty(schemaData?.data)) {
      return res.status(400).json({
        statusText: "NotFound",
        message:
          "Schema can't be found, please select or save a schema and try again.",
      });
    }

    //@ts-ignore
    const models = schemaData?.data?.models?.data;
    // @ts-ignore
    const fields = schemaData?.data?.fields?.data;
    // @ts-ignore
    const relations = schemaData?.data?.relations?.data;

    const migrationCode = createMigrationCode(models, fields, relations);

    return res
      .status(200)
      .json({ statusText: "Success", message: "Success", data: migrationCode });
  } catch (error) {
    return res.status(500).json({
      statusText: "InternalServerError",
      message:
        "Failed to process the request, please bear with us we are working on it.",
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
          suggestion: "Only POST are available on this API",
        },
      });
  }
}
