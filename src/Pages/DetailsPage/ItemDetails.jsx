import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Helmet } from "react-helmet";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ItemDetails = () => {
  const item = useLoaderData();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const recoveredLocation = form.get("recoveredLocation");

    const recoveredData = {
      ...item,
      recoveredLocation,
      recoveredDate: recoveredDate.toISOString(),
      recoveredBy: {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      },
    };

    axios
      .post("https://searching-server.vercel.app/recoveredItems", recoveredData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Item marked as recovered!",
          showConfirmButton: true,
        });
        setLoading(false);
        closeModal();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed to insert item",
          text: "Please try again.",
        }).finally(() => {});
      });
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Searching | Item Details</title>
      </Helmet>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      <div className="bg-white rounded-lg h-full lg:w-7/12 mx-auto shadow-xl shadow-[#210066]/55 overflow-hidden">
        <div className="relative">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-[26rem]"
          />
          <div className="absolute top-0 left-0 bg-[#210066] bg-opacity-75 backdrop-blur-md rounded-r-lg text-white px-4 py-2">
            {item.postType}
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-bold text-[#210066] mb-4">
            {item.title}
          </h2>
          <p className="text-gray-700 mb-4">{item.description}</p>
          <p className="text-gray-700 mb-4">
            <strong>Category:</strong> {item.category}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Location:</strong> {item.location}
          </p>
          <div className="bg-[#4415a8d8] text-white p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold mb-2">Contact Information</h3>
            <div>
              {item.contact.map((info, idx) => (
                <p key={idx}>{info}</p>
              ))}
            </div>
          </div>
          {item.status !== "recovered" && (
            <button
              onClick={openModal}
              className="p-3 bg-[#210066] flex justify-center lg:w-4/12 md:w-7/12 w-7/12  mx-auto hover:rounded-3xl transform transition-all duration-500 md:px-4 lg:px-4 px-3 rounded-md text-base-100"
            >
              {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
            </button>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Recovered Item Information"
      >
        <h2 className="text-2xl font-bold mb-4">Recovered Item Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recovered Location
            </label>
            <input
              type="text"
              name="recoveredLocation"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recovered Date
            </label>
            <DatePicker
              showIcon
              selected={recoveredDate}
              onChange={(date) => setRecoveredDate(date)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recovered By
            </label>
            <input
              type="text"
              value={`${user.displayName}, ${user.email}`}
              readOnly
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-16 h-16 rounded-full mt-2"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ItemDetails;
