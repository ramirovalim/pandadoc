export async function sendDocument(apiKey: string, documentId: string): Promise<any> {
  const response = await fetch(`https://api.pandadoc.com/public/v1/documents/${documentId}/send`, {
    method: "POST",
    headers: {
      Authorization: `API-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Hello! This document was sent from the PandaDoc API.",
      silent: false,
    }),
  });

  return response.json();
}
