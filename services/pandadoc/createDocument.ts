import arvoData from "@/data/arvoData.json";
import { Customer } from "@/types";
import { DocumentCreateResponse } from "pandadoc-node-client";

export async function createDocument(apiKey: string, fileUrl: string, customer: Customer): Promise<DocumentCreateResponse> {
  console.log(fileUrl);
  const requestBody = JSON.stringify({
    name: "Contrato Arvo",
    url: fileUrl,
    recipients: [
      arvoData.arvoTecnologia,
      arvoData.arvoContabilidade,
      {
        email: customer.email,
        first_name: customer.firstName,
        last_name: customer.lastName,
        role: "Customer",
        signing_order: 3,
      },
    ],
    fields: {
      FullNameC: {
        value: customer.firstName + " " + customer.lastName,
        role: "Customer",
      },
      CPFC: {
        value: customer.cpf,
        role: "Customer",
      },
      RazaoSocialC: {
        value: customer.razaoSocial,
        role: "Customer",
      },
      SignatureDateC: {
        value: customer.signatureDate,
        role: "Customer",
      },
    },
  });

  const response = await fetch("https://api.pandadoc.com/public/v1/documents", {
    method: "POST",
    headers: {
      Authorization: `API-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: requestBody,
  });

  return response.json();
}
