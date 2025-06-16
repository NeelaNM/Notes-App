import NavBar from "./components/NavBar";
import ThemeProvider from "./context/ThemeProvider";
import NotesSection from "./components/NotesSection";
import SideBarWrapper from "./components/SideBarWrapper";
import { useEffect } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { notesActions } from "./store/index.js"

function App() { 

  const dispatch = useDispatch();

  const fetchNotes = async () => {
    const { data: notes}  = await axios.get("/api/notes");
    notes.data.forEach(item => {
      const note =  {
        id: item._id,
        title: item.title || '',
        description: item.description,
        dateModified: item.updatedAt || item.createdAt,
      }
      dispatch(notesActions.addItem(note))
    })
  }

  useEffect(()=>{
    fetchNotes();
  }, [])
 
  return(
    <ThemeProvider>
      <NavBar />
      <div className='flex justify-items-start gap-5 h-screen'>
        <SideBarWrapper />
        <NotesSection />
      </div>
    </ThemeProvider>)
}

export default App;



