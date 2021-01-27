import React, { useState, useEffect } from 'react';
// import './Notes.css';
import { API, Storage } from 'aws-amplify';
import { listTodos } from '../../graphql/queries';
import { createTodo, deleteTodo } from '../../graphql/mutations';
import './Notes.css';

const initialFormState = { name: '', description: '' }

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchNotes();
      }, []);
    
    async function fetchNotes() {
        const apiData = await API.graphql({ query: listTodos });
        const notesFromAPI = apiData.data.listTodos.items;
        await Promise.all(notesFromAPI.map(async note => {
            // fetch an image IF there is an image associated with a note
            if(note.image) {
                const image = await Storage.get(note.image);
                note.image = image;
            }
            return note;
        }))
        setNotes(apiData.data.listTodos.items);
    }

    async function createNote() {
        if (!formData.name || !formData.description) return;
        await API.graphql({ query: createTodo, variables: { input: formData } });
        // If image assocaited with note, add image to local image array
        if(formData.image) {
            const image = await Storage.get(formData.image);
            formData.image = image;
        }
        setNotes([ ...notes, formData ]);
        setFormData(initialFormState);
    }

    async function deleteNote({ id }) {
        const newNotesArray = notes.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({ query: deleteTodo, variables: { input: { id } }});
    }

    async function onChange(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        setFormData({ ...formData, image: file.name });
        await Storage.put(file.name, file);
        fetchNotes();
    }

    return (
        <div className='notes'>
            <h1>My Notes App</h1>
            <div className='form-div'>
                <div className='input-div'>
                    <input
                        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                        placeholder="Note name"
                        value={formData.name}
                    />
                    <input
                        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                        placeholder="Note description"
                        value={formData.description}
                    />
                    <input
                        className='file-upload'
                        type='file'
                        onChange={onChange}
                    />
                    <button onClick={createNote}>Create Note</button>
                </div>
            </div>
            <div>
                {
                notes.map(note => (
                    <div key={note.id || note.name} className='renderedNote'>
                        <h2>{note.name}</h2>
                        <p>{note.description}</p>
                        {/* If image present, render underneath delete button */}
                        {
                            note.image && <img src={note.image} style={{width: 400}} alt='' />
                        }
                        <button onClick={() => deleteNote(note)}>Delete note</button>
                        {/* If image present, render underneath delete button
                        {
                            note.image && <img src={note.image} style={{width: 400}} alt='' />
                        } */}
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Notes
