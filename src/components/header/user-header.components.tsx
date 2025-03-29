import { Header } from "antd/es/layout/layout";
import { MenuItem, getItem } from "../sidebar/sidebar.components";
import {theme,Button,Dropdown,Space} from 'antd'
import {MenuUnfoldOutlined,MenuFoldOutlined,DownOutlined} from "@ant-design/icons"
import {FaKey,FaPowerOff,FaUser, } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import  {AuthContext} from "../../context/auth.context"
import {toast} from "react-toastify"
import { useNavigate } from "react-router";

//type MenuItem = Required<MenuProps>["items"][number];


const userMenu: MenuItem[] = [
  getItem("Profile", "1", <FaUser />),
  getItem("Change Password", "2", <FaKey />),
  getItem("Logout", "3", <FaPowerOff />),
];

const UserHeader = ({collapsed,setCollapsed}: {collapsed:boolean, setCollapsed:Function}) => {
    const {loggedInUser} = useContext<any>(AuthContext)
    const { token: { colorBgContainer }, } = theme.useToken();
    const navigate = useNavigate();

    useEffect(() => {
        if(!loggedInUser) {
          toast.error("Please Login First");
          navigate("/")
        }
        //console.log(loggedInUser);
      },[loggedInUser])
  return (
    <>
      <Header
        style={{ padding: 0, background: colorBgContainer }}
        className="flex! justify-between!"
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Dropdown menu={{ items: userMenu }} className="me-3!">
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <div className="border border-amber-600 shadow-md shadow-amber-800 rounded-full">
                <img
                  className="w-12 rounded-full"
                  src={loggedInUser?.image?.optimized_url}
                  alt={loggedInUser?.name}
                />
              </div>
              {loggedInUser?.name}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Header>
    </>
  );
};

export default UserHeader
