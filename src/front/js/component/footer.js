import React, { Component } from "react";

export const Footer = () => (
  <footer className="footer mt-auto text-center">
    <div
      className="page-container"
      style={{ minHeight: "18vh", display: "flex", flexDirection: "column" }}
    >
      <footer
        className="footer mt-auto text-center"
        style={{ position: "relative", fontFamily:"avenir-light" }}
      >
        <p>© 2024 Recipedia</p>
      </footer>
    </div>
  </footer>
);
