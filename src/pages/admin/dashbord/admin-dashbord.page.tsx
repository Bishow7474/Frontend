
import { Breadcrumb } from "antd";
const  AdminDashboard = () => {
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: "100vh"
        }}
        className="bg-white border shadow-lg shadow-amber-50 rounded-md border-gray-100"
      >
        Bill is a cat.
      </div>{" "}
    </>
  );
};

export default AdminDashboard;
