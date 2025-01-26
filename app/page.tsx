"use client";

import { useState } from "react";
import { createDocument, checkDocumentStatus, sendDocument } from "@/services/pandadoc";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<any>(null);
  const [documentId, setDocumentId] = useState("");
  const [documentStatus, setDocumentStatus] = useState<any>(null);
  const [documentSent, setDocumentSent] = useState<any>(null);

  // State for customer details
  const [customer, setCustomer] = useState({ email: "", firstName: "", lastName: "", cpf: "" });

  const handleCreateDocument = async () => {
    if (!file) return;
    const result = await createDocument(apiKey, file, customer);
    setDocument(result);
    setDocumentId(result.id);
  };

  const handleCheckStatus = async () => {
    if (!documentId) return;
    const status = await checkDocumentStatus(apiKey, documentId);
    setDocumentStatus(status);
  };

  const handleSendDoc = async () => {
    if (!documentId) return;
    const result = await sendDocument(apiKey, documentId);
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
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </label>
        <input
          type="file"
          id="myFile"
          className="border-2 p-2 rounded"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
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
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-blue-500 text-white rounded p-2" onClick={handleCreateDocument}>
            Create Document from PDF upload
          </button>
          {document && (
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">{JSON.stringify(document, null, 2)}</pre>
          )}
          <button className="bg-blue-500 text-white rounded p-2" onClick={handleCheckStatus}>
            Check Document Status
          </button>
          {documentStatus && (
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">{JSON.stringify(documentStatus, null, 2)}</pre>
          )}
          <button className="bg-blue-500 text-white rounded p-2" onClick={handleSendDoc}>
            Send Document
          </button>
          {documentSent && (
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">{JSON.stringify(documentSent, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
