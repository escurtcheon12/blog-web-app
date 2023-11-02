import React, { useEffect, useState } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import "../assets/css/Blogs.css";

const TheHeaderDropdownNotif = () => {
  const itemsCount = 0;

  const [countUnread, setCountUnread] = useState(0);
  const [dataComment, setDataComment] = useState([]);
  const [dataBlog, setDataBlog] = useState([]);

  useEffect(async () => {
    await axios
      .get("http://localhost:3006/comments")
      .then((res) => {
        setDataComment(res.data.data);
      })
      .catch((err) => console.log(err));

    await axios
      .get("http://localhost:3006/blogs")
      .then((res) => {
        setDataBlog(res.data.data);
      })
      .catch((err) => console.log(err));

    await axios
      .post("http://localhost:3006/comments/countUnread")
      .then((res) => {
        setCountUnread(res.data.data[0].countCommentsUnread);
        itemsCount = res.data.data[0].countCommentsUnread;
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRead = () => {
    axios
      .post("http://localhost:3006/comments/updateRead")
      .then((res) => {
        console.log(res);
        setCountUnread(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const convertTimeToJs = (date) => {
    let a = date + "";
    let b = a.slice(0, 10).replace("T", " ");
    return b;
  };

  const showingDate = (itemDate) => {
    let date = new Date(itemDate);
    let getDate = date.getDate();
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let getYear = date.getFullYear();

    return getDate + " " + monthNames[date.getMonth()] + " " + getYear;
  };

  const convertBlog = (item) => {
    let obj = {};

    dataBlog.map((item, index) => {
      obj[item.blog_id] = item.blog_title;
    });

    console.log("obj", item);

    return obj[item];
  };

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2 "
      onClick={() => handleRead()}
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />

        {countUnread > 0 && (
          <CBadge shape="pill" color="danger">
            {countUnread}
          </CBadge>
        )}
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="notif pt-0">
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have {itemsCount} notifications</strong>
        </CDropdownItem>

        {(dataComment || []).map((item, index) => {
          let date = new Date(item.comment_date).toLocaleDateString();
          return (
            <CDropdownItem className="notif_item d-flex justify-content-start">
              <>
                <div className="pt-3 notif_container ">
                  <p className="mb-2">
                    {item.comment_name} has comment {item.comment_text}
                    in blog title {convertBlog(item.blog_id)}
                  </p>
                  <small className="notif_date">
                    {showingDate(convertTimeToJs(date))}

                    <hr className="notif_line" />
                  </small>
                </div>
              </>
            </CDropdownItem>
          );
        })}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
