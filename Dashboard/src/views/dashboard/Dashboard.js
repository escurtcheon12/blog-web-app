import React, { lazy, useState, useEffect } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import MainChartExample from "../charts/MainChartExample.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Dashboard = () => {
  const [descTraffic, setDescTraffic] = useState("Date");

  return (
    <>
      <WidgetsDropdown />
      {/* <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {["Date", "Month", "Year"].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === descTraffic}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample
            status={descTraffic}
            style={{ height: "300px", marginTop: "40px" }}
          />
        </CCardBody>
      </CCard> */}
    </>
  );
};

export default Dashboard;
