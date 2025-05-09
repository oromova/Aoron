import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ModalFaq = ({ setModalOpen, editData, getFaq }) => {
  const [questionEn, setQuestionEn] = useState("");
  const [questionRu, setQuestionRu] = useState("");
  const [questionDe, setQuestionDe] = useState("");
  const [answerEn, setAnswerEn] = useState("");
  const [answerRu, setAnswerRu] = useState("");
  const [answerDe, setAnswerDe] = useState("");

  const token = localStorage.getItem("accesstoken");

  useEffect(() => {
    if (editData) {
      setQuestionEn(editData.question_en || "");
      setQuestionRu(editData.question_ru || "");
      setQuestionDe(editData.question_de || "");
      setAnswerEn(editData.answer_en || "");
      setAnswerRu(editData.answer_ru || "");
      setAnswerDe(editData.answer_de || "");
    }
  }, [editData]);

  // POST
  const createFaq = (event) => {
    event.preventDefault();

    fetch('https://back.ifly.com.uz/api/faq', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        question_en: questionEn,
        question_ru: questionRu,
        question_de: questionDe,
        answer_en: answerEn,
        answer_ru: answerRu,
        answer_de: answerDe,
      })
    }).then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("Faq created succsessfully");
          getFaq();
          setModalOpen(false);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  // editModal
  // PATCH 
  const editFaq = (e) => {
    e.preventDefault();
    fetch(`https://back.ifly.com.uz/api/faq/${editData?.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        question_en: questionEn,
        question_ru: questionRu,
        question_de: questionDe,
        answer_en: answerEn,
        answer_ru: answerRu,
        answer_de: answerDe,
      })
    }).then((res) => res.json())
      .then((elm) => {
        if (elm?.success) {
          toast.success("Faq update successfully");
          getFaq();
          setModalOpen(false);
        }
        else {
          toast.error("Faq update failed");
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
              {editData?.id > 0 ? "Edit FAQ" : "Add FAQ"}
            </h3>
            <form onSubmit={editData?.id > 0 ? editFaq : createFaq}>

              <div className="mb-4">
                <label
                  htmlFor="question_en"
                  className="block">
                  Question (English)
                </label>
                <input
  onChange={(e) => setQuestionEn(e.target.value)}
  value={questionEn}
  type="text"
  name="question_en"
  className="w-full p-2 border border-gray-300 rounded mb-1"
  placeholder="Enter question in English"
  maxLength={80}
  required
/>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="answer_en"
                  className="block">
                  Answer (English)
                </label>
                <textarea
                  onChange={(e) => setAnswerEn(e.target.value)}
                  name="answer_en"
                  placeholder="Enter answer in English"
                  className="w-full p-2 border border-gray-300 rounded"
                  maxLength={500}
                  value={answerEn}
                  id="answer_en">
                </textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="question_ru"
                  className="block">
                  Question (Russian)
                </label>
                <input
                  onChange={(e) => setQuestionRu(e.target.value)}
                  type="text"
                  name="question_ru"
                  className="w-full p-2 border border-gray-300 rounded mb-1"
                  placeholder="Enter question in Russian"
                  maxLength={80}
                  required
                  value={questionRu}
                />
              </div>
              <div className="mb-4">
              <label
                  htmlFor="answer_ru"
                  className="block">
                  Answer (Russian)
                </label>
                <textarea
                  onChange={(e) => setAnswerRu(e.target.value)}
                  name="answer_ru"
                  placeholder="Enter answer in Russian"
                  className="w-full p-2 border border-gray-300 rounded"
                  maxLength={500}
                  value={answerRu}
                  id="answer_ru">
                </textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="question_de"
                  className="block">
                  Question (German)
                </label>
                <input
                  onChange={(e) => setQuestionDe(e.target.value)}
                  type="text"
                  name="question_de"
                  className="w-full p-2 border border-gray-300 rounded mb-1"
                  placeholder="Enter question in German"
                  maxLength={80}
                  required
                  value={questionDe}
                />
              </div>
              <div className="mb-4">
              <label
                  htmlFor="answer_de"
                  className="block">
                  Answer (German)
                </label>
                <textarea
                  onChange={(e) => setAnswerDe(e.target.value)}
                  name="answer_de"
                  placeholder="Enter answer in German"
                  className="w-full p-2 border border-gray-300 rounded"
                  maxLength={500}
                  value={answerDe}
                  id="answer_de">
                </textarea>
              </div>

              <button
                type="submit"
                className="w-full mt-4 cursor-pointer p-2 bg-green-500 text-white rounded-lg"
              >
                {editData?.id > 0 ? "Update FAQ" : "Add FAQ"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFaq;