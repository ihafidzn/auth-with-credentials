"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function UserInfo() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch("/api/documents"); // Adjust the endpoint accordingly
        const data = await response.json();
        console.log("Fetched documents:", data);
        setDocuments(data);
      } catch (error) {
        console.error("Failed to fetch documents", error);
      }
    }

    fetchDocuments();
  }, []);

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
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
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <td>DescriptionID</td>
                <td>Created</td>
                <td>Articele Date</td>
                <td>Category</td>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => {
                return (
                  <tr key={document._id}>
                    <td>{document.descriptionID}</td>
                    <td>{document.articleDate}</td>
                    <td>{document.category}</td>
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
