"use client";

import { AccordionDetails, Typography } from "@mui/material";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function UserInfo() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState([]);
  const [fileDocument, setFileDocument] = useState("");
  const [descriptionID, setDescriptionID] = useState([]);
  const [descriptionEN, setDescriptionEN] = useState([]);
  const [articleDate, setArticleDate] = useState([]);
  const [category, setCategory] = useState("");
  const [selectType, setSelectType] = useState("");
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch("/api/register");
        const data = await response.json();
        console.log("Fetched documents:", data);
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch documents", error);
      }
    }

    fetchDocuments();
  }, []);

  // const radioChangeCategory = (e) => {
  //   setCategory(e.target.value);
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setFileDocument(file);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!descriptionID || !descriptionEN || !category || !selectType) {
  //     alert("Title and description are required.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/api/document", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         descriptionID,
  //         descriptionEN,
  //         category,
  //         selectType,
  //       }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to create document");
  //     }
  //     console.log("Document created successfully!");
  //     // fetchDocuments();
  //     // setDescriptionID("");
  //     // setDescriptionEN("");
  //     // setArticleDate("");
  //     // setCategory("");
  //     // setType("");
  //     // setFileDocument("");
  //   } catch (error) {
  //     console.error(
  //       "Server Error:",
  //       error.response ? error.response.data : error.message
  //     );
  //     if (error.response && error.response.status === 500) {
  //       window.location.reload();
  //     }
  //   }
  // };

  // const handleRowClick = (documentId) => {
  //   setSelectedDocumentId(documentId);
  // };

  // const handleDelete = async (documentId) => {
  //   try {
  //     if (!documentId) {
  //       alert("Select a document to delete first.");
  //       return;
  //     }
  //     const confirmDelete = window.confirm(
  //       "Are you sure you want to delete this document?"
  //     );
  //     if (!confirmDelete) {
  //       return;
  //     }
  //     await fetch("/api/document", {
  //       method: "DELETE",
  //     });
  //     console.log("Document deleted successfully!");
  //     fetchDocuments();
  //   } catch (error) {
  //     console.error("Error deleting document:", error);
  //     if (error.response && error.response.status === 500) {
  //       window.location.reload();
  //     }
  //   }
  // };
  return (
    <div className=" place-items-center">
      <div className="shadow-lg p-8 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
        {/* <AccordionDetails>
          <Typography>
            <form action="" onSubmit={handleSubmit}>
              <div className="form-group row">
                <label
                  htmlFor="DescriptionID"
                  className="col-sm-4 col-form-label"
                >
                  Description ID
                </label>
                <div className="col-sm-8">
                  <textarea
                    type="text"
                    className="form-control"
                    id="descriptionID"
                    placeholder="e.g: Perusahaan Pigijo"
                    rows="5"
                    onChange={(e) => setDescriptionID(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="DescriptionEN"
                  className="col-sm-4 col-form-label"
                >
                  Description EN
                </label>
                <div className="col-sm-8">
                  <textarea
                    type="text"
                    className="form-control"
                    id="descriptionEN"
                    placeholder="e.g: Perusahaan Pigijo"
                    rows="5"
                    onChange={(e) => setDescriptionEN(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="" className="col-sm-4 col-form-label">
                  File
                </label>
                <div className="col-sm-8">
                  <input
                    type="file"
                    className="form-control"
                    id="fileDocument"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="ArticleDate"
                  className="col-sm-4 col-form-label text-right"
                >
                  Article Date
                </label>
                <div className="col-sm-8">
                  <input
                    type="date"
                    className="form-control"
                    id="articleDate"
                    onChange={(e) => setArticleDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group row mb-4">
                <label htmlFor="" className="col-sm-4 col-form-label">
                  Category
                </label>
                <div className="col-sm-8">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input custom-input"
                      type="radio"
                      name="category"
                      id="keterbukaanInformasi"
                      value="Keterbukaan Informasi"
                      onChange={radioChangeCategory}
                      checked={category === "Keterbukaan Informasi"}
                      required
                    ></input>
                    <label
                      className="form-check-label"
                      htmlFor="keterbukaanInformasi"
                    >
                      Keterbukaan Informasi
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input custom-input"
                      type="radio"
                      name="category"
                      id="keuangan"
                      value="Keuangan"
                      onChange={radioChangeCategory}
                      checked={category === "Keuangan"}
                    ></input>
                    <label className="form-check-label " htmlFor="keuangan">
                      Keuangan
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row mb-4">
                <label htmlFor="selectType" className="col-sm-4 col-form-label">
                  Type
                </label>
                <div className="col-sm-8">
                  <select
                    className="form-control selectType"
                    id="selectType"
                    row="5"
                    placeholder="Pilih type"
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
              </div>
              <div className="form-group row">
                <label htmlFor="" className="col-sm-4 col-form-label"></label>
                <div className="col-sm-8">
                  <button
                    className="btn btn-primary text-light px-3"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </Typography>
        </AccordionDetails> */}
        {/* <AccordionDetails>
          <Typography>
            <form action="" onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row items-center">
                <label
                  htmlFor="DescriptionID"
                  className="md:w-1/3 text-sm font-medium text-gray-700"
                >
                  Description ID
                </label>
                <div className="md:w-2/3 mt-1 md:mt-0">
                  <textarea
                    type="text"
                    className="form-control block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="descriptionID"
                    placeholder="e.g: Perusahaan Pigijo"
                    rows="5"
                    onChange={(e) => setDescriptionID(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label
                  htmlFor="DescriptionEN"
                  className="md:w-1/3 text-sm font-medium text-gray-700"
                >
                  Description EN
                </label>
                <div className="md:w-2/3 mt-1 md:mt-0">
                  <textarea
                    type="text"
                    className="form-control block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="descriptionEN"
                    placeholder="e.g: Perusahaan Pigijo"
                    rows="5"
                    onChange={(e) => setDescriptionEN(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label
                  htmlFor=""
                  className="md:w-1/3 text-sm font-medium text-gray-700"
                >
                  File
                </label>
                <div className="md:w-2/3 mt-1 md:mt-0">
                  <input
                    type="file"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="fileDocument"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label
                  htmlFor="ArticleDate"
                  className="md:w-1/3 text-sm font-medium text-gray-700"
                >
                  Article Date
                </label>
                <div className="md:w-2/3 mt-1 md:mt-0">
                  <input
                    type="date"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="articleDate"
                    onChange={(e) => setArticleDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label
                  htmlFor=""
                  className="md:w-1/3 text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <div className="md:w-2/3 mt-1 md:mt-0 space-y-2">
                  <div className="flex items-center">
                    <input
                      className="form-check-input h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      type="radio"
                      name="category"
                      id="keterbukaanInformasi"
                      value="Keterbukaan Informasi"
                      onChange={radioChangeCategory}
                      checked={category === "Keterbukaan Informasi"}
                      required
                    />
                    <label
                      className="ml-2 block text-sm text-gray-900"
                      htmlFor="keterbukaanInformasi"
                    >
                      Keterbukaan Informasi
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      className="form-check-input h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      type="radio"
                      name="category"
                      id="keuangan"
                      value="Keuangan"
                      onChange={radioChangeCategory}
                      checked={category === "Keuangan"}
                    />
                    <label
                      className="ml-2 block text-sm text-gray-900"
                      htmlFor="keuangan"
                    >
                      Keuangan
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label
                  htmlFor="selectType"
                  className="md:w-1/3 text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <div className="md:w-2/3 mt-1 md:mt-0">
                  <select
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="selectType"
                    row="5"
                    placeholder="Pilih type"
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
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label
                  htmlFor=""
                  className="md:w-1/3 text-sm font-medium text-gray-700"
                ></label>
                <div className="md:w-2/3 mt-1 md:mt-0">
                  <button
                    className="btn btn-primary text-light px-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </Typography>
        </AccordionDetails> */}

        <div className="table-responsive" style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <td>email</td>
                <td>password</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
