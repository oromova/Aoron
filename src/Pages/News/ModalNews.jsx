import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ModalNews = ({ setModalOpen, editData, getNews }) => {
  const [titleEn, setTitleEn] = useState("")
  const [titleRu, setTitleRu] = useState("")
  const [titleDe, setTitleDe] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")
  const [descriptionRu, setDescriptionRu] = useState("")
  const [descriptionDe, setDescriptionDe] = useState("")
  const [image, setImage] = useState();

  const token = localStorage.getItem("accesstoken");

  useEffect(() => {
    if (editData) {
      setTitleEn(editData.title_en || "");
      setTitleRu(editData.title_ru || "");
      setTitleDe(editData.title_de || "");
      setDescriptionEn(editData.description_en || "");
      setDescriptionRu(editData.description_ru || "");
      setDescriptionDe(editData.description_de || "");
    }
  }, [editData]);

  // POST
      const createNews = (event) => {
      event.preventDefault();

      const formdata = new FormData()
      formdata.append("title_en", titleEn)
      formdata.append("title_ru", titleRu)
      formdata.append("title_de", titleDe)
      formdata.append("description_en", descriptionEn)
      formdata.append("description_ru", descriptionRu)
      formdata.append("description_de", descriptionDe)
      formdata.append("file", image)
  
      fetch(`https://back.ifly.com.uz/api/news`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formdata
      }).then((res) => res.json())
        .then((item) => {
          if (item?.success) {
            toast.success("News created succsessfully");
            getNews();
            setModalOpen(false);
          } else {
            toast.error("Something went wrong");
          }
        });
    };
  
    // editModal
    // PATCH 
    const editNews = (e) => {
    e.preventDefault();
  
    const formdata = new FormData();
    formdata.append("title_en", titleEn);
    formdata.append("title_ru", titleRu);
    formdata.append("title_de", titleDe);
    formdata.append("description_en", descriptionEn);
    formdata.append("description_ru", descriptionRu);
    formdata.append("description_de", descriptionDe);
    if (image) formdata.append("file", image);

    fetch(`https://back.ifly.com.uz/api/news/${editData?.id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((elm) => {
        if (elm?.success === true) {
          toast.success("News updated successfully");
          getNews();
          setModalOpen(false);
        } else {
          toast.error("News update failed");
        }
      });
  };
  
  return (
    <div>
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-y-auto">
        <div className="relative bg-white p-6 rounded-lg max-w-2xl w-full  overflow-y-auto">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-2 right-2 text-white bg-red-500 px-2 py-[2px] cursor-pointer rounded-full">
            X
          </button>
          <div>
            <h3 className="text-xl font-bold mb-4">
              {editData?.id > 0 ? "Edit News" : "Add News"}
            </h3>
            <form onSubmit={editData?.id > 0 ? editNews : createNews}>
              <label
                className="block text-sm font-medium"
                htmlFor="titleEn">
                Title (EN)
              </label>
              <input
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                type="text"
                name="titleEn"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                maxLength={50}
              />
              <label
                className="block text-sm font-medium"
                htmlFor="titleEn">
                Title (RU)
              </label>
              <input
                onChange={(e) => setTitleRu(e.target.value)}
                type="text"
                name="titleRu"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                maxLength={50}
                value={titleRu}
              />
               <label
                className="block text-sm font-medium"
                htmlFor="titleDe">
                Title (DE)
              </label>
              <input
                onChange={(e) => setTitleDe(e.target.value)}
                type="text"
                name="titleDe"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                maxLength={50}
                value={titleDe}
              />
              <label
                className="block text-sm font-medium"
                htmlFor="description_en">
                Description (EN)
              </label>
              <input
                onChange={(e) => setDescriptionEn(e.target.value)}
                type="text"
                name="description_en"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                maxLength={50}
                value={descriptionEn}
              />
              <label
                className="block text-sm font-medium"
                htmlFor="description_ru">
                Description (RU)
              </label>
              <input
                onChange={(e) => setDescriptionRu(e.target.value)}
                type="text"
                name="description_ru"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={descriptionRu}
                maxLength={50}
              />
              <label
                className="block text-sm font-medium"
                htmlFor="description_de">
                Description (DE)
              </label>
              <input
                onChange={(e) => setDescriptionDe(e.target.value)}
                type="text"
                name="description_de"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={descriptionDe}
                maxLength={50}
              />
              <label
                className="block text-sm font-medium"
                htmlFor="file">
                Upload Image
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                accept='image/*'
                type="file"
                name="file"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                maxLength={50}
              />
              <button
                type="submit"
                className="w-full mt-4 cursor-pointer p-2 bg-green-500 text-white rounded-lg"
              >
                {editData?.id > 0 ? "Update News" : "Add News"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalNews