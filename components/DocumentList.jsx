"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveBtnDocument from "./RemoveBtnDocument";

export default function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({
    descriptionID: "",
    descriptionEN: "",
    fileDocument: null,
    articleDate: "",
    category: "",
    selectType: "",
  });
  const [fileDocument, setFileDocument] = useState(null);
  const [descriptionID, setDescriptionID] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");
  const [articleDate, setArticleDate] = useState("");
  const [category, setCategory] = useState("");
  const [selectType, setSelectType] = useState("");
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);

  useEffect(() => {
    fetch("api/document")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDocuments(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const radioChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileDocument(file);
  };

  const handleSubmit = async (e) => {
    const currentDate = new Date();
    const localCreatedAt = currentDate.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    e.preventDefault();

    if (
      !descriptionID ||
      !descriptionEN ||
      !articleDate ||
      !category ||
      !selectType ||
      !fileDocument
    ) {
      alert("Harap Isi Semua Form");
      return;
    }

    try {
      const res = await fetch("api/document", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          descriptionID,
          descriptionEN,
          articleDate,
          category,
          createdAt: localCreatedAt,
          fileDocument,
          selectType,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Document created successfully:", result);
        setDocument((prevDocuments) => [...prevDocuments, result.document]);

        setDescriptionID("");
        setDescriptionEN("");
        setArticleDate("");
        setCategory("");
        setSelectType("");
        setFileDocument(null);
      } else {
        const errorResult = await res.json();
        throw new Error(errorResult.message);
      }
    } catch (error) {
      console.error("Error creating article:", error);
      window.location.reload();
    }
  };

  const handleRowClick = (documentId) => {
    setSelectedDocumentId(documentId);
  };

  return (
    <>
      <section className="container mx-auto p-4">
        <Accordion>
          <AccordionSummary
            id="PanelHeader"
            aria-control="PanelHeader-content"
            expandIcon={<ExpandMoreIcon />}
            className="cursor-pointer"
          >
            <Typography className="font-bold">Create New Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
              <div className="mb-4">
                <label
                  htmlFor="descriptionID"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description ID
                </label>
                <textarea
                  id="descriptionID"
                  name="descriptionID"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows="3"
                  value={descriptionID}
                  onChange={(e) => setDescriptionID(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="descriptionEN"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description EN
                </label>
                <textarea
                  id="descriptionEN"
                  name="descriptionEN"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows="3"
                  value={descriptionEN}
                  onChange={(e) => setDescriptionEN(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fileDocument"
                  className="block text-sm font-medium text-gray-700"
                >
                  File Document
                </label>
                <input
                  type="file"
                  id="fileDocument"
                  name="fileDocument"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="articleDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Article Date
                </label>
                <input
                  type="date"
                  id="articleDate"
                  name="articleDate"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={articleDate}
                  onChange={(e) => setArticleDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <fieldset className="border border-gray-300 rounded-md p-2">
                  <legend className="text-base font-medium text-gray-700">
                    Category
                  </legend>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="keterbukaanInformasi"
                        name="category"
                        type="radio"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        value="Keterbukaan Informasi"
                        checked={category === "Keterbukaan Informasi"}
                        onChange={radioChangeCategory}
                        required
                      />
                      <label
                        htmlFor="keterbukaanInformasi"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Keterbukaan Informasi
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="keuangan"
                        name="category"
                        type="radio"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        value="Keuangan"
                        checked={category === "Keuangan"}
                        onChange={radioChangeCategory}
                        required
                      />
                      <label
                        htmlFor="keuangan"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Keuangan
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="selectType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  id="selectType"
                  name="selectType"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={selectType}
                  onChange={(e) => setSelectType(e.target.value)}
                  required
                >
                  <option>Keterbukaan Informasi</option>
                  <option>Keuangan</option>
                  <option>Laporan Keuangan</option>
                  <option>Laporan Tahunan</option>
                  <option>Rapat Umum Pemegang Saham</option>
                  <option>Siaran Pers</option>
                </select>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            id="header-table"
            aria-control="table-content"
            expandIcon={<ExpandMoreIcon />}
            className="cursor-pointer"
          >
            <Typography className="font-bold">Data Table</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {documents.length === 0 ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.382l4.364 2.545-1.75 3.032-2.692-1.568V8.53l-.884-.515a6 6 0 10-1.702 6.688l.964.544-1.382 2.398L6 17.29v4.618z"
                  ></path>
                </svg>
                Loading...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className=" px-4 py-2">Document Date</th>
                      <th className=" px-4 py-2">Description</th>
                      <th className=" px-4 py-2">Category</th>
                      <th className=" px-4 py-2">Type</th>
                      <th className=" px-4 py-2">File</th>
                      <th className=" px-4 py-2">Created At</th>
                      <th className=" px-4 py-2">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((document) => {
                      const fileURL = `api/document${document.fileDocument?.name}`;
                      return (
                        <tr
                          key={document._id}
                          onClick={() => handleRowClick(fileURL)}
                        >
                          <td>{document.articleDate}</td>
                          <td>{document.descriptionID}</td>
                          <td>{document.category}</td>
                          <td>{document.selectType}</td>
                          <td>
                            <a
                              href={`api/document/${document.fileDocument?.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              Download PDF
                            </a>
                          </td>
                          <td>{document.createdAt}</td>
                          <td>
                            <RemoveBtnDocument id={document._id} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      </section>
    </>
  );
}
