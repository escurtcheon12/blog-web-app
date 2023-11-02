import React from "react";

const Login = React.lazy(() => import("./views/pages/login/Login"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Blogs = React.lazy(() => import("./views/blogs/Blogs"));
const Comments = React.lazy(() => import("./views/comments/Comments"));
const Categories = React.lazy(() => import("./views/categories/Categories"));
const FormInputBlogs = React.lazy(() =>
  import("./views/formInputBlogs/FormInputBlogs")
);
const FormInputComments = React.lazy(() =>
  import("./views/formInputComments/FormInputComments")
);
const FormInputCategories = React.lazy(() =>
  import("./views/formInputCategories/FormInputCategories")
);

const routes = [
  { path: "/", name: "Home" },
  { path: "/login", exact: true, name: "Login", component: Login },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/blogs", name: "Blogs", component: Blogs },
  { path: "/comments", name: "Comments", component: Comments },
  { path: "/categories", name: "Categories", component: Categories },
  {
    path: "/formInputBlogs",
    name: "FormInputBlogs",
    component: FormInputBlogs,
  },
  {
    path: "/formInputComments",
    name: "FormInputComments",
    component: FormInputComments,
  },
  {
    path: "/formInputCategories",
    name: "FormInputCategories",
    component: FormInputCategories,
  },
];

export default routes;
