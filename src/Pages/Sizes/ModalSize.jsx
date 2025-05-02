import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ModalSize = ({ setModalOpen, getSize, editData }) => {

  const token = localStorage.getItem("accesstoken");
  const [size, setSize] = useState("");

  // POST
  const createSize = (event) => {
    event.preventDefault();

    fetch("https://back.ifly.com.uz/api/sizes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        size: size
      })
    }).then((res) => res.json())
      .then((elem) => {
        if (elem?.success) {
          toast.success("Size created succsessfully");
          getSize();
          setModalOpen(false);
        } else {
          toast.error(elem?.message?.message || "Something went wrong");
        }
      });
  };

  // editMODAL
  // Patch API
  const editSize = (e) => {
    e.preventDefault();
    fetch(`https://back.ifly.com.uz/api/sizes/${editData?.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        size: size
      })
    }).then((res) => res.json())
      .then((elm) => {
        if (elm?.success) {
          toast.success("Size edit successfully");
          getSize()
        } else {
          toast.error("Size edit failed");
        }
      });
  };


  return (
    <div>
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-y-auto">
        <div className="relative bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-2 right-2 text-white bg-red-500 px-2 py-[2px] cursor-pointer rounded-full">
            X
          </button>
          <div>
            <h3 className="text-xl font-bold mb-4">
              {editData?.id > 0 ? "Update Size" : "Add Size"}
            </h3>
            <form onSubmit={editData?.id > 0 ? editSize : createSize}>
              <input
                onChange={(e) => setSize(e.target.value)}
                type="text"
                placeholder="Size name"
                name="size"
                maxLength="2"
                defaultValue={editData?.id > 0 ? editData?.size : ""}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <button type="submit" className="w-full p-2 cursor-pointer bg-green-500 text-white rounded-lg">
                {editData?.id > 0 ? "Update Size" : "Add Size"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSize;