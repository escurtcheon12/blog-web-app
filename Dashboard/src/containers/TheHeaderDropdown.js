import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";

const Logout = () => {
  localStorage.removeItem("Login");
  localStorage.clear();
  window.location = "http://localhost:4000/#/login";
};

const TheHeaderDropdown = () => {
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <FontAwesomeIcon className="mr-2" icon={faUser} />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem onClick={() => Logout()}>
          <FontAwesomeIcon className="mr-3" icon={faRightFromBracket} />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
