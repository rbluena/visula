import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import prisma from "@/lib/server/prisma";
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

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const {
    data,
    contentManagementSystem,
  }: { contentManagementSystem: any; data: any } = req.body;

  try {
    if (!isEmpty(contentManagementSystem)) {
      const project = await prisma.project.update({
        where: {
          id: req.query.id as string,
        },
        data: {
          name: data.name,
          description: data.description,
          projectSetting: {
            upsert: {
              create: {
                contentManagementSystem: JSON.stringify(
                  contentManagementSystem
                ),
              },
              update: {
                contentManagementSystem: JSON.stringify(
                  contentManagementSystem
                ),
              },
            },
          },
        },
        include: {
          projectSetting: true,
        },
      });

      return res.status(200).json({
        code: 200,
        error: false,
        message: "",
        data: project,
      });
    }

    const project = await prisma.project.update({
      where: {
        id: req.query.id as string,
      },
      data: {
        name: data.name,
        description: data.description,
      },
      include: {
        projectSetting: true,
      },
    });

    return res.status(200).json({
      code: 200,
      error: false,
      message: "",
      data: project,
    });
  } catch (error) {
    return res.status(400).json({ message: "Error occured!" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case "PUT":
      return await PUT(req, res);

    default:
      return res.status(405).json({
        error: {
          code: 405,
          message: "Method Not Allowed",
          suggestion: "Only PUT and GET is available on this API",
        },
      });
  }
}
