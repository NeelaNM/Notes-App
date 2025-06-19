import { useSelector } from "react-redux";
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import { useState } from 'react';


export default function SideBarWrapper() {
    
    const [isOpen, setIsOpen] = useState(false);
    const recentlyDeletedItems = useSelector(state => state.recentlyDeleted);
    
    const handleClick = () => {
        setIsOpen(prev => !prev);
    }
    return (
        <div className='flex p-2.5 pr-5'>
            <div className='flex flex-col w-fit -ml-5 p-3.5 gap-2.5 bg-cyan-800'>
                <FolderDeleteIcon fontSize='large' onClick={handleClick}/>
            </div>
            {isOpen && 
                <div className='flex flex-col w-50 p-5 bg-gray-600'>
                     {recentlyDeletedItems.length > 0 ?
                recentlyDeletedItems.map(item => <li key={item.id}>{item.title}</li>) : <p>This folder is empty!</p>}
                </div>
            }
        </div>
    )
}