import NoteCard from "../NoteCard";
import { useSelector } from "react-redux";

function GridView(){
    
    const pinnedNotes = useSelector(state => state.pinnedNotes);

    return(
        <>
            <h2 className='font-extrabold mt-2.5 pl-1.5 border-b-2'>Pinned Notes </h2>
            <div className='grid grid-cols-3 gap-10'>
                {pinnedNotes.map(({id, description, title, dateModified, isPinned}) => 
                <NoteCard 
                    title={title} 
                    description={description} 
                    id={id}
                    key={id}
                    dateModified={dateModified}
                    isPinned={isPinned}
                />)
                }
            </div>
            <h2 className='font-extrabold mt-2.5 pl-1.5 border-b-2'>Others</h2>
        </>
    )
}

export default GridView;