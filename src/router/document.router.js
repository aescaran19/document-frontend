import DocumentView from "../views/Document";
import Document from "../components/document/document";
import Form from "../components/document/form";
import { Role } from "../helpers/common.helper";
export default {
  path: "/documents",
  component: DocumentView,
  children: [
    {
      path: "",
      component: Document,
      name: "documents",
      meta: { auth: true, role: [] },
    },
    {
      path: "add",
      component: Form,
      name: "form",
      meta: { auth: true, role: [Role.Admin] },
    },
    {
      path: "edit/:id",
      component: Form,
      name: "edit-document",
      meta: { auth: true, role: [Role.Admin] },
    },
  ],
};
