import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ModalTeam = ({ setModalOpen, editData, getTeam }) => {
  const [name, setName] = useState("");
  const [positionEn, setPositionEn] = useState("");
  const [positionRu, setPositionRu] = useState("");
  const [positionDe, setPositionDe] = useState("");
  const [image, setImage] = useState();

  const token = localStorage.getItem("accesstoken");

  useEffect(() => {
    if (editData) {
      setName(editData.full_name || "");
      setPositionEn(editData.position_en || "");
      setPositionRu(editData.position_ru || "");
      setPositionDe(editData.position_de || "");
    }
  }, [editData]);

  // POST
    const createTeam = (event) => {
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
          getTeam();
          setModalOpen(false);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  // editModal
  // PATCH 
  const editTeam = (e) => {
  e.preventDefault();

  const formdata = new FormData();
  formdata.append("full_name", name);
  formdata.append("position_ru", positionRu);
  formdata.append("position_de", positionDe);
  formdata.append("position_en", positionEn);
  if (image) formdata.append("file", image);

  fetch(`https://back.ifly.com.uz/api/team-section/${editData?.id}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((elm) => {
      if (elm?.success === true) {
        toast.success("Team updated successfully");
        getTeam();
        setModalOpen(false);
      } else {
        toast.error("Team update failed");
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
              {editData?.id > 0 ? "Edit Team Member" : "Add Team Member"}
            </h3>
            <form onSubmit={editData?.id > 0 ? editTeam : createTeam}>
              <label
                className="block text-sm font-medium"
                htmlFor="full_name">
                Full Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="full_name"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                maxLength={50}
                value={name}
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
                value={positionEn}
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
                value={positionRu}
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
                value={positionDe}
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
  );
};

export default ModalTeam;