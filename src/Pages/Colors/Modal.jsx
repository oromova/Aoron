import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ModalColors = ({ setModalOpen, editData, getColor }) => {
  const [colorEn, setColorEn] = useState("");
  const [colorRu, setColorRu] = useState("");
  const [colorDe, setColorDe] = useState("");

  const token = localStorage.getItem("accesstoken");

  useEffect(() => {
    if (editData) {
      setColorEn(editData.color_en || "");
      setColorRu(editData.color_ru || "");
      setColorDe(editData.color_de || "");
    }
  }, [editData]);

  // POST
  const createColor = (event) => {
    event.preventDefault();

    fetch('https://back.ifly.com.uz/api/colors', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        color_en: colorEn,
        color_ru: colorRu,
        color_de: colorDe,
      })
    }).then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("Color created succsessfully");
          getColor();
          setModalOpen(false);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  // editModal
  // PATCH 

  const editColors = (e) => {
    e.preventDefault();
    fetch(`https://back.ifly.com.uz/api/colors/${editData?.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        color_en: colorEn,
        color_ru: colorRu,
        color_de: colorDe,
      })
    }).then((res) => res.json())
    .then((elm) => {
      if(elm?.success){
        toast.success("Color update successfully");
        getColor()
        setModalOpen(false);
      }
      else {
        toast.error("Color update failed");
      }
    }) 
  }

  return (
    <div>
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-y-auto">
        <div>
          <div className="relative bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-red-500 px-2 py-[2px] cursor-pointer rounded-full">
              X
            </button>
            <div>
              <h3 className="text-xl font-bold mb-4">
                {editData?.id > 0 ? "Edit Color" : "Add Color"}
              </h3>
              <form onSubmit={editData?.id > 0 ? editColors : createColor}>
                <label
                  htmlFor="color_en"
                  className="block mb-1 text-sm font-medium">
                  Color (EN)
                </label>
                <input
                  onChange={(e) => setColorEn(e.target.value)}
                  type="text"
                  name="color_en"
                  className="w-full p-2 border border-gray-300 rounded mb-1"
                  placeholder="Color in English"
                  maxLength={80}
                  required
                  value={colorEn}
                />
                <label htmlFor="color_ru"
                  className="block mb-1 text-sm font-medium">
                  Color (RU)
                </label>
                <input
                  onChange={(e) => setColorRu(e.target.value)}
                  type="text"
                  name="color_ru"
                  className="w-full p-2 border border-gray-300 rounded mb-1"
                  placeholder="Цвет на русском"
                  maxLength={80}
                  required
                  value={colorRu}
                />
                <label htmlFor="color_de"
                  className="block mb-1 text-sm font-medium">
                  Color (DE)
                </label>
                <input
                  onChange={(e) => setColorDe(e.target.value)}
                  type="text"
                  name="color_de" 
                  className="w-full p-2 border border-gray-300 rounded mb-1"
                  placeholder="Farbe auf Deutsch"
                  maxLength={80}
                  required
                  value={colorDe}
                />
                <button
                  type="submit"
                  className="w-full mt-4 cursor-pointer p-2 bg-green-500 text-white rounded-lg"
                >
                  {editData?.id > 0 ? "Update Color" : "Add Color"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalColors;