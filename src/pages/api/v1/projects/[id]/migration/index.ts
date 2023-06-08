import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { isEmpty } from "lodash";
import prisma from "@/lib/server/prisma";
import { createMigrationCode } from "@/lib/server/migrations/contentful";

const cors = Cors({
  methods: ["POST", "HEAD"],
});

type ApiResponseFormat = {
  error: {
    message: string;
    statusText?: string;
    status: number;
  } | null;
  err: boolean;
  data?: any;
};

type NextApiResponseWithError = NextApiResponse<ApiResponseFormat>;

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponseWithError,
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

async function POST(req: NextApiRequest, res: NextApiResponseWithError) {
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
        err: true,
        error: {
          status: 400,
          message:
            "Schema can't be found, please select or save a schema and try again.",
        },
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
      .json({ err: false, error: null, data: migrationCode });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        err: true,
        error: {
          message: error.message,
          status: 500,
        },
      });
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithError
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case "POST":
      return await POST(req, res);

    default:
      return res.status(405).json({
        err: true,
        error: {
          status: 405,
          statusText: "MethodNotAllowed",
          message: "Only POST are available on this API",
        },
      });
  }
}
