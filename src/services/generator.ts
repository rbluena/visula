export async function generateSchemaContent(projectId: string, data: any) {
  const response = await fetch(`/api/v1/projects/${projectId}/generator`, {
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
