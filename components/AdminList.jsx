"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Toast } from "react-toastify";
import Navbar from "./Navbar";

export default function AdminList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("api/register")
      .then((users) => {
        setUsers(users.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const localCreatedAt = currentDate.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    axios
      .post("api/register", {
        email,
        password,
        createdAt: localCreatedAt,
      })
      .then((result) => console.log(result));
    window.location.reload();
    toast.success("Success Add User!");
    axios
      .get("/api/register")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };
  return (
    <>
      <Navbar />
      <section className="container mx-auto py-8">
        <div className="header-root">
          <h2 className="text-2xl font-bold">ADMIN CONTROL</h2>
        </div>
        <div>
          <form action="" onSubmit={handleSubmit}>
            <Accordion>
              <AccordionSummary
                id="panel1-header"
                aria-controls="panel1-content"
                // expandIcon={<ExpandMoreIcon />}
              >
                <Typography className="font-bold">Create New Data</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="form-group mb-4 flex items-center">
                    <label htmlFor="Email" className="w-1/3">
                      Email
                    </label>
                    <div className="w-2/3">
                      <input
                        type="email"
                        className="form-input mt-1 block w-full"
                        placeholder="e.g:admin@admin.com"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-4 flex items-center">
                    <label htmlFor="password" className="w-1/3">
                      Password
                    </label>
                    <div className="w-2/3">
                      <input
                        type="password"
                        className="form-input mt-1 block w-full"
                        id="password"
                        name="password"
                        placeholder="e.g:***123***"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <div className="form-group mb-4 flex items-center">
                    <label htmlFor="passwordConfirm" className="w-1/3">
                      Password Confirmation
                    </label>
                    <div className="w-2/3">
                      <input
                        type="password"
                        className="form-input mt-1 block w-full"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        placeholder="e.g:***123***"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                    </div>
                  </div> */}
                  <div className="form-group flex items-center">
                    <label className="w-1/3"></label>
                    <div className="w-2/3">
                      <button className="btn bg-blue-500 text-white py-2 px-4 rounded">
                        Submit
                      </button>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </form>
          <Accordion>
            <AccordionSummary
              id="panel2-header"
              aria-controls="panel2-content"
              //   expandIcon={<ExpandMoreIcon />}
            >
              <Typography className="font-bold">Data Table</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((data, index) => {
                      return (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{data.email}</td>
                          <td className="px-4 py-2">{data.createdAt}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </section>
    </>
  );
}
