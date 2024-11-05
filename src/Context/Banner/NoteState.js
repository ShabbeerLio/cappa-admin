import react from "react"
import NoteContext from "./NoteContext";
import { useState } from "react";
import host from "../../Host/Host";

const NoteState = (props) => {

    const notesData = []
    const [notes, setNotes] = useState(notesData);


    return (
        <NoteContext.Provider value={{
            notes,
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;