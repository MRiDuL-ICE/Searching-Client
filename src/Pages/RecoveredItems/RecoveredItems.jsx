import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTable, FaTh } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import { RiFileList2Line } from "react-icons/ri";
import { FaTag } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlinePlace } from "react-icons/md";

const RecoveredItems = () => {
  const { user } = useAuth();
  console.log(user);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(
        `https://searching-server.vercel.app/recoveredItems?email=${user.email}`
      )
      .then((res) => {
        const data = res?.data;
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [user.email]);

  return (
    <div>
      <Helmet>
        <title>Searching | All Recovered Items</title>
      </Helmet>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      <div className="lg:w-10/12 mx-auto p-4 h-screen mb-32">
        <div className="text-left">
          <div className="flex justify-end mb-4 border-2 rounded-md p-2">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 mx-2 ${
                viewMode === "table" ? "bg-gray-300" : "bg-gray-100"
              } rounded-md`}
            >
              <FaTable size={24} />
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 mx-2 ${
                viewMode === "card" ? "bg-gray-300" : ""
              } rounded-md`}
            >
              <FaTh size={24} />
            </button>
          </div>
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#210066]/25 border-b">
                  <tr>
                    <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase text-sm">
                      <div className="flex items-center gap-2">
                        <AiOutlineNumber className="text-blue-600" />
                        Index
                      </div>
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase text-sm">
                      <div className="flex items-center gap-2">
                        <RiFileList2Line className="text-blue-600" />
                        Title
                      </div>
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase text-sm">
                      <div className="flex items-center gap-2">
                        <FaTag className="text-blue-600" />
                        Category
                      </div>
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase text-sm">
                      <div className="flex items-center gap-2">
                        <HiOutlineLocationMarker className="text-blue-600" />
                        Location
                      </div>
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase text-sm">
                      <div className="flex items-center gap-2">
                        <MdOutlinePlace className="text-blue-600" />
                        Recovered Location
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="py-3 px-6 border-b text-gray-700">
                        <AiOutlineNumber className="inline-block mr-2 text-gray-600" />
                        {index + 1}
                      </td>
                      <td className="py-3 px-6 border-b text-gray-700">
                        <RiFileList2Line className="inline-block mr-2 text-gray-600" />
                        {item.title}
                      </td>
                      <td className="py-3 px-6 border-b">
                        <span className="bg-yellow-200 text-yellow-800 p-1 px-4 rounded-full font-medium text-sm flex items-center gap-2">
                          <FaTag />
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-6 border-b text-gray-700">
                        <HiOutlineLocationMarker className="inline-block mr-2 text-gray-600" />
                        {item.location}
                      </td>
                      <td className="py-3 px-6 border-b text-gray-700">
                        <MdOutlinePlace className="inline-block mr-2 text-gray-600" />
                        {item.recoveredLocation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[58rem] overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white h-[13rem] rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <div className="text-gray-600 mb-3 flex items-center gap-2">
                    <FaTag className="text-blue-500" />
                    <strong>Category:</strong> {item.category}
                  </div>
                  <div className="text-gray-600 mb-3 flex items-center gap-2">
                    <HiOutlineLocationMarker className="text-green-500" />
                    <strong>Location:</strong> {item.location}
                  </div>
                  <div className="text-gray-600 flex items-center gap-2">
                    <MdOutlinePlace className="text-red-500" />
                    <strong>Recovered Location:</strong>{" "}
                    {item.recoveredLocation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecoveredItems;
