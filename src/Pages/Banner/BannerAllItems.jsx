import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link, Links } from "react-router-dom";

const BannerAllItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://searching-server.vercel.app/items")
      .then((res) => {
        const data = res?.data;
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="h-full w-full pt-6 bg-[#210066]">
      <div className="lg:w-10/12 md:w-10/12 mx-auto p-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-16 gap-6">
          {items.map((item) => (
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
        <div className="flex justify-center my-6">
          <Link to={"/allItems"}>
            <button className="p-4 bg-white font-bold hover:rounded-3xl transform transition-all duration-500 md:px-16 lg:px-16 px-8 rounded-md text-[#210066]">
              See More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerAllItems;
