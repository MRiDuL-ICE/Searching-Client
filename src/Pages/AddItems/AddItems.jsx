import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AddItems = () => {
  const { user, loading, setLoading } = useAuth();
  const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    const { ...newData } = data;
    newData.date = startDate.toISOString();
    newData.contact = newData.contact.split("\n");

    axios
      .post("https://searching-server.vercel.app/items", newData)
      .then(() => {
        Swal.fire({
          title: "Item added successfully!",
          icon: "success",
        });
        e.target.reset();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed to add item",
          text: "Please try again.",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="my-10 p-2">
      <Helmet>
        <title>Searching | Add Items</title>
      </Helmet>
      <div className="md:p-14 p-8 md:w-8/12 lg:w-5/12 mx-auto border border-1 shadow-lg shadow-[#20006656] rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Items</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#210066]">
              Post Type
            </label>
            <select
              name="postType"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#210066]"
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
              placeholder="Enter Thumbnail URL"
              name="thumbnail"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#210066]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#210066]">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#210066]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#210066]">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#210066]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#210066]">
              Category
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter category e.g. pets,  documents, gadgets"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#210066]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#210066]">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#210066]"
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
              className="w-full px-3 py-2 flex justify-center items-center mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#210066]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#210066]">
              Contact Information
            </label>
            <textarea
              type="text"
              name="contact"
              defaultValue={`${user?.displayName}\n${user?.email}`}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#210066]"
            />
          </div>
          <button
            type="submit"
            className="p-3 flex items-center mx-auto bg-[#210066] hover:rounded-3xl transform transition-all duration-500 md:px-14 lg:px-14 px-3 rounded-md text-base-100 focus:ring focus:ring-[#210066]"
            disabled={loading}
          >
            {loading ? (
              <div className="w-full flex justify-center items-center mx-auto my-40">
                <span className="loading loading-bars loading-lg"></span>
              </div>
            ) : (
              "Add Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
