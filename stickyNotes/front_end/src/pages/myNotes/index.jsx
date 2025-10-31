import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import NotesCard from '../../components/notesCard'
import axios from 'axios'


const MyNotes = () => {
const [data, setData] = useState([])

const token = localStorage.getItem("uid")
const getNotes = async()=>{
try {
  const response = await axios.get('http://localhost:8000/api/notes',{
  headers: {
    Authorization: `Bearer ${token}`
  }
})

if (response.data.status===false) {
  console.log("Error:", response.data.message);
  return alert(response.data.message)
}

const filteredNotes = response.data.data.filter(note => note.isDraft === false);

setData(filteredNotes);

} catch (error) {
  console.log("Signup Failed:", error.message);
  return alert("Error:", error.message)
}
  }

useEffect(()=>{
  getNotes()
},[])

  let editNotes = async (documentId) => {
    try {
      let title = prompt("Enter new title"); // Spelling theek ki
      let content = prompt("Enter new Content"); // Spelling theek ki

      if (title === null || content === null) {
        console.log("Update cancelled by user.");
        return;
      }

      let updatedObj = {
        title,
        content,
      };
      const response = await axios.put(
        `http://localhost:8000/api/notes/${documentId}`,
        updatedObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getNotes();
    } catch (error) {
      console.log("Save Failed:", error.message);
      alert("Error:", error.message);
    }
  };

  let deleteNote = async (documentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/notes/${documentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getNotes();
    } catch (error) {
      console.log("Save Failed:", error.message);
      alert("Error:", error.message);
    }
  };

  return (
    <>
    <Navbar />
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-8 py-6">
            {data.map((item) => (
              <NotesCard
                key={item._id}
                id={item._id}
                title={item.title}
                content={item.content}
                date={item.date}
                funEdit={editNotes}
                funDeleteNote={deleteNote}
              />
            ))}
          </div>
    </>
  )
}

export default MyNotes
