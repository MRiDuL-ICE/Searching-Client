import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTable, FaTh } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import { RiFileList2Line } from "react-icons/ri";
import { FaTag } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlinePlace, MdModeEdit, MdDelete } from "react-icons/md";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "800px",
    height: "90%",
    maxHeight: "600px",
  },
};

Modal.setAppElement("#root");

const MyItems = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    setLoading(true);
    if (user?.email) {
      axiosSecure
        .get(`/myItems?email=${user.email}`)
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user.email]);

  const openModal = (item) => {
    setSelectedItem(item);
    setStartDate(item.date ? new Date(item.date) : new Date());
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    const { ...updatedData } = data;
    updatedData.date = startDate.toISOString();
    updatedData.contact = updatedData.contact.split("\n");

    axiosSecure
      .put(
        `https://searching-server.vercel.app/items/${selectedItem._id}?email=${user.email}`,
        updatedData
      )
      .then(() => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === selectedItem._id ? { ...item, ...updatedData } : item
          )
        );
        Swal.fire({
          title: "Item updated successfully!",
          icon: "success",
        });
        closeModal();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed to update item",
          text: "Please try again.",
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(
            `https://searching-server.vercel.app/items/${id}?email=${user.email}`
          )
          .then(() => {
            setItems(items.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error!", "Failed to delete item.", "error");
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Searching | My Items</title>
      </Helmet>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      <div className="lg:w-10/12 mx-auto p-4 h-screen mb-32">
        <div className="text-center">
          <div className="flex justify-end mb-4 border-2 rounded-md p-2">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 mx-2 ${
                viewMode === "table" ? "bg-gray-300" : ""
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
                        <AiOutlineNumber className="text-blue-600 text-lg" />
                        Index
                      </div>
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase text-sm">
                      <div className="flex items-center gap-2">
                        <RiFileList2Line className="text-blue-600 text-lg" />
                        Title
                      </div>
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase text-sm">
                      <div className="flex items-center gap-2">
                        <FaTag className="text-blue-600 text-lg" />
                        Category
                      </div>
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase text-sm">
                      <div className="flex items-center gap-2">
                        <HiOutlineLocationMarker className="text-blue-600 text-lg" />
                        Location
                      </div>
                    </th>
                    <th className="py-3 px-6 text-center text-gray-600 font-bold uppercase text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`hover:bg-gray-50 transition duration-200 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="py-3 px-6 border-b text-gray-700">
                        <div className="flex items-center gap-2">
                          <AiOutlineNumber className="text-gray-600" />
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-3 px-6 border-b text-gray-700">
                        <div className="flex items-center gap-2">
                          <RiFileList2Line className="text-gray-600" />
                          {item.title}
                        </div>
                      </td>
                      <td className="py-3 px-6 border-b">
                        <span className="bg-yellow-200 text-yellow-800 p-1 px-4 rounded-full font-medium text-sm flex items-center gap-2">
                          <FaTag />
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-6 border-b text-gray-700">
                        <div className="flex items-center gap-2">
                          <HiOutlineLocationMarker className="text-gray-600" />
                          {item.location}
                        </div>
                      </td>
                      <td className="py-3 px-6 border-b">
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => openModal(item)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center gap-2"
                          >
                            <MdModeEdit />
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center gap-2"
                          >
                            <MdDelete />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[58rem] overflow-y-auto mb-10">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg h-[16rem] shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <RiFileList2Line className="text-blue-600" />
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
                  <div className="text-gray-600 flex items-center gap-2 mb-4">
                    <MdOutlinePlace className="text-red-500" />
                    <strong>Recovered Location:</strong>{" "}
                    {item.recoveredLocation}
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => openModal(item)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center gap-2"
                    >
                      <MdModeEdit />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center gap-2"
                    >
                      <MdDelete />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Update Item"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-[#210066]">
            Update Item
          </h2>
          {selectedItem && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#210066]">
                  Post Type
                </label>
                <select
                  name="postType"
                  defaultValue={selectedItem.postType}
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#210066]">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  defaultValue={selectedItem.thumbnail}
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#210066]">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedItem.title}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#210066]">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedItem.description}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#210066]">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  defaultValue={selectedItem.category}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#210066]">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={selectedItem.location}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#210066]">
                  Date
                </label>
                <DatePicker
                  showIcon
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#210066]">
                  Contact Information
                </label>
                <textarea
                  name="contact"
                  defaultValue={`${user.displayName}\n${user.email}`}
                  readOnly
                  rows="2"
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-[#210066] w-full md:w-2/12 mx-auto flex justify-center hover:rounded-3xl transform transition-all duration-500 md:px-4 lg:px-4 px-3 rounded-md text-base-100"
              >
                Update
              </button>
            </form>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MyItems;
