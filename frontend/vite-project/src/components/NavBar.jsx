import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useTheme } from '../context/ThemeProvider';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { notesActions } from '../store';

export default function NavBar() {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const isListView = false;
    const isLoggedIn = useSelector(state => state.isLoggedIn)

    const handleViewChange = () => {
        //dispatch(toggleView());
    }

    const handleLogout = () => {
        dispatch(notesActions.setIsLoggedIn(false))
    }

    return(
        <div className='flex justify-between items-center mt-5 p-2'>
            <h1>Welcome User!!</h1>
            <div className='flex gap-5 mr-0 items-center'>
                {isListView ? <GridViewIcon onClick={handleViewChange} /> : <ViewListIcon onClick={handleViewChange} />}
                {theme === 'dark' ? <DarkModeIcon onClick={toggleTheme} /> : <DarkModeOutlinedIcon onClick={toggleTheme} />}
                {isLoggedIn && <Button variant='outlined' onClick={handleLogout}>Logout</Button>}
            </div>
        </div>
    )
}