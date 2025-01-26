export async function createDocument(apiKey: string, file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "data",
    JSON.stringify({
      name: "Contrato Arvo",
      recipients: [
        {
          email: "ramiromvalim@gmail.com",
          first_name: "Arvo",
          last_name: "Tech",
          role: "ArvoTecnologia",
          signing_order: 1,
        },
        {
          email: "bornaacessorios@gmail.com",
          first_name: "Arvo",
          last_name: "Cont",
          role: "ArvoContabilidade",
          signing_order: 2,
        },
        {
          email: "ramirotuk@gmail.com",
          first_name: "Ramiro",
          last_name: "Valim",
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
          value: "Ramiro Valim",
          role: "Customer",
        },
        CPF: {
          value: "123.456.789-00",
          role: "Customer",
        },
      },
      metadata: {
        "salesforce.opportunity_id": "123456",
        my_favorite_pet: "Panda",
      },
      tags: ["created_via_api", "test_document"],
      parse_form_fields: false,
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
