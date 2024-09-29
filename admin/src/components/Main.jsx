import React, { useState } from "react";
import upload_icon from "../assets/upload.png";
const Main = () => {
  const [image, setImage] = useState(false);
  const [productDetail, setProductDetail] = useState({
    name: "",
    category: "",
    price: "",
    pic: "",
  });
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const addItems = async () => {
    let responseData;
    let product = { ...productDetail, price: Number(productDetail.price) };
    const formData = new FormData();
    formData.append("product", image);
    await fetch("http://localhost:4444/upload", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      product.pic = responseData.image_url;
    }

    await fetch("http://localhost:4444/addfiletodb", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        data.success ? alert("uploaded succesfully") : alert("failed");
      });
  };

  return (
    <div className="bg-white h-screen w-full md:w-1/2">
      <div className="flex flex-col ml-10 gap-2 mt-8">
        <label htmlFor="title" className="font-bold">
          Product Title
        </label>
        <input
          type="text"
          name="product-title"
          onChange={(e) =>
            setProductDetail({ ...productDetail, name: e.target.value })
          }
          id="title"
          placeholder="Type here"
          className="border-2 border-gray-200 w-3/4 outline-none py-3 px-1 rounded-2xl"
        />
      </div>
      <div className="flex flex-col ml-10 gap-2 mt-8">
        <label htmlFor="title" className="font-bold">
          Price
        </label>
        <input
          type="text"
          name="product-price"
          onChange={(e) =>
            setProductDetail({ ...productDetail, price: e.target.value })
          }
          id="price"
          placeholder="Type here"
          className="border-2 border-gray-200 w-3/4 outline-none py-3 px-1 rounded-2xl"
        />
      </div>
      <div className="flex flex-col ml-10 gap-2 mt-8">
        <label htmlFor="category" className="font-bold">
          Product Category
        </label>
        <select
          name="category"
          id="category"
          onChange={(e) =>
            setProductDetail({ ...productDetail, category: e.target.value })
          }
          className="w-48 outline-none border-4 border-gray-200 "
        >
          <option value="">Select a category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kid</option>
          <option value="popular">Popular</option>
        </select>
      </div>
      <div className="flex flex-col ml-10 gap-2 mt-8">
        <label htmlFor="file">
          <img
            src={image ? URL.createObjectURL(image) : upload_icon}
            alt="file"
            className="h-16"
          />
        </label>
        <input
          type="file"
          name="product"
          id="file"
          hidden
          onChange={handleImage}
        />
      </div>
      <div className="flex flex-col ml-10 gap-2 mt-8">
        <button
          className="bg-blue-500 py-3 px-8 w-36 text-white rounded-2xl "
          onClick={() => addItems()}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Main;
