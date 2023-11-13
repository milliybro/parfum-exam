import { Metadata } from "next";
import AccountForm from "@/components/form/AccountForm";

import "./style.scss";

export const metadata: Metadata = {
  title: "Vodiy parfum | Ma`lumotlarim",
  description:
    "Vodiy parfum",
};

const AccountPage = () => {
  return <div>
    <AccountForm/>
  </div>;
};

export default AccountPage;
