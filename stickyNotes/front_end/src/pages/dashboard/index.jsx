import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import NotesCard from '../../components/notesCard';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([])
  const token = localStorage.getItem("uid")
  const [dummyCard, setDummyCard] = useState(false);

  // Mock data for the statistics
  const stats = [
    { title: 'Total Notes', value: 12, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Saved Notes', value: 9, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Unsaved Notes', value: 3, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  const getNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data.status === false) {
        console.log("Error:", response.data.message);
        return alert(response.data.message)
      }

      setData(response.data.data)

    } catch (error) {
      console.log("Signup Failed:", error.message);
      return alert("Error:", error.message)
    }
  }

  useEffect(() => {
    getNotes()
  }, [])






  let handleAddNewNoteClick = () => {
    setDummyCard(true)
  }



  let [title, setTitle] = useState("")
  let [content, setContent] = useState("")

  let handleSaveNote = async () => {

    try {
      let noteObj = {
        title,
        content
      }

      const response = await axios.post('http://localhost:8000/api/notes', noteObj, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data.status === false) {
        console.log("Error:", response.data.message);
        return alert(response.data.message)
      }

      // ✅ Clear inputs and reload notes
      setTitle("");
      setContent("");

      getNotes()
      setDummyCard(false)
    } catch (error) {
      console.log('Save Failed:', error.message);
      alert('Error:', error.message);
    }
  }


  let editNotes = async (id) => {
    try {
      let documentId = id.target.id

    let title = prompt("Enter new title"); // Spelling theek ki
      let contenet = prompt("Enter new Content"); // Spelling theek ki

      if (title === null || contenet === null) {
          console.log("Update cancelled by user.");
          return;
      }

      let updatedObj = {
        title,
        content
      }
      const response = await axios.put(`http://localhost:8000/api/notes/${documentId}`, updatedObj, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      getNotes()
    } catch (error) {
      console.log('Save Failed:', error.message);
      alert('Error:', error.message);
    }
  }


  let deleteNote = async (id) => {
    try {

      let documentId = id.target.id;
  const response = await axios.delete(`http://localhost:8000/api/notes/${documentId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      getNotes()

    } catch (error) {
      console.log('Save Failed:', error.message);
      alert('Error:', error.message);
    }


  }

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header and Action Button */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 border-gray-200">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">
              Sticky Note Dashboard
            </h1>
          </header>

          {/* Notes Statistics / Summary Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className={`p-6 rounded-xl shadow-md border ${stat.bg} border-gray-200 transition duration-300 hover:shadow-lg`}
              >
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className={`mt-1 text-4xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </section>

          {data.map((item) => {
            return <NotesCard id={item._id} key={item._id} title={item.title} content={item.content} date={item.date} funEdit={editNotes} funDeleteNote={deleteNote} />
          })}

          {dummyCard ? (
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div
                  className="relative flex flex-col justify-between p-5 rounded-xl shadow-md min-h-[220px] transition duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-300 bg-yellow-200"
                  style={{ transform: "rotate(2deg)" }}
                >
                  {/* Title Input */}
                  <input
                    type="text"
                    placeholder="Enter note title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1 bg-transparent outline-none w-full"
                  />

                  {/* Content Input */}
                  <textarea
                    placeholder="Write something..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 text-gray-800 text-sm leading-relaxed overflow-hidden mb-3 bg-transparent outline-none w-full resize-none"
                  />

                  {/* Save Button */}
                  <button
                    onClick={handleSaveNote}
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </section>
          )
            : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" >
              <div className={`relative flex flex-col justify-between p-5 rounded-xl shadow-md min-h-[220px] transition duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-transparent `}
                style={{ transform: 'rotate(2deg)' }}>
                <button
                  type="button"
                  className="flex items-center justify-center min-h-[180px] border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition duration-300 text-gray-500 hover:text-blue-600 w-full"
                  onClick={handleAddNewNoteClick} // <-- onClick function applied here
                >
                  <div className="text-center p-4">
                    <p className="text-lg font-semibold">Click to Add Note</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          }



        </div>
      </div>
    </>
  )
}

export default Dashboard
