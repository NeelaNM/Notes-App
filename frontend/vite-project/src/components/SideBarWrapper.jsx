import SideBar from './SideBar';
import { useSelector } from "react-redux";
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useState } from 'react';


export default function SideBarWrapper() {
    
    // const folders = useSelector(state => state.folders);
    const [isOpen, setIsOpen] = useState(false);
    const recentlyDeletedItems = useSelector(state => state.recentlyDeleted);
    
    // const [menu, setMenu] = useState(null);
    
    const handleClick = () => {
        setIsOpen(prev => !prev);
        // setMenu(menu)
    }
    return (
        <div className='flex p-2.5 pr-5'>
            <div className='flex flex-col w-fit -ml-5 p-3.5 gap-2.5 bg-cyan-800'>
                {/* <TextSnippetIcon fontSize='large' onClick={() => handleClick(1)} />
                <FolderSpecialIcon fontSize='large' onClick={() => handleClick(2)}/> */}
                <FolderDeleteIcon fontSize='large' onClick={handleClick}/>
            </div>
            {isOpen && 
                <div className='flex flex-col w-50 p-5 bg-gray-600'>
                    {/* <SideBar data={folders} menu={menu} /> */}
                     {recentlyDeletedItems.length > 0 ?
                recentlyDeletedItems.map(item => <li key={item.id}>{item.title}</li>) : <p>This folder is empty!</p>}
                </div>
            }
        </div>
    )
}