import React, { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Dashboard = ({ setAuth }) => {
  const [name, seName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:3333/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      seName(parseRes.username);
    } catch (err) {
      console.error(err.message);
    }
  }
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged Out Successfully!");
  };
  useEffect(() => {
    getName();
  }, []);
  return (
    <Fragment>
      <h1> Welcom to the Dashboard: {name}</h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
      <ToastContainer />
    </Fragment>
  );
};
