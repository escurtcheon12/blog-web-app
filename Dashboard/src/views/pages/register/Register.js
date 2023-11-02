import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import axios from "axios";
import CIcon from "@coreui/icons-react";

const Register = () => {
  const [dataRegister, setDataRegister] = useState({
    username: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const onInputChange = (input, value) => {
    setDataRegister({
      ...dataRegister,
      [input]: value,
    });
  };

  console.log(dataRegister);

  const handleRegister = () => {
    axios
      .post("http://localhost:3001/api/filterRegister", {
        dataUsername: dataRegister.username,
        dataEmail: dataRegister.email,
      })
      .then((res) => {
        if (res.data === "registered") {
          alert("registered");
          setDataRegister({
            username: "",
            email: "",
            password: "",
            repeat_password: "",
          });
        } else if (res.data === "none") {
          if (dataRegister.password === dataRegister.repeat_password) {
            axios
              .post("http://localhost:3001/api/register", {
                dataUsername: dataRegister.username,
                dataEmail: dataRegister.email,
                dataPassword: dataRegister.password,
              })
              .then((res) => {
                alert(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      onChange={(e) =>
                        onInputChange("username", e.target.value)
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={(e) => onInputChange("email", e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e) =>
                        onInputChange("password", e.target.value)
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={(e) =>
                        onInputChange("repeat_password", e.target.value)
                      }
                    />
                  </CInputGroup>
                  <CButton
                    onClick={() => handleRegister()}
                    color="success"
                    block
                  >
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block>
                      <span>facebook</span>
                    </CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block>
                      <span>twitter</span>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
