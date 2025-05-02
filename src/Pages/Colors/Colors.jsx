import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalColors from './Modal';
import { toast } from 'react-toastify';

const Colors = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("accesstoken");

  // LOG OUT
  const logoutFunc = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      navigate("/login");
    }
  };

  // GET COLORS
  const getColor = () => {
    fetch("https://back.ifly.com.uz/api/colors")
      .then((res) => res.json())
      .then((item) => setData(item?.data));
  };

  useEffect(() => {
    getColor();
  }, []);

  //  DELETE COLORS
  const deleteColors = (id) => {
    fetch(`https://back.ifly.com.uz/api/colors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    .then((res) => res.json())
    .then((item) => {
      if (item?.success) {
        toast.success(item?.data);
        getColor();
      } else {
        toast.error("Something went wrong");
      }
      setConfirmModal(false);
      setSelectedId(null);
    });
  };

  return (
    <section>
      {/* Log out */}
      <div className='flex mr-6 mt-4 justify-end py-2 w-full'>
        <button
          className='bg-red-600 px-4 py-2 text-white rounded-lg text-right cursor-pointer hover:bg-red-600 transition mr-7'
          onClick={logoutFunc}>
          Log Out
        </button>
      </div>

      {/* Table */}
      <div className='p-6'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='flex justify-between'>
            <h2 className='text-xl font-bold mb-6'>
              Colors
            </h2>
            <button
              onClick={() => {
                setModalOpen(true);
                setEditData(null);
              }}
              className='cursor-pointer mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition'>
              Add Color
            </button>
          </div>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>№</th>
                <th className='border border-gray-300 p-2'>Colors ENG</th>
                <th className='border border-gray-300 p-2'>Colors RU</th>
                <th className='border border-gray-300 p-2'>Colors DE</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr
                  key={index}
                  className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>
                    {index + 1}
                  </td>
                  <td className='border border-gray-300 p-2'>
                    {item?.color_en}
                  </td>
                  <td className='border border-gray-300 p-2'>
                    {item?.color_ru}
                  </td>
                  <td className='border border-gray-300 p-2'>
                    {item?.color_de}
                  </td>
                  <td className='border border-gray-300 p-2 w-[200px]'>
                    <button
                      onClick={() => {
                        setModalOpen(true);
                        setEditData(item);
                      }}
                      className='px-4 py-2 mr-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition cursor-pointer'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setConfirmModal(true);
                        setSelectedId(item?.id);
                      }}
                      className='px-4 py-2 mr-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Confirm Delete Modal */}
          {confirmModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this color?</h3>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setConfirmModal(false);
                      setSelectedId(null);
                    }}
                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition">
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteColors(selectedId)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {
        modalOpen && 
        <ModalColors 
          setModalOpen={setModalOpen}
          editData={editData}
          getColor={getColor}
        />
      }
    </section>
  );
};

export default Colors;
