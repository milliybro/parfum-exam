import LoginForm from "@/components/form/LoginForm";
import { Metadata } from "next";

import "./style.scss";

export const metadata: Metadata = {
  title: "Kirish",
  description:
    "Vodiy Parfum | Kirish",
};

const LoginPage = () => {
  return <div>
    <LoginForm/>
  </div>;
};

export default LoginPage;
