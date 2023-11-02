import React, { useState, useEffect } from "react";
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
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/Blogs.css";

const fields = ["No", "Name", "Description"];

const Categories = () => {
  const [dataCategories, setDataCategories] = useState([]);

  useEffect(async () => {
    localStorage.clear();
    localStorage.removeItem("editBlogs");

    await axios
      .get("http://localhost:3006/categories")
      .then((res) => {
        setDataCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigationForm = (item) => {
    if (item) {
      localStorage.setItem("editCategories", JSON.stringify(item));
    }
    window.location = "/#/formInputCategories";
  };

  const handleDelete = (itemID) => {
    axios
      .delete("http://localhost:3006/categories/" + itemID)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    const newDataCategories = dataCategories.filter((item, index) => {
      return item.category_id !== itemID;
    });

    setDataCategories(newDataCategories);
  };

  return (
    <>
        <CCard>
          <CCardHeader className="fw-bold headerCardTable">
            Categories List
          </CCardHeader>
          <CCardBody>
            <CButton
              onClick={() => navigationForm()}
              className="btn btn-outline-dark mb-2"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add New
            </CButton>
            <CDataTable
              items={dataCategories}
              fields={fields}
              itemsPerPage={6}
              pagination
              scopedSlots={{
                No: (item, index) => {
                  let i = 1;
                  return (
                    <td className="py-2">
                      <p>{i + index}</p>
                    </td>
                  );
                },
                Name: (item, index) => {
                  return (
                    <td className="py-2">
                      <p>{item.category_name}</p>
                    </td>
                  );
                },
                Description: (item, index) => {
                  return (
                    <td className="py-2">
                      <p>
                        <CButton
                          onClick={() => handleDelete(item.category_id)}
                          className="btn btn-danger"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className=" text-white"
                          />
                        </CButton>

                        <CButton
                          onClick={() => navigationForm(item)}
                          className="btn btn-success ml-2"
                        >
                          <FontAwesomeIcon
                            icon={faPencil}
                            className="text-white"
                          />
                        </CButton>
                      </p>
                    </td>
                  );
                },
              }}
            />
          </CCardBody>
        </CCard>
      </>
  );
};

export default Categories;
