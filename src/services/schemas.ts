/**
 * This always create new history of a schema,
 * but without tagname.
 */
export async function saveSchemaHistoryService(
  projectId: string,
  payload: {
    name?: string;
    versionDescription?: string;
    tag?: string;
    schema: { models?: any; fields?: any; relations?: any };
  }
) {
  const response = await fetch(`/api/v1/projects/${projectId}/schemas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const results = await response.json();

  return results.data;
}

/**
 * Tools to use
 *
 * https://www.npmjs.com/package/mnemonist
 * https://graphology.github.io/
 * https://www.sigmajs.org/
 *
 * @param projectId
 * @param sourceSchemaId
 * @param targetSchemaId
 * @returns
 */
export async function compareSchemaDiffService(
  projectId: string,
  sourceSchemaId: string,
  targetSchemaId: string
) {
  const response = await fetch(`/api/v1/projects/${projectId}/schemas/diffs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sourceSchemaId, targetSchemaId }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const results = await response.json();

  return results.data;
}
