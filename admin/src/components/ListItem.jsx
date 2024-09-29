import React, { useEffect, useState } from "react";

const ListItem = () => {
  const [products, setProducts] = useState([]);
  const all_products = async () => {
    await fetch("http://localhost:4444/allproducts")
      .then((alldata) => alldata.json())
      .then((x) => setProducts(x));
  };
  useEffect(() => {
    all_products();
  }, []);
  const removeItem = async (id) => {
    await fetch("http://localhost:4444/removeitem", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await all_products();
  };
  // const y=useEffect(()=>removeItem(),[])
  return (
    <div className="w-full md:w-3/5 md:ml-20 mr-20">
      <div className="flex justify-between w-full">
        <div>Product</div>
        <div className="hidden md:flex">Title</div>
        <div>Price</div>
        <div>Category</div>
        <div>Remove</div>
      </div>
      <div>
        {products.map((item) => {
          return (
            <div key={item.id}>
              <div className="flex justify-between w-full">
                <div className="h-16 w-14 mb-3">
                  <img src={item.pic} alt="product" className="h-16 w-14 " />
                </div>
                <div className="h-16 hidden md:flex">
                  <h1>{item.name}</h1>
                </div>
                <div className="h-16 w-14">
                  <h1>{item.price}</h1>
                </div>
                <div className="h-16 w-14">
                  <h1>{item.category}</h1>
                </div>
                <div className="h-16 w-14">
                  <button onClick={() => removeItem(item.id)}>X</button>
                </div>
              </div>
              <hr className="border-t-2 border-gray-500 w-full mt-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListItem;
