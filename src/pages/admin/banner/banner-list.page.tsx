import { Button, Table } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPen, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router";

const BannerList = () => {
    // const data = [];
    const columnList = [
        {
          title: "Title",
          dataIndex: "title",
        },
        {
          title: "Link",
          dataIndex: "url",
          render: (val: string) => <a href={val}>{val}</a>,
        },
        {
          title: "Status",
          dataIndex: "status",
          render: (val: string) =>
            val === "active" ? (
              <Button variant="filled" color="green">
                Active
              </Button>
            ) : (
              <Button variant="filled" color="green">
                In-Active
              </Button>
            ),
        },
        {
          title: "Image",
          // dataIndex:"image"
          render: (_: any, row: any) => (
            <img
              className="w-28 rounded-md"
              alt=""
              src={row.image.optimized_url}
            />
          ),
        },
        {
          title: "Actions",
          render: (_: any, row: any) => (
            <>
              <div className="flex">
                <NavLink
                  className={"me-3! w-8! h-8! flex items-center justify-center text-white! bg-teal-700! rounded-full"}
                  to={"/admin/banner" + row._id}
                >
                  <FaPen />
                </NavLink>
                <NavLink
                  className={"me-3! w-8! h-8! flex items-center justify-center text-white! bg-red-700! rounded-full"}
                  to={"/admin/banner" + row._id}
                >
                  <FaTrash />
                </NavLink>
              </div>
            </>
          ),
        },
      ]
  return (
    <>
      <div className="bg-white border shadow-lg shadow-amber-50 rounded-md border-gray-100 min-h-screen p-6 mt-4">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl   text-teal-900">
            Banner List
          </h1>
          <NavLink
            to={"/admin/banner/create"}
            className={
              " bg-teal-700! border-teal-700! rounded-md hover:bg-teal-800! font-semibold text-white! p-1.5 flex items-center justify-center"
            }
          >
            <AiOutlinePlus />
            Add Banner
          </NavLink>
        </div>
      </div>

      <Table
        className="w-full"
        //dataSource={data}
        columns={columnList}
      />
    </>
  );
};

export default BannerList;
