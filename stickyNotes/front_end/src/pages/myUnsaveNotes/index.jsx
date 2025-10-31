import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";

const MyDraftNotes = () => {
  const [data, setData] = useState([]);
  const [editedNotes, setEditedNotes] = useState({}); // store editable note data
  const token = localStorage.getItem("uid");

  // 🔹 Fetch drafts
  const getDrafts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/notes?isDraft=true", {
        headers: { Authorization: `Bearer ${token}` },
      });

    const filteredNotes = res.data.data.filter(note => note.isDraft === true);

setData(filteredNotes);


    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  useEffect(() => {
    getDrafts();
  }, []);

  // 🔹 Handle input change
  const handleChange = (id, field, value) => {
    setEditedNotes((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // 🔹 Save draft -> mark isDraft:false
  const handleSaveNote = async (id) => {
    const note = editedNotes[id] || {};
    try {
      await axios.put(
        `http://localhost:8000/api/notes/${id}`,
        { ...note, isDraft: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getDrafts(); // refresh list
    } catch (error) {
      console.log("Save Failed:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">My Draft Notes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item) => {
            const note = editedNotes[item._id] || item;

            return (
              <div
                key={item._id}
                className="flex flex-col justify-between p-5 rounded-xl shadow-md bg-yellow-100 min-h-[250px] w-full hover:shadow-lg transition"
              >
                <input
                  type="text"
                  value={note.title}
                  onChange={(e) => handleChange(item._id, "title", e.target.value)}
                  className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1 bg-transparent outline-none w-full"
                  placeholder="Enter note title..."
                />

                <textarea
                  value={note.content}
                  onChange={(e) => handleChange(item._id, "content", e.target.value)}
                  className="flex-1 text-gray-800 text-sm leading-relaxed mb-3 bg-transparent outline-none w-full resize-none"
                  placeholder="Write something..."
                />

                <button
                  onClick={() => handleSaveNote(item._id)}
                  className="mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition w-full"
                >
                  Save
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyDraftNotes;
