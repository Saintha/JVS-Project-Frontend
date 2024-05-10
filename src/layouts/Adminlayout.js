import React from "react";
import "../styles/sidebar.css";
import Sidebar from "../components/Sidebar";
const Adminlayout = ({ children }) => {
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-2 col-md-2 col-sm-2 navbar navbar-expand-sm sticky-top ps-2 pe-2 sidebar">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-start w-75"
            id="navbarSupportedContent"
          >
            <div
              class="offcanvas-header"
              style={{ backgroundColor: "#F6F8FF" }}
            >
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body" style={{ backgroundColor: "#F6F8FF" }}>
              <Sidebar></Sidebar>
            </div>
          </div>
        </div>
        <div class="col-lg-10 col-md-10 col-sm-10 p-0 min-vh-100 dashboard-body">
          {/* <div
            className="sticky-top m-0"
            style={{ width: "100%", height: 100, backgroundColor: "green" }}
          ></div> */}
          <div class="mt-4 p-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminlayout;
