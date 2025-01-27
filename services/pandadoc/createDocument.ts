import arvoData from "@/data/arvoData.json";

export async function createDocument(apiKey: string, file: File, customer: any, witness: any): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "data",
    JSON.stringify({
      name: "Contrato Arvo",
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
        {
          email: witness.email,
          first_name: witness.firstName,
          last_name: witness.lastName,
          role: "Witness",
          signing_order: 4,
        },
      ],
      fields: {
        FullName: {
          value: customer.firstName + " " + customer.lastName,
          role: "Customer",
        },
        CPF: {
          value: customer.cpf,
          role: "Customer",
        },
        RazaoSocial: {
          value: customer.razaoSocial,
          role: "Customer",
        },
        WitnessCpf: {
          value: witness.cpf,
          role: "Witness",
        },
      },
    })
  );

  const response = await fetch("https://api.pandadoc.com/public/v1/documents", {
    method: "POST",
    headers: {
      Authorization: `API-Key ${apiKey}`,
    },
    body: formData,
  });

  return response.json();
}
