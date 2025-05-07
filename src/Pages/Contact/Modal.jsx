import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";

const ModalContact = ({ setModalOpen, editData, getContact }) => {
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState("");
  const [addressEn, setAddressEn] = useState("");
  const [addressRu, setAddressRu] = useState("");
  const [addressDe, setAddressDe] = useState("");

  const token = localStorage.getItem("accesstoken");

  // POST
  const createContact = (event) => {
    event.preventDefault();

    fetch(`https://back.ifly.com.uz/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        phone_number: phone,
        email: email,
        address_en: addressEn,
        address_ru: addressRu,
        address_de: addressDe,
      })
    }).then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("Contact created succsessfully");
          getContact();
          setModalOpen(false);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  // editModal
  // PATCH 
  const editContact = (e) => {
    e.preventDefault();
    fetch(`https://back.ifly.com.uz/api/contact/${editData?.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        phone_number: phone,
        email: email,
        address_en: addressEn,
        address_ru: addressRu,
        address_de: addressDe,
      })
    }).then((res) => res.json())
      .then((elm) => {
        if (elm?.success) {
          toast.success("Contact update successfully");
          getContact();
          setModalOpen(false);
        }
        else {
          toast.error("Contact update failed");
        }
      });
  };

  const handleChange = (value) => {
    setPhone(value);
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
              {editData?.id > 0 ? "Edit Contact" : "Add Contact"}
            </h3>
            <form onSubmit={editData?.id > 0 ? editContact : createContact}>
              <label 
                className="block text-sm font-medium"
                htmlFor="phone">
                Phone Number
              </label>
                  <PhoneInput
                    // onChange={(e) => setPhone(e.target.value)}
                    country={'uz'}
                    onChange={handleChange}
                    inputStyle={{ width: '100%' }}
                    placeholder="Enter phone number"
                    className="mb-4"
                  />
               <label 
                className="block text-sm font-medium"
                htmlFor="email">
                Email
              </label>
              <input 
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Email"
                maxLength={50} 
              />
              <label 
                className="block text-sm font-medium"
                htmlFor="address_en">
                Address (EN)
              </label>
              <textarea 
                onChange={(e) => setAddressEn(e.target.value)}
                name="address_en"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Address (EN)"
                maxLength={200}></textarea>
              <label 
                className="block text-sm font-medium"
                htmlFor="address_ru">
                Address (RU)
              </label>
              <textarea 
                onChange={(e) => setAddressRu(e.target.value)}
                name="address_ru"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Address (RU)"
                maxLength={200}></textarea>
              <label 
                className="block text-sm font-medium"
                htmlFor="address_de">
                Address (DE)
              </label>
              <textarea 
                onChange={(e) => setAddressDe(e.target.value)}
                name="address_de"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Address (DE)"
                maxLength={200}></textarea>

              <button
                type="submit"
                className="w-full mt-4 cursor-pointer p-2 bg-green-500 text-white rounded-lg"
              >
                {editData?.id > 0 ? "Update Contact" : "Add Contact"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContact;