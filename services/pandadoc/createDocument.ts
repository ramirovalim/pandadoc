import arvoData from "@/mock-data/arvoData.json";

export async function createDocument(apiKey: string, file: File, customer: any): Promise<any> {
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
      ],
      fields: {
        RazaoSocialT: {
          value: "Arvo Tecnologia Razao Social 123",
          role: "ArvoTecnologia",
        },
        EnderecoT: {
          value: "Rua Arvo, 134 - Tecnologia",
          role: "ArvoTecnologia",
        },
        CNPJT: {
          value: "12345678/0001-90",
          role: "ArvoTecnologia",
        },
        RazaoSocialC: {
          value: "Arvo Contabilidade Razao Social 123",
          role: "ArvoContabilidade",
        },
        EnderecoC: {
          value: "Rua Arvo, 134 - Contabilidade",
          role: "ArvoContabilidade",
        },
        CNPJC: {
          value: "12345678/0001-90",
          role: "ArvoContabilidade",
        },
        FullName: {
          value: customer.firstName + " " + customer.lastName,
          role: "Customer",
        },
        CPF: {
          value: customer.cpf,
          role: "Customer",
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
