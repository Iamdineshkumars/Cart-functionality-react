import React, { useState } from "react";
import products from "./data";
import cartsvg from "./assets/images/icon-add-to-cart.svg";
import cake from "./assets/images/illustration-empty-cart.svg";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ProductList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (index, image, price, name, quantity) => {
    const items = {
      index: index,
      price: price,
      image: image,
      name: name,
      quantity: quantity,
    };

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.index === index);
      if (!existingItem) {
        return [...prev, items];
      } else {
        return prev;
      }
    });
  };

  const handleIncrement = (indexValue, price) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.index === indexValue
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const handleDecrement = (indexValue) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.index === indexValue
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
  const totalCount = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  return (
    <>
      <div className="main min-h-screen p-4 md:p-8">
        <div className="lg:px-25 py-10  mx-auto">
          <div>
            <h2 className="text-4xl font-bold mb-8">Desserts</h2>
          </div>
          <div className="flex flex-col lg:flex-row  gap-2">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product, index) => {
                const cartProduct = cartItems.find(
                  (item) => item.index === index,
                );

                return (
                  <div key={index}>
                    <div className="relative">
                      {/* image section */}
                      <img
                        src={product.image}
                        className="w-full h-64 object-cover rounded-xl"
                      />

                      {cartProduct ? (
                        <div
                          className="w-36 absolute cursor-pointer left-1/2
                    bottom-0 -translate-x-1/2 translate-y-1/2
                    flex items-center justify-center
                    bg-red-500 text-white border border-red-400
                    rounded-full px-1 py-2 shadow-md"
                        >
                          <button
                            className="px-5 cursor-pointer"
                            onClick={() =>
                              handleDecrement(index, product.price)
                            }
                          >
                            -
                          </button>
                          <span>{cartProduct?.quantity}</span>
                          <button
                            className="px-5 cursor-pointer"
                            onClick={() =>
                              handleIncrement(index, product.price)
                            }
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="w-36 absolute cursor-pointer left-1/2
                    bottom-0 -translate-x-1/2 translate-y-1/2
                    flex items-center justify-center
                    bg-white border border-red-400
                    rounded-full px-1 py-2 shadow-md"
                          onClick={() =>
                            handleClick(
                              index,
                              product.image,
                              product.price,
                              product.name,
                              1,
                            )
                          }
                        >
                          <img src={cartsvg} alt="Cart" className="w-5 h-5" />

                          <span className="text-xs ml-1">Add to Cart</span>
                        </button>
                      )}
                    </div>

                    <div className="mt-8">
                      <p className="text-xs text-slate-500">
                        {product.category}
                      </p>
                      <h3 className="font-bold ">{product.name}</h3>

                      <h2 className="text-red-700">
                        ${product.price.toFixed(2)}
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full lg:w-80 bg-white rounded-xl p-6 shadow-sm h-fit lg:sticky lg:top-5 ">
              <h1 className="text-2xl font-bold text-red-600">
                Your Cart ({cartItems.length})
              </h1>

              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <img src={cake} alt="Empty Cart" className="w-36" />

                  <p className="text-gray-500 text-center text-sm mt-4">
                    Your added items will appear here
                  </p>
                </div>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <div
                      key={item.index}
                      className="flex items-center justify-between py-4 border-b border-slate-300"
                    >
                      {/* Image + Product details */}
                      <div className="flex items-center gap-3 text-left">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />

                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>

                          <p className="text-xs text-gray-500 mt-1">
                            <span className="text-red-600 font-semibold">
                              {item.quantity}
                            </span>
                            {" × "}${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Total */}
                      <p className="text-sm font-semibold">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="mt-3 flex justify-between">
                    <span className="font-bold">Total Amount:</span>{" "}
                    <span>${totalCount}</span>
                  </div>
                  <div>
                    <button
                      className="border rounded-2xl bg-red-500 text-white w-full mt-3 px-5 py-3 cursor-pointer"
                      onClick={handleClickOpen}
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          className: "rounded-2xl overflow-hidden",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Confirm Your Order
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Review your items before placing the order
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full 
                 hover:bg-slate-200 text-slate-500 hover:text-slate-800 
                 transition cursor-pointer text-xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <DialogContent className="!p-0">
          <div className="px-6 max-h-[55vh] overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="py-10 text-center text-slate-500">
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm mt-1">Add some products to continue.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.index}
                  className="flex items-center justify-between gap-4 
                       py-4 border-b border-slate-200"
                >
                  {/* Image + Product details */}
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl 
                           border border-slate-200 shrink-0"
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {item.name}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="px-2 py-0.5 rounded-md bg-red-50 
                               text-red-600 text-xs font-semibold"
                        >
                          Qty: {item.quantity}
                        </span>

                        <span className="text-xs text-slate-500">
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Item Total */}
                  <p className="text-sm font-bold text-slate-800 whitespace-nowrap">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
        </DialogContent>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-6 py-5 bg-slate-50 border-t">
            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-medium text-slate-600">
                Total Amount
              </span>

              <span className="text-2xl font-bold text-slate-900">
                $
                {cartItems
                  .reduce(
                    (total, item) => total + item.quantity * item.price,
                    0,
                  )
                  .toFixed(2)}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="w-1/3 py-3 rounded-xl border border-slate-300
                     text-slate-700 font-semibold
                     hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleClickOpen}
                className="flex-1 py-3 rounded-xl
                     bg-red-500 text-white font-semibold
                     hover:bg-red-600
                     active:scale-[0.98]
                     transition cursor-pointer shadow-sm"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default ProductList;
