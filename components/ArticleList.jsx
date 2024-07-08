"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import trash from "./assets/trash.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ArticleList() {
  const [selectedFile, setSelectedFile] = useState();
  const [imageCover, setImageCover] = useState("");
  const [articles, setArticles] = useState([]);
  const [titleID, setTitleID] = useState("");
  const [titleEN, setTitleEN] = useState([]);
  const [descriptionID, setDescriptionID] = useState([]);
  const [descriptionEN, setDescriptionEN] = useState([]);
  const [articleDate, setArticleDate] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("api/article")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArticles(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      setImageCover("");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(e.target.files[0]);
      setImageCover(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const currentDate = new Date();
  //     const localCreatedAt = currentDate.toLocaleString("en-US", {
  //       timeZone: "Asia/Jakarta",
  //     });
  //     console.log("Axios Request Payload", {
  //       titleID,
  //       titleEN,
  //       descriptionID,
  //       descriptionEN,
  //       articleDate,
  //       category,
  //       imageCover,
  //     });

  //     axios
  //       .post("api/article", {
  //         titleID,
  //         titleEN,
  //         descriptionID,
  //         descriptionEN,
  //         articleDate,
  //         category,
  //         createdAt: localCreatedAt,
  //         imageCover,
  //       })
  //       .then((result) => {
  //         console.log(result);

  //         axios
  //           .get(import.meta.env.VITE_REACT_APP_ARTICLE_GET)
  //           .then((response) => {
  //             console.log(response.data);
  //             setArticles(response.data);
  //           })
  //           .catch((err) => console.log(err));

  //         setTitleID("");
  //         setTitleEN("");
  //         setDescriptionID("");
  //         setDescriptionEN("");
  //         setArticleDate("");
  //         setCategory("");
  //         setImageCover("");
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Server Error:",
  //           error.response ? error.response.data : error.message
  //         );
  //         if (error.response && error.response.status === 500) {
  //           window.location.reload();
  //         }
  //       });
  //   };

  const handleRadioChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const localCreatedAt = currentDate.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    console.log("Fetch Request Payload", {
      titleID,
      titleEN,
      descriptionID,
      descriptionEN,
      articleDate,
      category,
      imageCover,
    });

    fetch("api/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titleID,
        titleEN,
        descriptionID,
        descriptionEN,
        articleDate,
        category,
        createdAt: localCreatedAt,
        imageCover,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        fetch("api/article")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setArticles(data);
          })
          .catch((err) => console.log(err));

        setTitleID("");
        setTitleEN("");
        setDescriptionID("");
        setDescriptionEN("");
        setArticleDate("");
        setCategory("");
        setImageCover("");
      })
      .catch((error) => {
        console.error("Server Error:", error.message);
        if (error.status === 500) {
          window.location.reload();
        }
      });
  };

  const handleDeleteImage = () => {
    setSelectedFile(null);
    setImageCover("");
  };

  //   const onSelectFile = (e) => {
  //     if (!e.target.files || e.target.files.length === 0) {
  //       setSelectedFile(undefined);
  //       setImageCover("");
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedFile(e.target.files[0]);
  //       setImageCover(reader.result);
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   };

  const handleDelete = async (articleId) => {
    try {
      if (!articleId) {
        alert("Select an article to delete first.");
        return;
      }
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this article?"
      );
      if (!confirmDelete) {
        return;
      }

      const deleteResponse = await fetch(`api/article/${articleId}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the article");
      }

      console.log("Article deleted successfully!");

      const response = await fetch("api/article");
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error deleting article:", error);
      if (error.response && error.response.status === 500) {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <section className="container mx-auto px-4 py-6">
        <Accordion>
          <AccordionSummary
            id="panel1-header"
            aria-controls="panel1-content"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className="font-bold">Create New Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-wrap mb-4">
                  <label
                    htmlFor="titleID"
                    className="w-full md:w-1/3 text-right md:text-right pr-4"
                  >
                    Title ID
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      type="text"
                      className="form-control block w-full"
                      id="titleID"
                      placeholder="e.g: Perusahaan Pigijo"
                      onChange={(e) => setTitleID(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-4">
                  <label
                    htmlFor="titleEN"
                    className="w-full md:w-1/3 text-right md:text-right pr-4"
                  >
                    Title EN
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      type="text"
                      className="form-control block w-full"
                      id="titleEN"
                      placeholder="e.g: Pigijo Company"
                      onChange={(e) => setTitleEN(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-4">
                  <label
                    htmlFor="descriptionID"
                    className="w-full md:w-1/3 text-right md:text-right pr-4"
                  >
                    Description ID
                  </label>
                  <div className="w-full md:w-2/3">
                    <textarea
                      className="form-control block w-full"
                      id="descriptionID"
                      placeholder=""
                      rows="4"
                      onChange={(e) => setDescriptionID(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-4">
                  <label
                    htmlFor="descriptionEN"
                    className="w-full md:w-1/3 text-right md:text-right pr-4"
                  >
                    Description EN
                  </label>
                  <div className="w-full md:w-2/3">
                    <textarea
                      className="form-control block w-full"
                      id="descriptionEN"
                      placeholder=""
                      rows="4"
                      onChange={(e) => setDescriptionEN(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-4">
                  <label
                    htmlFor="articleDate"
                    className="w-full md:w-1/3 text-right md:text-right pr-4"
                  >
                    Article Date
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      type="date"
                      className="form-control block w-full"
                      id="articleDate"
                      placeholder=""
                      onChange={(e) => setArticleDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-4">
                  <label
                    htmlFor="imageUpload"
                    className="w-full md:w-1/3 text-right md:text-right pr-4"
                  >
                    Image Cover
                  </label>
                  <div className="w-full md:w-2/3">
                    {selectedFile ? (
                      <>
                        <div className="mb-2">
                          <img
                            src={imageCover}
                            alt="Selected"
                            className="h-40 w-auto object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleDeleteImage}
                          className="btn btn-danger"
                        >
                          Delete Image
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          className="form-control-file block w-full"
                          id="imageUpload"
                          onChange={onSelectFile}
                          required
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap mb-4">
                  <label className="w-full md:w-1/3 text-right md:text-right pr-4">
                    Category
                  </label>
                  <div className="w-full md:w-2/3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        id="category1"
                        value="event"
                        checked={category === "event"}
                        onChange={handleRadioChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="category1">
                        Event
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        id="category2"
                        value="journal"
                        checked={category === "journal"}
                        onChange={handleRadioChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="category2">
                        Journal
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        id="category3"
                        value="other"
                        checked={category === "other"}
                        onChange={handleRadioChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="category3">
                        Other
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!selectedFile}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Article List</h2>
          {articles.length === 0 ? (
            <p>No articles found.</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Title ID</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Description ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {article.titleID}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {article.descriptionID}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {article.articleDate}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="btn btn-danger"
                      >
                        <img
                          src={trash}
                          alt="Delete"
                          className="h-6 w-6 object-contain"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
