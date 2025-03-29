import {  useState } from "react";
import {} from "@ant-design/icons";
import { Layout} from "antd";
import { Outlet} from "react-router";
import AdminSidebar from "../../components/sidebar/sidebar.components";
import UserHeader from "../../components/header/user-header.components";

const {  Content, Footer, } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <Layout>
        <UserHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ecommerce ©{new Date().getFullYear()} Created by Bishwo Mohan
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
