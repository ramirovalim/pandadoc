import { DocumentStatusResponse } from "pandadoc-node-client";

export async function checkDocumentStatus(apiKey: string, documentId: string): Promise<DocumentStatusResponse> {
  const response = await fetch(`https://api.pandadoc.com/public/v1/documents/${documentId}`, {
    method: "GET",
    headers: {
      Authorization: `API-Key ${apiKey}`,
    },
  });

  return response.json();
}
