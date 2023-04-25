import { createClient } from "contentful-management";
import { MigrationFunction, runMigration } from "contentful-migration";

export const spaceId = "bxxkqpw2bm2i";
export const environmentId = "dev";
export const accessToken = "CFPAT-6mxbx5vJv4bjpVPgeihcZ6dY74ab1tZKFcN5JHzX3EY";

export async function getContentfulClient() {
  const plainClient = createClient(
    {
      accessToken,
    },
    { type: "plain" }
  );

  // await plainClient.environment.get({
  //   spaceId,
  //   environmentId,
  // });

  return {
    entryClient: plainClient.entry,
    contentType: plainClient.contentType,
  };
}

export async function getContenfulMigration(
  migrationFunction: MigrationFunction
) {
  return runMigration({
    migrationFunction,
    filePath: "",
    spaceId,
    accessToken,
    environmentId,
  });
}
