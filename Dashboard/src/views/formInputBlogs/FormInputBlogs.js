import React, { useState, useEffect, useCallback, useRef } from "react";
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CSelect,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/FormInput.css";
import ReactDOM from "react-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";

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

const StyleButton = ({ onToggle, active, label, style }) => {
  let className = "RichEditor-styleButton";
  if (active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span
      className={className}
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(style);
      }}
    >
      {label}
    </span>
  );
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

function BlockStyleControls({ editorState, onToggle }) {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

function InlineStyleControls({ editorState, onToggle }) {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

let getFullDate = (fullDate) => {
  let getDate =
    fullDate.getDate() < 10 ? "0" + fullDate.getDate() : fullDate.getDate();
  let month = fullDate.getMonth() + 1;
  let getMonth = month < 10 ? "0" + month : month;

  return fullDate.getFullYear() + "-" + getMonth + "-" + getDate;
};

const FormInputBlogs = () => {
  let objCategories = {};
  let date = new Date();
  let editStorage = JSON.parse(localStorage.getItem("editBlogs"));
  const [dataCategories, setDataCategories] = useState([]);
  const [dataBlogId, setDataBlogId] = useState(
    editStorage && editStorage.blog_id
  );
  const [dataBlog, setDataBlog] = useState({
    blog_title: editStorage ? editStorage.blog_title : "",
    blog_date: editStorage ? editStorage.blog_date : getFullDate(date),
    blog_author: editStorage ? editStorage.blog_author : "",
    blog_status: editStorage ? editStorage.blog_status : "Draft",
    category_id: (editStorage && editStorage.category_id) || 0,
  });
  const [file, setFile] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editor = useRef(null);
  const [image, setImage] = useState(
    JSON.parse(localStorage.getItem("editBlogs")) || ""
  );

  useEffect(async () => {
    if (editStorage) {
      let content = convertFromRaw(JSON.parse(editStorage.blog_content));
      setEditorState(EditorState.createWithContent(content));
    }

    await axios
      .get("http://localhost:3006/categories")
      .then((res) => {
        setDataCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onInputChange = (input, value) => {
    setDataBlog({
      ...dataBlog,
      [input]: value,
    });
  };

  const focus = () => {
    if (editor.current) editor.current.focus();
  };

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  // const customRenderMap = Map({
  //   unstyled: {
  //     element: "div",
  //     // will be used in convertFromHTMLtoContentBlocks
  //     aliasedElements: ["p"],
  //   },
  // });

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    [editorState, setEditorState]
  );

  const mapKeyToEditorCommand = useCallback(
    (e) => {
      switch (e.keyCode) {
        case 9: // TAB
          const newEditorState = RichUtils.onTab(
            e,
            editorState,
            4 /* maxDepth */
          );
          if (newEditorState !== editorState) {
            setEditorState(newEditorState);
          }
          return null;
      }
      return getDefaultKeyBinding(e);
    },
    [editorState, setEditorState]
  );

  let className = "RichEditor-editor";
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  let convertTimeToJs = (date) => {
    let a = date + "";
    let b = a.slice(0, 10).replace("T", " ");
    return b;
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);

    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const convertCategories = (item) => {
    let obj = {};

    dataCategories.map((item, index) => {
      obj[item.category_name] = item.category_id;
    });

    return obj[item];
  };

  const handleButton = (e) => {
    e.preventDefault();
    const dataContent = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    let bodyFormData = new FormData();
    bodyFormData.append("blog_content", dataContent);
    bodyFormData.append("file_image", file);

    for (const property in dataBlog) {
      bodyFormData.append(`${property}`, dataBlog[property]);
    }

    if (
      dataBlog.blog_title &&
      dataBlog.blog_date &&
      dataBlog.blog_author &&
      dataBlog.blog_status &&
      dataBlog.category_id &&
      dataContent &&
      image
    ) {
      if (JSON.parse(localStorage.getItem("editBlogs"))) {
        if (file) {
          axios
            .put("http://localhost:3006/blogs/" + dataBlogId, bodyFormData)
            .then((res) => {
              console.log(res);
              setDataBlog({
                blog_title: "",
                blog_date: getFullDate(date),
                blog_author: "",
                blog_status: "Draft",
                category_id: 0,
              });
              setImage("");
              setFile(null);
            })
            .catch((err) => console.log(err));
        } else {
          axios
            .put(
              "http://localhost:3006/blogs/updateWithoutImage/" + dataBlogId,
              bodyFormData
            )
            .then((res) => {
              console.log(res);
              setDataBlog({
                blog_title: "",
                blog_date: getFullDate(date),
                blog_author: "",
                blog_status: "Draft",
                category_id: 0,
              });
              setImage("");
              setFile(null);
            })
            .catch((err) => console.log(err));
        }
      } else {
        axios
          .post("http://localhost:3006/blogs", bodyFormData)
          .then((res) => {
            console.log(res);
            setDataBlog({
              blog_title: "",
              blog_date: getFullDate(date),
              blog_author: "",
              blog_status: "Draft",
              category_id: 0,
            });
            setImage("");
            setFile(null);
          })
          .catch((err) => console.log(err));

        for (var pair of bodyFormData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
      }

      window.location = "/#/blogs";
    } else {
      alert("Should fill the input");
    }
  };

  return (
    <>
      <CCard>
        <CCardHeader className="fw-bold headerCardTable">
          Form Blogs
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Title</CLabel>
              </CCol>
              <CCol md="9">
                <CInput
                  onChange={(e) => onInputChange("blog_title", e.target.value)}
                  value={dataBlog.blog_title}
                  id="text-input"
                  name="text-input"
                ></CInput>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Content</CLabel>
              </CCol>
              <CCol md="9">
                <div className="content-editor p-2">
                  <BlockStyleControls
                    editorState={editorState}
                    onToggle={(blockType) => {
                      const newState = RichUtils.toggleBlockType(
                        editorState,
                        blockType
                      );
                      setEditorState(newState);
                    }}
                  />
                  <InlineStyleControls
                    editorState={editorState}
                    onToggle={(inlineStyle) => {
                      const newState = RichUtils.toggleInlineStyle(
                        editorState,
                        inlineStyle
                      );
                      setEditorState(newState);
                    }}
                  />
                  <hr />
                  <div onClick={focus}>
                    <Editor
                      blockStyleFn={getBlockStyle}
                      customStyleMap={styleMap}
                      editorState={editorState}
                      keyBindingFn={mapKeyToEditorCommand}
                      handleKeyCommand={handleKeyCommand}
                      onChange={setEditorState}
                      ref={editor}
                      spellCheck={true}
                      stripPastedStyles={false}
                    />
                  </div>
                </div>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Image</CLabel>
              </CCol>
              <CCol md="9">
                <CInputFile
                  id="file_image"
                  name="file_image"
                  type="file"
                  onChange={(e) => handleFile(e)}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Date</CLabel>
              </CCol>
              <CCol md="9">
                <CInput
                  onChange={(e) => onInputChange("blog_date", e.target.value)}
                  value={convertTimeToJs(dataBlog.blog_date)}
                  type="date"
                  id="date-input"
                  name="date-input"
                  placeholder="date"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Author</CLabel>
              </CCol>
              <CCol md="9">
                <CInput
                  onChange={(e) => onInputChange("blog_author", e.target.value)}
                  value={dataBlog.blog_author}
                  id="text-input"
                  name="text-input"
                ></CInput>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="ccmonth">Status</CLabel>
              </CCol>
              <CCol md="9">
                <CSelect
                  onChange={(e) => onInputChange("blog_status", e.target.value)}
                  custom
                  name="ccmonth"
                  id="ccmonth"
                >
                  {dataBlog.blog_status ? (
                    dataBlog.blog_status == "Draft" ? (
                      <>
                        <option selected value="Draft">
                          Draft
                        </option>
                        <option value="Publish">Publish</option>
                      </>
                    ) : (
                      <>
                        <option value="Draft">Draft</option>
                        <option selected value="Publish">
                          Publish
                        </option>
                      </>
                    )
                  ) : (
                    <>
                      <option selected value="Draft">
                        Draft
                      </option>
                      <option value="Publish">Publish</option>
                    </>
                  )}
                </CSelect>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="ccmonth">Category</CLabel>
              </CCol>
              <CCol md="9">
                <CSelect
                  onChange={(e) =>
                    onInputChange(
                      "category_id",
                      convertCategories(e.target.value)
                    )
                  }
                  custom
                  name="ccmonth"
                  id="ccmonth"
                >
                  {(dataCategories || []).map((item, index) => {
                    objCategories[index] = item.category_id;

                    if (dataBlog.category_id) {
                      if (dataBlog.category_id === item.category_id) {
                        return (
                          <option
                            selected
                            key={index}
                            value={item.category_name}
                          >
                            {item.category_name}
                          </option>
                        );
                      } else {
                        return (
                          <option key={index} value={item.category_name}>
                            {item.category_name}
                          </option>
                        );
                      }
                    } else {
                      if (index == 0) {
                        dataBlog.category_id = item.category_id;
                        return (
                          <option
                            selected
                            key={index}
                            value={item.category_name}
                          >
                            {item.category_name}
                          </option>
                        );
                      } else {
                        return (
                          <option key={index} value={item.category_name}>
                            {item.category_name}
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
                {JSON.parse(localStorage.getItem("editBlogs")) ? (
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

export default FormInputBlogs;
