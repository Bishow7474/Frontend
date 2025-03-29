import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import {
    FaHome,
    FaImages,
    FaShoppingBag,
    FaShoppingCart,
  } from "react-icons/fa";
  import {
    FaB,
    FaMessage,
    FaSitemap,
    FaUserGroup,
  } from "react-icons/fa6";
  import { NavLink } from "react-router";
  import type { MenuProps } from "antd";

   export type MenuItem = Required<MenuProps>["items"][number];
   export function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

const items: MenuItem[] = [
  getItem(<NavLink to={"/admin"}>Dashboard</NavLink>, "1", <FaHome />),
  getItem(<NavLink to={"/admin/banner"}>Banner</NavLink>, "2", <FaImages />),
  getItem(<NavLink to={"/admin/brand"}>Brand</NavLink>, "3", <FaB />),
  getItem(
    <NavLink to={"/admin/category"}>Categories</NavLink>,
    "4",
    <FaSitemap />
  ),
  getItem(<NavLink to={"/admin/users"}>Users</NavLink>, "5", <FaUserGroup />),
  getItem(
    <NavLink to={"/admin/products"}>Products</NavLink>,
    "6",
    <FaShoppingBag />
  ),
  getItem(
    <NavLink to={"/admin/orders"}>Cart and Orders</NavLink>,
    "7",
    <FaShoppingCart />
  ),
  getItem(<NavLink to={"/admin/chat"}>Messages</NavLink>, "8", <FaMessage />),
];

const AdminSidebar = ({collapsed,setCollapsed}: {collapsed:boolean, setCollapsed:Function}) => {
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical flex m-5 items-center justify-center">
          {/* <img src="/logo.png" className='bg-gray-300 rounded-full' alt="logo" /> */}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </>
  );
};
export default AdminSidebar
