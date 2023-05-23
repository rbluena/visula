import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import prisma from "@/lib/server/prisma";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
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

  try {
    // Check if project has contentful CMS
    const cms = await prisma.projectSetting.findFirstOrThrow({
      where: {
        projectId,
      },
      select: {
        contentManagementSystems: true,
      },
    });

    if (!cms) {
      throw new Error("");
    }

    console.log(cms);

    const schemaData = await prisma.projectSchema.findFirstOrThrow({
      where: {
        id: schemaId,
      },
      select: {
        data: true,
      },
    });

    console.log(schemaData);

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
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
