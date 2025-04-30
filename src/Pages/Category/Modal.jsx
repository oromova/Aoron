import { useState } from "react";
import { toast } from "react-toastify";

const ModalCategory = ({ setModalOpen, getCategory, editData }) => {
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameDe, setNameDe] = useState("");
  const token = localStorage.getItem("accesstoken");

  // POST
  const createCategory = (event) => {
    event.preventDefault();

    fetch("https://back.ifly.com.uz/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name_en: nameEn,
        name_de: nameDe,
        name_ru: nameRu,
      })
    }).then((res) => res.json())
      .then((elem) => {
        if (elem?.success) {
          toast.success("Category created succsessfully");
          getCategory();
          setModalOpen(false);
        } else {
          toast.error(elem?.message?.message || "Something went wrong");
        }
      });
  };

  // editMODAL

  // Patch API
  const editCategory = (e) => {
    e.preventDefault();
    fetch(`https://back.ifly.com.uz/api/category/${editData?.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name_en: nameEn,
        name_ru: nameRu,
        name_de: nameDe
      })
    }).then((res) => res.json())
      .then((elm) => {
        if (elm?.success) {
          toast.success("category edit successfully");
          getCategory();
          setClickData("");
          setModalOpen(false);
        } else {
          toast.error("category edit failed");
        }
      });
  };


  return (
    <div>
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-y-auto">
        <div>
          <div className="relative bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-red-500 px-2 py-[2px] cursor-pointer rounded-full">X</button>
            <div>
              <h3 className="text-xl font-bold mb-4">
                {editData?.id > 0 ? "Update Category" : "Add Category"}
              </h3>
              <form onSubmit={editData?.id > 0 ? editCategory : createCategory}>
                <label
                  htmlFor="name_en"
                  className="block mb-1 text-sm font-medium">
                  Category Name (EN)
                </label>
                <input
                  onChange={(e) => setNameEn(e.target.value)}
                  type="text"
                  name="name_en"
                  className="w-full p-2 border border-gray-300 rounded mb-1"
                  placeholder="English name"
                  defaultValue={editData?.id > 0 ? editData?.name_en : ""}
                  maxLength={80}
                  required
                  value={nameEn || ""}
                />
                <label htmlFor="name_de"
                  className="block mb-1 text-sm font-medium">
                  Category Name (RU)
                </label>
                <input
                  onChange={(e) => setNameRu(e.target.value)}
                  type="text"
                  name="name_ru"
                  className="w-full p-2 border border-gray-300 rounded mb-1"
                  placeholder="Russian name"
                  defaultValue={editData?.id > 0 ? editData?.name_ru : ""}
                  maxLength={80}
                  required
                  value={nameRu || ""}
                />
                <label htmlFor="name_de"
                  className="block mb-1 text-sm font-medium">
                  Category Name (DE)
                </label>
                <input
                  onChange={(e) => setNameDe(e.target.value)}
                  type="text"
                  name="name_de"
                  className="w-full p-2 border border-gray-300 rounded mb-1"
                  placeholder="German name"
                  defaultValue={editData?.id > 0 ? editData?.name_de : ""}
                  maxLength={80}
                  required
                  value={nameDe || ""}
                />
                <button
                  type="submit"
                  className="w-full mt-4 cursor-pointer p-2 bg-green-500 text-white rounded-lg"
                >
                  {editData?.id > 0 ? "Update Category" : "Add Category"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCategory;