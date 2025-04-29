import React, { useEffect, useState } from 'react';
import ModalCategory from './Modal';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  // GET CATEGORY
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const getCategory = () => {
    fetch("https://back.ifly.com.uz/api/category")
      .then((respon) => respon.json())
      .then((item) => setData(item?.data));
  };

  useEffect(() => {
    getCategory();
  }, []);

  //  POST CATEGORY


  console.log(data);
  // LOG OUT 
  const logoutFunc = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      navigate("/login");
    }
  };

  // MODAl


  return (
    <section>
      <div className=''>
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
                Category
              </h2>
              <button
                onClick={() => setModalOpen(!modalOpen)}
                className='cursor-pointer mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition'>
                Add Category
              </button>
            </div>
            <table className='min-w-full table-auto'>
              <thead>
                {/* {data?.map((item, index) => ( */}
                <tr className='bg-gray-200'>
                  <th className='border border-gray-300 p-2'>№</th>
                  <th className='border border-gray-300 p-2'>Title ENG</th>
                  <th className='border border-gray-300 p-2'>Title RU</th>
                  <th className='border border-gray-300 p-2'>Title DE</th>
                  <th className='border border-gray-300 p-2'>Actions</th>
                </tr>
                {/* ))} */}
              </thead>
              <tbody>
                <tr className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>1</td>
                  <td className='border border-gray-300 p-2'>1</td>
                  <td className='border border-gray-300 p-2'>1</td>
                  <td className='border border-gray-300 p-2'>1</td>
                  <td className='border border-gray-300 p-2 w-[200px]'>
                    <button className='px-4 py-2 mr-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition cursor-pointer'>
                      Edit
                    </button>
                    <button className='px-4 py-2 mr-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer'>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* modal */}
        {modalOpen && <ModalCategory setModalOpen={setModalOpen} getCategory={getCategory} />}
      </div>
    </section >

  );
};

export default Category;