import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://coreui.io" className="text-dark">
          Blog
        </a>
        <span className="ml-1">&copy; 2022</span>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
