import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LostandFoundItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const axiosSecure = useAxiosSecure();
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("https://searching-server.vercel.app/allItems")
      .then((res) => {
        const data = res?.data;
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  return (
    <div>
      <Helmet>
        <title>Searching | Lost & Found Items</title>
      </Helmet>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      <div className="h-full w-full pt-6 bg-[#210066]">
        <div className="lg:w-10/12 md:w-10/12 mx-auto p-4 ">
          <div className="mb-4 flex justify-end">
            <input
              type="text"
              placeholder="Search by title or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-4 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 w-70 flex justify-end items-end"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-16 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="rounded-md w-full shadow-md overflow-hidden h-[32rem] bg-white/10 backdrop-blur-xl hover:-translate-y-2 transform transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-[20rem] object-cover rounded-md"
                  />
                  <div className="absolute top-0 left-0  p-2 px-5 rounded-r-lg bg-[#210066]/70 backdrop-blur-3xl border-none text-base-100 text-lg">
                    {item.postType}
                  </div>
                </div>
                <div className="p-2">
                  <div className="p-4 h-[6rem]">
                    <h3 className="text-xl font-bold text-base-100">
                      {item.title}
                    </h3>
                    <p className="text-base-100">{item.category}</p>
                  </div>
                  <div className="flex justify-center">
                    <Link
                      to={`/items/${item._id}`}
                      className="p-2 bg-base-100 font-bold hover:rounded-3xl transform transition-all duration-500 md:px-4 lg:px-4 px-3 rounded-md text-[#210066]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostandFoundItems;
