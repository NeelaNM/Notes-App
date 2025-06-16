import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { notesActions } from '../store';

export default function SearchField() {

  const searchTerm = useSelector(state => state.searchTerm);
  const dispatch = useDispatch();

  const handleChange = (e) => {
        dispatch(notesActions.setSearchTerm(e.target.value))
  }
  return (
        <div className='border-1 border-amber-200 flex items-center'>
            <span className='ml-1'><SearchOutlinedIcon /></span>
            <input 
                className='outline-none w-100 p-1 ml-2 h-8' 
                type='text' 
                placeholder='Search for a note..' 
                value={searchTerm}
                onChange={handleChange}
            />
            <span className='mr-1'><CancelTwoToneIcon onClick={() => dispatch(notesActions.setSearchTerm(''))}/></span>
        </div>
  )
}
