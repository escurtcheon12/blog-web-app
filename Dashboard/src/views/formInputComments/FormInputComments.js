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

let getFullDate = (fullDate) => {
  let getDate =
    fullDate.getDate() < 10 ? "0" + fullDate.getDate() : fullDate.getDate();
  let month = fullDate.getMonth() + 1;
  let getMonth = month < 10 ? "0" + month : month;

  return fullDate.getFullYear() + "-" + getMonth + "-" + getDate;
};

const FormInputComments = () => {
  const [dataBlog, setDataBlog] = useState([]);
  let date = new Date();
  let editStorage = JSON.parse(localStorage.getItem("editComments"));
  const [dataComments, setDataComments] = useState({
    comment_id: editStorage ? editStorage.comment_id : "",
    comment_name: editStorage ? editStorage.comment_name : "",
    comment_text: editStorage ? editStorage.comment_text : "",
    comment_date: editStorage ? editStorage.comment_date : getFullDate(date),
    blog_id: (editStorage && editStorage.blog_id) || 0,
  });

  useEffect(async () => {
    await axios
      .get("http://localhost:3006/blogs")
      .then((res) => {
        setDataBlog(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("1", editStorage);

  const onInputChange = (input, value) => {
    setDataComments({
      ...dataComments,
      [input]: value,
    });
  };

  let convertTimeToJs = (date) => {
    let a = date + "";
    let b = a.slice(0, 10).replace("T", " ");
    return b;
  };

  const convertBlog = (item) => {
    let obj = {};

    dataBlog.map((item, index) => {
      obj[item.blog_title] = item.blog_id;
    });

    return obj[item];
  };

  const handleButton = (e) => {
    e.preventDefault();

    if (
      dataComments.comment_name &&
      dataComments.comment_text &&
      dataComments.comment_date &&
      dataComments.blog_id
    ) {
      if (editStorage) {
        axios
          .put("http://localhost:3006/comments/" + dataComments.comment_id, {
            comment_name: dataComments.comment_name,
            comment_text: dataComments.comment_text,
            comment_date: dataComments.comment_date,
            blog_id: dataComments.blog_id,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post("http://localhost:3006/comments", {
            comment_name: dataComments.comment_name,
            comment_text: dataComments.comment_text,
            comment_date: dataComments.comment_date,
            blog_id: dataComments.blog_id,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }

      window.location = "/#/comments";
    } else {
      alert("Should fill all the input");
    }
  };

  return (
    <>
      <CCard>
        <CCardHeader className="fw-bold headerCardTable">
          Form Comments
        </CCardHeader>
        <CCardBody>
          <CForm method="POST">
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Comment Name</CLabel>
              </CCol>
              <CCol md="9">
                <CInput
                  onChange={(e) =>
                    onInputChange("comment_name", e.target.value)
                  }
                  value={dataComments.comment_name}
                  id="text-input"
                  name="text-input"
                ></CInput>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Comment Text</CLabel>
              </CCol>
              <CCol md="9">
                <CInput
                  onChange={(e) =>
                    onInputChange("comment_text", e.target.value)
                  }
                  value={dataComments.comment_text}
                  id="text-input"
                  name="text-input"
                ></CInput>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Date</CLabel>
              </CCol>
              <CCol md="9">
                <CInput
                  onChange={(e) =>
                    onInputChange("comment_date", e.target.value)
                  }
                  value={convertTimeToJs(dataComments.comment_date)}
                  type="date"
                  id="date-input"
                  name="date-input"
                  placeholder="date"
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="ccmonth">Blog Title</CLabel>
              </CCol>
              <CCol md="9">
                <CSelect
                  onChange={(e) =>
                    onInputChange("blog_id", convertBlog(e.target.value))
                  }
                  custom
                  name="ccmonth"
                  id="ccmonth"
                >
                  {dataBlog.map((item, index) => {
                    if (dataBlog.blog_id) {
                      if (dataBlog.blog_id === item.blog_id) {
                        return (
                          <option selected key={index} value={item.blog_title}>
                            {item.blog_title}
                          </option>
                        );
                      } else {
                        return (
                          <option key={index} value={item.blog_title}>
                            {item.blog_title}
                          </option>
                        );
                      }
                    } else {
                      if (index == 0) {
                        dataComments.blog_id = item.blog_id;
                        return (
                          <option selected key={index} value={item.blog_title}>
                            {item.blog_title}
                          </option>
                        );
                      } else {
                        return (
                          <option key={index} value={item.blog_title}>
                            {item.blog_title}
                          </option>
                        );
                      }
                    }
                  })}
                </CSelect>
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

export default FormInputComments;
