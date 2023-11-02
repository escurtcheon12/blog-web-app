import React, { useEffect, useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetProgressIcon,
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faMagnifyingGlass,
  faComment,
  faEye,
  faBarsProgress,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";
import "../../assets/css/Widgets.css";
import axios from "axios";

const WidgetsDropdown = () => {
  const [countBlogs, setCountBlogs] = useState(0);
  const [countCategories, setCountCategories] = useState(0);
  const [countComments, setCountComments] = useState(0);
  const [countViewers, setCountViewers] = useState(0);
  const [countDrafts, setCountDrafts] = useState(0);
  const [countPublished, setCountPublished] = useState(0);

  let c = 0;

  useEffect(() => {
    axios
      .post("http://localhost:3006/blogs/count")
      .then((res) => {
        setCountBlogs(res.data.data[0].countBlogs);
      })
      .catch((err) => console.log(err));

    axios
      .post("http://localhost:3006/categories/count")
      .then((res) => {
        setCountCategories(res.data.data[0].countCategories);
      })
      .catch((err) => console.log(err));

    axios
      .post("http://localhost:3006/comments/count")
      .then((res) => {
        setCountComments(res.data.data[0].countComments);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3006/blogs/countViewer")
      .then((res) => {
        setCountViewers(res.data.data);
      })
      .catch((err) => console.log(err));

    axios
      .post("http://localhost:3006/blogs/countDrafts")
      .then((res) => {
        setCountDrafts(res.data.data[0].countDrafts);
      })
      .catch((err) => console.log(err));

    axios
      .post("http://localhost:3006/blogs/countPublished")
      .then((res) => {
        setCountPublished(res.data.data[0].countPublished);
      })
      .catch((err) => console.log(err));
  }, []);

  const countView = () => {
    let result = 0;

    (countViewers || []).map((item, index) => {
      result += item.viewer_id;
    });

    return result;
  };

  // render
  return (
    <div className="parentWidgets mb-3">
      <CWidgetProgressIcon
        className="shapeWidgets blogsWidgets"
        header={countBlogs}
        text="Blogs"
        color="gradient-primary"
        inverse
      >
        <FontAwesomeIcon icon={faPencil} />
      </CWidgetProgressIcon>
      <CWidgetProgressIcon
        className="shapeWidgets categoriesWidgets"
        header={countCategories}
        text="Categories"
        color="gradient-info"
        inverse
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </CWidgetProgressIcon>

      <CWidgetProgressIcon
        className="shapeWidgets commentsWidgets"
        header={countComments}
        text="Comments"
        color="gradient-warning"
        inverse
      >
        <FontAwesomeIcon icon={faComment} />
      </CWidgetProgressIcon>

      <CWidgetProgressIcon
        className="shapeWidgets viewsWidgets"
        header={countView()}
        text="Viewers"
        color="gradient-danger"
        inverse
      >
        <FontAwesomeIcon icon={faEye} />
      </CWidgetProgressIcon>

      <CWidgetProgressIcon
        className="shapeWidgets draftsWidgets"
        header={countDrafts}
        text="Drafts"
        color="gradient-success"
        inverse
      >
        <FontAwesomeIcon icon={faBarsProgress} />
      </CWidgetProgressIcon>

      <CWidgetProgressIcon
        className="shapeWidgets publishedWidgets"
        header={countPublished}
        text="Published"
        color="gradient-dark"
        inverse
      >
        <FontAwesomeIcon icon={faCheck} />
      </CWidgetProgressIcon>
    </div>
  );
};

export default WidgetsDropdown;
