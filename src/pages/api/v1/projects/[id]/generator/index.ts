import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { faker } from "@faker-js/faker";
import isEmpty from "lodash/isEmpty";

type ApiResponseFormat = {
  error: {
    message: string;
    statusText?: string;
    status: number;
  } | null;
  err: boolean;
  data: { data: any; message: string } | null;
};

type NextApiResponseWithFormat = NextApiResponse<ApiResponseFormat>;

const cors = Cors({
  methods: ["POST", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponseWithFormat,
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

/**
 *
 * @param req
 * @param res
 * @returns
 */
async function POST(req: NextApiRequest, res: NextApiResponseWithFormat) {
  try {
    // const { modelId, schemaId, totalCount, data } = req.body;
    const { totalCount, data } = req.body;

    if (isEmpty(data)) {
      return res.status(400).json({
        err: true,
        error: {
          status: 400,
          statusText: "InvalidRequest",
          message:
            "Dummy data for the schema can't be generated. Please make sure all fields are filled properly.",
        },
        data: null,
      });
    }

    if (totalCount > 25) {
      return res.status(400).json({
        err: false,
        error: {
          status: 400,
          statusText: "InvalidRequest",
          message:
            "With current subscription you can't generate more than 25 dummy content",
        },
        data: null,
      });
    }

    const generatedData = Array.from({ length: totalCount }, function () {
      return Object.keys(data).reduce((acc, next) => {
        const item = data[next] as { label: string; value: string };
        const [firstKey, secondKey] = item.value?.split(".");

        let fakerFn =
          // @ts-ignore
          secondKey?.length > 0 ? faker[firstKey][secondKey] : faker[firstKey];

        // @ts-ignore
        acc[next] = fakerFn?.();

        return acc;
      }, {});
    });

    if (!generatedData) {
      return res.status(404).json({
        err: true,
        error: {
          status: 404,
          statusText: "NotFound",
          message:
            "Dummy data for the schema can't be generated. Please make sure all fields are filled properly.",
        },
        data: null,
      });
    }

    return res.status(201).json({
      err: false,
      error: null,
      data: {
        data: generatedData,
        message: "Data has been generated successfully!",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        err: true,
        error: {
          message: error.message,
          status: 500,
        },
        data: null,
      });
    }

    return res.status(500).json({
      err: true,
      error: {
        status: 500,
        message:
          "We couldn't be able to complete your request. We are checking the problem and fixing right away.",
      },
      data: null,
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithFormat
) {
  await runMiddleware(req, res, cors);

  // TODO: Run middle to check if user is the owner of the project.

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
        data: null,
      });
  }
}
