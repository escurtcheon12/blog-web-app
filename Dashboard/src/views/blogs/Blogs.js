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
  CImg,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/Blogs.css";
import { cibWindows } from "@coreui/icons";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";

const fields = [
  "No",
  "Title",
  "Content",
  "Image",
  "Date",
  "Author",
  "Status",
  "Category",
  "Views",
  "Description",
];

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const Blogs = () => {
  const [dataBlog, setDataBlog] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(async () => {
    localStorage.clear();
    localStorage.removeItem("editBlogs");

    await axios
      .get("http://localhost:3006/blogs")
      .then((res) => {
        setDataBlog(res.data.data);
      })
      .catch((err) => console.log(err));

    await axios
      .get("http://localhost:3006/categories")
      .then((res) => {
        setDataCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const convertTimeToJs = (date) => {
    let a = date + "";
    let b = a.slice(0, 10).replace("T", " ");
    return b;
  };

  const convertCategories = (item) => {
    let obj = {};

    (dataCategories || []).map((item, index) => {
      obj[item.category_id] = item.category_name;
    });

    return obj[item];
  };

  const navigationForm = (item) => {
    if (item) {
      localStorage.setItem("editBlogs", JSON.stringify(item));
    }
    window.location = "/#/formInputBlogs";
  };

  const handleDelete = (itemID) => {
    axios
      .delete("http://localhost:3006/blogs/" + itemID)
      .then((res) => {
        console.log(res);
        console.log("Success");
      })
      .catch((err) => console.log(err));

    const newDataBlogs = dataBlog.filter((item, index) => {
      return item.blog_id !== itemID;
    });

    setDataBlog(newDataBlogs);
  };

  return (
    <>
      <CCard>
        <CCardHeader className="fw-bold headerCardTable">Blog List</CCardHeader>
        <CCardBody>
          <CButton
            onClick={() => navigationForm()}
            className="btn btn-outline-dark mb-2"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New
          </CButton>
          <CDataTable
            items={dataBlog}
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
              Title: (item, index) => {
                return (
                  <td className="py-2">
                    <p>{item.blog_title}</p>
                  </td>
                );
              },
              Content: (item, index) => {
                return (
                  <td className="py-2">
                    <p className="parag_length">
                      {item.blog_content &&
                        JSON.parse(item.blog_content).blocks[0].text}
                    </p>
                  </td>
                );
              },
              Image: (item, index) => {
                return (
                  <td className="py-2">
                    <CImg
                      className="img_list_blog"
                      src={`http://localhost:3006/public/uploads/blogs/${item.blog_image}`}
                    />
                  </td>
                );
              },
              Date: (item, index) => {
                let arr = [];
                let push = [...arr, item.blog_date];
                return (
                  <td className="py-2">
                    {push.map((item) => {
                      let date = new Date(item).toLocaleDateString();
                      return convertTimeToJs(date);
                    })}
                  </td>
                );
              },
              Author: (item, index) => {
                return (
                  <td className="py-2">
                    <p>{item.blog_author}</p>
                  </td>
                );
              },
              Status: (item, index) => {
                return (
                  <td className="py-2">
                    <p>{item.blog_status}</p>
                  </td>
                );
              },
              Category: (item, index) => {
                return (
                  <td className="py-2">
                    <p>{convertCategories(item.category_id)}</p>
                  </td>
                );
              },
              Views: (item, index) => {
                return (
                  <td className="py-2">
                    <p>{item.viewer_id}</p>
                  </td>
                );
              },
              Description: (item, index) => {
                return (
                  <td className="py-2">
                    <p>
                      <CButton
                        onClick={() => handleDelete(item.blog_id)}
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

export default Blogs;
