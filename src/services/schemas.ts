import { SchemaData } from "@/types";

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

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const results = await response.json();

  return results.data;
}
/**
 *
 * @param projectId
 * @returns
 */
export async function getAllShemasService(
  projectId: string,
  pagination: any = {}
) {
  const response = await fetch(
    `/api/v1/projects/${projectId}/schemas?${new URLSearchParams(pagination)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

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

/**
 *
 * @param projectId
 * @param ids
 */
export async function deleteSchemaHistoryService(
  projectId: string,
  schemaId: string
) {
  const response = await fetch(
    `/api/v1/projects/${projectId}/schemas?${new URLSearchParams({
      schemaId,
    })}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const results = await response.json();

  return results.data;
}

/**
 *
 * @param projectId
 * @param schemaId
 * @param data
 * @returns
 */
export async function updateSchemaDetailsService(
  projectId: string,
  schemaId: string,
  data: any
) {
  const response = await fetch(
    `/api/v1/projects/${projectId}/schemas?${new URLSearchParams({
      schemaId,
    })}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const results = await response.json();

  return results.data as SchemaData;
}

/**
 *
 * @param projectId
 * @param schemaId
 * @returns
 */
export async function deploySchemaService(
  projectId: string,
  data: { schemaId: string; cmsType: "contentful" | "sanity" }
) {
  const response = await fetch(`/api/v1/projects/${projectId}/deploy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const results = await response.json();

  return results.data;
}

export async function generateMigrationCodeService(
  projectId: string,
  data: { schemaId: string; cmsType: "contentful" | "sanity" }
) {
  const response = await fetch(`/api/v1/projects/${projectId}/migration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const results = await response.json();

  return results.data;
}
