"use client";

import { templates } from "@/data/templates";
import { checkDocumentStatus, createDocument, sendDocument } from "@/services/pandadoc";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState({
    apiKey: "",
    file: null as File | null,
    fileUrl: "",
    document: null as any,
    documentId: undefined as string | undefined,
    documentStatus: null as any,
    documentSent: null as any,
  });

  // console.log(templates);

  const setApiKey = (apiKey: string) => setState((prevState) => ({ ...prevState, apiKey }));
  const setFileUrl = (fileUrl: string) => setState((prevState) => ({ ...prevState, fileUrl }));
  const setDocument = (document: any) => setState((prevState) => ({ ...prevState, document }));
  const setDocumentId = (documentId: string) => setState((prevState) => ({ ...prevState, documentId }));
  const setDocumentStatus = (documentStatus: any) => setState((prevState) => ({ ...prevState, documentStatus }));
  const setDocumentSent = (documentSent: any) => setState((prevState) => ({ ...prevState, documentSent }));

  // State for customer and witness details
  const [customer, setCustomer] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cpf: "",
    razaoSocial: "",
    signatureDate: new Date(),
  });

  const handleCreateDocument = async () => {
    if (!state.fileUrl) return;
    const result = await createDocument(state.apiKey, state.fileUrl, customer);
    setDocument(result);
    setDocumentId(result.id ?? "");
  };

  const handleCheckStatus = async () => {
    if (!state.documentId) return;
    const status = await checkDocumentStatus(state.apiKey, state.documentId);
    setDocumentStatus(status);
  };

  const handleSendDoc = async () => {
    if (!state.documentId) return;
    const result = await sendDocument(state.apiKey, state.documentId);
    setDocumentSent(result);
  };

  const updateCustomer = (field: string, value: string) => {
    setCustomer({ ...customer, [field]: value });
  };

  return (
    <div className="flex flex-col items-center justify-evenly p-6">
      <img src="https://s3.amazonaws.com/awsmp-logos/PandaDoc.png" alt="PandaDoc Logo" className="mb-4" width={200} />
      <div className="flex flex-col gap-4 w-full max-w-md border-2 p-4 rounded-lg shadow-md">
        <label className="flex flex-col">
          <span className="font-semibold">API Key:</span>
          <input
            className="border-2 p-2 rounded mt-1"
            type="text"
            id="api_key"
            value={state.apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </label>
        <select value={state.fileUrl} onChange={(e) => setFileUrl(e.target.value)}>
          <option value="" disabled>
            Select a PDF template
          </option>
          {templates.map((template) => {
            return (
              <option value={template.value} key={template.label}>
                {template.label}
              </option>
            );
          })}
        </select>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Customer Email"
            value={customer.email}
            onChange={(e) => updateCustomer("email", e.target.value)}
            className="border-2 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Customer First Name"
            value={customer.firstName}
            onChange={(e) => updateCustomer("firstName", e.target.value)}
            className="border-2 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Customer Last Name"
            value={customer.lastName}
            onChange={(e) => updateCustomer("lastName", e.target.value)}
            className="border-2 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Customer CPF"
            value={customer.cpf}
            onChange={(e) => updateCustomer("cpf", e.target.value)}
            className="border-2 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Customer Razao Social"
            value={customer.razaoSocial}
            onChange={(e) => updateCustomer("razaoSocial", e.target.value)}
            className="border-2 p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button className="bg-blue-500 text-white rounded p-2" onClick={handleCreateDocument}>
            Create Document from PDF upload
          </button>
          {state.document && (
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">{JSON.stringify(state.document, null, 2)}</pre>
          )}
          <button className="bg-blue-500 text-white rounded p-2" onClick={handleCheckStatus}>
            Check Document Status
          </button>
          {state.documentStatus && (
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(state.documentStatus, null, 2)}
            </pre>
          )}
          <button className="bg-blue-500 text-white rounded p-2" onClick={handleSendDoc}>
            Send Document
          </button>
          {state.documentSent && (
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">{JSON.stringify(state.documentSent, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
