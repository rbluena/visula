import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/server/prisma";
import { UserProject } from "@/types";

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body as UserProject;

  try {
    const project = await prisma.projects.create({
      data: {
        name: data.name || "",
        description: data?.description || "",
        projectStatus: "DUMMY",
      },
    });

    return res.status(201).json({
      error: false,
      statusText: "Project was created successfully!",
      data: project,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ statusText: "Failed to create project." });
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
  } catch (error) {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await POST(req, res);

    case "GET":
      return await GET(req, res);

    default:
      return res.status(405).json({
        error: {
          code: 405,
          message: "Method Not Allowed",
          suggestion: "Only POST and GET is available on this API",
        },
      });
  }
}
