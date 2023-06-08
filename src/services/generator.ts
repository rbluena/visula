export async function generateSchemaContent(
  projectId: string,
  data: any
): Promise<{ data: any; message: string }> {
  const response = await fetch(`/api/v1/projects/${projectId}/generator`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error?.message || "");
  }

  const results = await response.json();
  return results.data;
}
