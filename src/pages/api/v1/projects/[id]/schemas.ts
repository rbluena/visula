import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import prisma from "@/lib/server/prisma";

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
  try {
    const data = req.body as { name?: string; schema: any };

    // TODO: Check user is the owner of the project.

    console.log(data);

    const schema = await prisma.projectSchema.create({
      data: {
        name: data.name || "",
        projectId: req.query.id as string,
        checksum: JSON.stringify(data.schema),
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return res
      .status(201)
      .json({ message: "Successfully created!", data: schema });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create." });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case "POST":
      return await POST(req, res);

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
