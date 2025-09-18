import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import useNoteActions from '../../hooks/useNoteActions';

function ListView({title, description, id, dateModified}) {

  const {trimDescription, handleNoteSelect, deleteNote, pinNote, displayNoteAsList} = useNoteActions();
  return (
        <Accordion sx={{width: '100%', backgroundColor: '#FFF0F5'}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
            >
            <Typography component="span">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {Array.isArray(description) ? displayNoteAsList(description) : trimDescription(description)}
            </AccordionDetails>
            <AccordionActions>
                <Button onClick={(e) => deleteNote(e, id)}>Delete</Button>
                <Button onClick={() => handleNoteSelect(id, title, description, dateModified)}>Edit</Button>
            </AccordionActions>
        </Accordion>
  )
}

export default ListView