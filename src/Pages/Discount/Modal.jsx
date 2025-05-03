import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ModalDiscount = ({ setModalOpen, getDiscount, editData }) => {
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const token = localStorage.getItem("accesstoken");
  const [status, setStatus] = useState(false);

  // POST
  const createDiscount = (event) => {
    event.preventDefault();

    fetch('https://back.ifly.com.uz/api/discount', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        discount: Number(discount),
        started_at: startDate,
        finished_at: finishDate
      })
    }).then((res) => res.json())
      .then((elem) => {
        if (elem?.success) {
          toast.success("Discount created succsessfully");
          getDiscount();
          setModalOpen(false);
        } else {
          toast.error(elem?.message?.message || "Something went wrong");
        }
      });
  };

  // EDIT MODAL
  // Patch API
  const editDiscount = (e) => {
    e.preventDefault();
    fetch(`https://back.ifly.com.uz/api/discount/${editData?.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        discount: Number(discount),
        started_at: startDate,
        finished_at: finishDate,
        status: status
      })
    }).then((res) => res.json())
      .then((elm) => {
        if (elm?.success) {
          toast.success("Discount edit successfully");
          getDiscount();
          setModalOpen(false);
        } else {
          toast.error("Discount edit failed");
        }
      });
  };

  useEffect(() => {
    if (editData) {
      setDiscount(editData?.discount || "");
      setStartDate(editData?.started_at || "");
      setFinishDate(editData?.finished_at || "");
      setStatus(editData?.status || false);
    }
  }, [editData]);


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
              {editData?.id > 0 ? "Edit Discount" : "Add Discount"}
            </h3>
            <form onSubmit={editData?.id > 0 ? editDiscount : createDiscount}>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                type="number" step={1} min={0} max={100}
                placeholder='Discount (%)'
                name='discount'
                className='w-full p-2 border border-gray-300 rounded mb-2'
                defaultValue={editData?.id > 0 ? editData?.discount : ""}
              />
              <input
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                placeholder='Created Date'
                name='started_at'
                className='w-full p-2 border border-gray-300 rounded mb-2'
                defaultValue={editData?.id > 0 ? editData?.started_at : ""}
              />
              <input
                onChange={(e) => setFinishDate(e.target.value)}
                type="date"
                placeholder='Finished Date'
                name='finished_at'
                className='w-full p-2 border border-gray-300 rounded mb-2'
                defaultValue={editData?.id > 0 ? editData?.finished_at : ""}
              />
              <label className='flex items-center space-x-2 mb-4'>
                <input
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  type="checkbox"
                  name='status'
                  className='w-4 h-4 border-2 border-gray-300 rounded-lg checked:bg-green-500 focus:bg-green-500 transition-all duration-200'
                />
                <span className='text-md text-gray-700 font-medium'>
                  Active
                </span>
              </label>

              <button type='submit'
                className='w-full cursor-pointer p-2 bg-green-500 text-white rounded-lg'>
                {editData?.id > 0 ? "Update Discount" : "Add Discount"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDiscount;