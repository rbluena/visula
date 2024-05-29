import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import isEmpty from "lodash/isEmpty";
import prisma from "@/lib/server/prisma";
import type { CMSAccessTokenDetails } from "@/types";
import {
  getContentfulClient,
  convertModelToContentful,
} from "@/lib/server/contentful-api";

type CMSAccessDetails = CMSAccessTokenDetails & {
  type: "contentful" | "sanity";
};

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

// async function POST_OLD(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { schemaId, cmsType } = req.body;
//     const projectId = req.query.id as string | undefined;

//     // Check if project has contentful CMS
//     const cms = await prisma.projectSetting.findFirst({
//       where: {
//         projectId,
//       },
//       select: {
//         contentManagementSystems: true,
//       },
//     });

//     if (isEmpty(cms)) {
//       throw Error(
//         "There is no CMS authorization key was set, please add token to proceed."
//       );
//     }

//     const cmsAccessDetails = cms.contentManagementSystems.find((item) => {
//       //@ts-ignore
//       return item?.type === cmsType;
//     }) as CMSAccessDetails | undefined;

//     if (isEmpty(cmsAccessDetails)) {
//       throw Error(
//         `There is no access token for ${cmsType}, please provide the token to proceed.`
//       );
//     }

//     // Retrieving schema data for deployment.
//     const schemaData = await prisma.projectSchema.findFirst({
//       where: {
//         id: schemaId,
//         projectId,
//       },
//       select: {
//         data: true,
//       },
//     });

//     if (isEmpty(schemaData) || isEmpty(schemaData.data)) {
//       throw Error(
//         "Failed to find selected schema, please save current schema or select from history section and try again."
//       );
//     }

//     // Deployment
//     const { models, fields, relations } = schemaData.data as {
//       models: any | undefined;
//       fields: any | undefined;
//       relations: any | undefined;
//     };

//     deploySchemaToContentful({
//       models: models?.data,
//       fields: fields?.data,
//       relations: relations?.data,
//     });

//     // console.log(cmsAccessDetails);

//     // console.log(schemaData);

//     return res.status(200).json({ message: "Success" });
//   } catch (error) {
//     return res.status(error?.status || 500).json({ message: error?.message });
//   }
// }

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { cmsType, model } = req.body;
    const projectId = req.query.id as string;

    //TODO: this should be cached to avoid reading too much from the database
    const cms = await prisma.projectSetting.findFirst({
      where: {
        projectId,
      },
      select: {
        contentManagementSystems: true,
      },
    });

    if (isEmpty(cms)) {
      throw Error(
        "There is no CMS authorization key was set, please add token to proceed."
      );
    }

    const cmsAccessDetails = cms.contentManagementSystems.find((item: any) => {
      //@ts-ignore
      return item?.type === cmsType;
    }) as CMSAccessDetails | undefined;

    if (isEmpty(cmsAccessDetails)) {
      throw Error(
        `There is no access token for ${cmsType}, please provide the token to proceed.`
      );
    }

    console.log(JSON.stringify(cmsAccessDetails, null, 2));

    if (cmsAccessDetails.type === "contentful") {
      const contentfulContentType = convertModelToContentful(model);

      if (isEmpty(contentfulContentType)) {
        throw new Error(
          "Model is invalid format to be deployed to contentful."
        );
      }

      // Deployment
      const { contentType } = getContentfulClient({
        accessToken: cmsAccessDetails.accessToken,
        spaceId: cmsAccessDetails.spaceId,
        environmentId: cmsAccessDetails.environmentId,
      });

      await contentType.createWithId(
        {
          contentTypeId: model.id,
        },
        {
          ...contentfulContentType,
        }
      );

      return res
        .status(201)
        .json({ message: "Success", data: { id: model.id } });
    }

    throw new Error("Failed to create content type, please try ");
  } catch (error) {
    // Handling contentful error
    //@ts-ignore
    if (error?.message?.statusText === "Conflict") {
      //@ts-ignore
      return res.status(error.message.status).json({
        statusText: "Conflict",
        message: "Models should be delete for a chema to created.",
      });
    }
    // @ts-ignore
    return res.status(error?.status || 500).json({ message: error?.message });
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
