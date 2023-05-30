import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import prisma from "@/lib/server/prisma";

const cors = Cors({
  methods: ["POST", "HEAD"],
});

let LIMIT = 10;

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
    const projectId = req.query.id as string;

    const schema = await prisma.projectSchema.create({
      data: {
        name: data.name || new Date().toUTCString(),
        projectId,
        data: data.schema,
      },
    });

    prisma.project
      .update({
        where: {
          id: projectId,
        },
        data: {
          updatedAt: schema.createdAt,
        },
      })
      .then()
      .catch();

    return res
      .status(201)
      .json({ message: "Successfully created!", data: schema });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create." });
  }
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body as any;
    const schemaId = req.query.schemaId as string;

    const schema = await prisma.projectSchema.update({
      where: {
        id: schemaId,
      },
      data,
    });

    return res
      .status(200)
      .json({ message: "Schema details update successfully!", data: schema });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to update schema details." });
  }
}

/**
 * Get all schemas from a project
 */
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const projectId = req.query.id as string;

    const limit = parseInt((req.query.limit || LIMIT) as string, 10);
    const page = parseInt((req.query.page || 1) as string, 10);
    const skip: number = limit * (page - 1);

    const allSchemas = await prisma.projectSchema.findMany({
      skip,
      take: limit,
      where: {
        projectId,
      },
      orderBy: [{ createdAt: "asc" }],
    });

    let schemaIds: string[] = [];

    const mappedData = allSchemas.reduceRight((acc, curr) => {
      schemaIds.push(curr.id);
      acc[curr.id] = curr;

      return acc;
    }, {} as any);

    return res.status(200).json({
      message: "Data retrieved successfully.",
      data: {
        schemaIds,
        data: mappedData,
        meta: { pagination: { page, limit }, hasMore: true },
      },
    });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create data." });
  }
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const projectId = req.query.id as string;
    const schemaId = req.query.schemaId as string;

    // TODO: Check if the project belongs to current user

    const deletedIds = await prisma.projectSchema.deleteMany({
      where: {
        id: schemaId,
      },
    });

    return res
      .status(200)
      .json({ message: "Deleted successfully!", data: deletedIds });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create data." });
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

    case "GET":
      return await GET(req, res);

    case "PUT":
      return await PUT(req, res);

    case "DELETE":
      return await DELETE(req, res);

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
