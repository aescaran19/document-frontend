
import Index from "@/views/Index";
import DocumentRouter from "./document.router";

export default {
    path: "",
    component: Index,
    children: [
        DocumentRouter
    ]
};