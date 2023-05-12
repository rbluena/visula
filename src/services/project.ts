import { UserProject } from "@/types";

/**
 *
 * @param data
 */
export async function initilizeProjectService(data: any) {
  const response = await fetch("/api/v1/projects", {
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
  return results.data as UserProject;
}

/**
 *
 * @param id
 */
export async function getProjectService(id: string) {
  const response = await fetch(`/projects/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const results = await response.json();

  return results.data as UserProject;
}

export async function updateProjectService(
  projectId: string,
  data: any,
  contentManagementSystem: any = null
) {
  const response = await fetch(`/api/v1/projects/${projectId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
      contentManagementSystem,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const results = await response.json();

  return results.data as UserProject;
}
