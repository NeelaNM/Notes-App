import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { addFolder, setFolderId, toggleModal } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { notesActions } from '../store';

export default function SideBar({data, menu}) {

    // const dispatch = useDispatch();
    const recentlyDeletedItems = useSelector(state => state.recentlyDeleted);

    // const handleClick = () => {
    //     const item = {
    //         id: Date.now(),
    //         isFolder: true,
    //         tag: 'New Folder',
    //         items:[]
    //     }
    //     dispatch(notesActions.addFolder(item))
    // }
    // const addNote = (folderId) => {
    //     dispatch(notesActions.setFolderId(folderId));
    //     dispatch(notesActions.toggleModal(true));
    // }

    // const displayItems = 
    //     <>
    //         {recentlyDeletedItems.length > 0 ?
    //             recentlyDeletedItems.map(item => <li key={item.id}>{item.title}</li>) : <p>This folder is empty!</p>}
    //     </>


    return (
        <>
            
            {/* {menu===1 ?  <>
                <div className={data.id === 1 ? "" : "ml-2.5"}>
                    {data.tag || data.title}
                    {data.isFolder &&
                        <span className='float-right'>
                            <CreateNewFolderIcon onClick={handleClick} />
                            <NoteAddIcon onClick={() => addNote(data.id)} />
                        </span>
                    }
                </div>   
                {data.isFolder ?
                    data.items?.map(item => <SideBar key={item.id} data={item} menu={1} />) : null}
              </>
                : displayItems
            } */}

            
            {recentlyDeletedItems.length > 0 ?
                recentlyDeletedItems.map(item => <li key={item.id}>{item.title}</li>) : <p>This folder is empty!</p>}

    </>)
}