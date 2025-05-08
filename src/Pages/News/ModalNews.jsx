import React, { useState } from 'react'
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

  // POST
      const createNews = (event) => {
      event.preventDefault();
  
      const formdata = new FormData()
      formdata.append("full_name", name)
      formdata.append("position_ru", positionRu)
      formdata.append("position_de", positionDe)
      formdata.append("position_en", positionEn)
      formdata.append("file", image)
  
      fetch(`https://back.ifly.com.uz/api/team-section`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formdata
      }).then((res) => res.json())
        .then((item) => {
          if (item?.success) {
            toast.success("Team member created succsessfully");
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
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="full_name"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                maxLength={50}
                defaultValue={editData?.full_name}
              />
              <label
                className="block text-sm font-medium"
                htmlFor="position_en">
                Position (English)
              </label>
              <input
                onChange={(e) => setPositionEn(e.target.value)}
                type="text"
                name="position_en"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                defaultValue={editData?.position_en}
                maxLength={50}
              />
              <label
                className="block text-sm font-medium"
                htmlFor="position_ru">
                Position (Russian)
              </label>
              <input
                onChange={(e) => setPositionRu(e.target.value)}
                type="text"
                name="position_ru"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                maxLength={50}
                defaultValue={editData?.position_ru}
              />
              <label
                className="block text-sm font-medium"
                htmlFor="position_de">
                Position (German)
              </label>
              <input
                onChange={(e) => setPositionDe(e.target.value)}
                type="text"
                name="position_de"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                defaultValue={editData?.position_de}
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
                {editData?.id > 0 ? "Update Team Member" : "Add Team Member"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalNews