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

setData(response.data.data)

} catch (error) {
  console.log("Signup Failed:", error.message);
  return alert("Error:", error.message)
}
  }

useEffect(()=>{
  getNotes()
},[])


  return (
    <>
    <Navbar />
{data.map((item)=>{
return <NotesCard key={item._id} title={item.title} content={item.content} date={item.date} />
})}
    </>
  )
}

export default MyNotes
