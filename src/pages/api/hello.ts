import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
// import OS from "node:os";
import {
  getContentfulClient,
  spaceId,
  environmentId,
  // accessToken,
  // getContenfulMigration,
} from "@/lib/server/contentful-api";
// import { MigrationFunction, runMigration } from "contentful-migration";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Run the middleware
    await runMiddleware(req, res, cors);

    // const response = await runMigration({
    //   migrationFunction: (migration) => {
    //     console.log("Context: ", OS.platform());

    //     const blogType = migration
    //       .createContentType("blog")
    //       .name("Blog post")
    //       .description("Wonderful content type for a blog!");

    //     blogType
    //       .createField("title", {
    //         type: "Symbol",
    //         localized: true,
    //         required: false,
    //       })
    //       .required(false)
    //       .validations([{ unique: true }, { size: { min: 0, max: 9 } }]);
    //   },
    //   spaceId,
    //   environmentId,
    //   accessToken,
    //   yes: true,
    //   retryLimit: 5,
    // });

    // console.log(response);

    // await getContenfulMigration((migration, context) => {
    //   const blogType = migration
    //     .createContentType("blog")
    //     .name("Blog post")
    //     .description("Wonderful content type for a blog!");

    //   blogType.createField("title", {
    //     type: "Symbol",
    //     required: true,
    //     localized: false,
    //     validations: [],
    //   });
    // });

    const { contentType } = await getContentfulClient();

    const response = await contentType.createWithId(
      {
        contentTypeId: "blogpost",
        environmentId,
        spaceId,
      },
      {
        name: "Blog post",
        fields: [
          {
            id: "title",
            name: "Title",
            required: true,
            localized: false,
            type: "Text",
          },
        ],
      }
    );

    res.json(response);
    res.status(202).json({ message: "Success" });
  } catch (error) {
    res.status(404).json({ message: "Error occured" });
  }
}
