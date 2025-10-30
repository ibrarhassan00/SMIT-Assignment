

let NotesCard = ({id, title , content , date , funEdit , funDeleteNote} )=>{

const formattedDate = new Date(date).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });


  {/* Notes Grid Section */}
    return <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Notes List</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* ✅ FIXED Sticky Note Card */}
        <div 
          className={`relative flex flex-col justify-between p-5 rounded-xl shadow-md min-h-[220px] transition duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-300 bg-yellow-200`}
          style={{ transform: 'rotate(2deg)' }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            {title}
          </h3>

          <p className="flex-1 text-gray-800 text-sm leading-relaxed overflow-hidden mb-3">
            {content}
          </p>

          <div className="flex justify-between items-center pt-2 border-t border-gray-300 text-sm">
            <span className="text-xs text-gray-600 italic">{formattedDate}</span>
            <div className="flex space-x-3">
              <button 
              id={id}
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={(id)=>{funEdit(id)}}
              >
                Edit
              </button>
              <button 
              id={id}
                className="text-red-500 hover:text-red-700 font-medium"
                onClick={(id) => funDeleteNote(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
}

export default NotesCard;