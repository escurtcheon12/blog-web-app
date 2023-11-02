import React, { useEffect, useState } from "react";
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
  CDataTable,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CInputFile,
  CSelect,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/FormInput.css";
import axios from "axios";

const FormInputCategories = () => {
  let editStorage = JSON.parse(localStorage.getItem("editCategories"));
  const [dataCategories, setDataCategories] = useState({
    category_id: editStorage ? editStorage.category_id : "",
    category_name: editStorage ? editStorage.category_name : "",
  });

  const onInputChange = (input, value) => {
    setDataCategories({
      ...dataCategories,
      [input]: value,
    });
  };

  const handleButton = (e) => {
    e.preventDefault();

    if (dataCategories.category_name) {
      if (editStorage) {
        axios
          .put(
            "http://localhost:3006/categories/" + dataCategories.category_id,
            {
              category_name: dataCategories.category_name,
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post("http://localhost:3006/categories", {
            category_name: dataCategories.category_name,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }

      window.location = "/#/categories";
    } else {
      alert("Should fill the input");
    }
  };

  return (
    <>
      <CCard>
        <CCardHeader className="fw-bold headerCardTable">
          Form Categories
        </CCardHeader>
        <CCardBody>
          <CForm method="POST">
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Category Name</CLabel>
              </CCol>
              <CCol md="9">
                <CInput
                  onChange={(e) =>
                    onInputChange("category_name", e.target.value)
                  }
                  value={dataCategories.category_name}
                  id="text-input"
                  name="text-input"
                ></CInput>
              </CCol>
            </CFormGroup>
            <div className="d-flex flex-row-reverse bd-highlight">
              <CButton
                onClick={(e) => handleButton(e)}
                type="submit"
                className="btn btn-primary pl-4 pr-4"
              >
                {editStorage ? (
                  <>
                    <FontAwesomeIcon className="mr-2" icon={faSave} /> Save
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon className="mr-2" icon={faPlus} /> Add
                  </>
                )}
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

export default FormInputCategories;
