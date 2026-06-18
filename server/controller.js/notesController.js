const db = require('../db');

const createNote = async (req, res) => {
    try {
        const { note } = req.body;
        const note_image = req.file ? `/noteimage/${req.file.filename}` : null;
        const userId = req.user.userId; // Assuming the user ID is stored in the token payload 
        //const date = new Date().toISOString().slice(0, 19).replace('T')[0]; // Get current date and time in MySQL format
        const [result] = await db.query('INSERT INTO notes (user_id, note, note_image) VALUES (?, ?, ?)', [userId, note, note_image]);
        res.status(201).json({ message: 'Note created successfully', userId: userId, noteId: result.insertId });    

    }

    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }   

};

const getAllNotes = async (req, res) => {

    const [notes] = await db.query(`
       SELECT
    n.note_id,
    n.note,
    n.note_image,
    n.date,
    u.username,
    COUNT(nl.id) AS like_count
FROM notes n
JOIN users u
    ON n.user_id = u.id
LEFT JOIN note_likes nl
    ON n.note_id = nl.note_id
WHERE n.status = 1
GROUP BY
    n.note_id,
    n.note,
    n.note_image,
    n.date,
    u.username
ORDER BY n.date DESC;
    `);

    res.status(200).json({ notes });
};

const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const {note} = req.body;
        const userId = req.user.userId; // Assuming the user ID is stored in the token payload          
        const note_image = req.file ? `/noteimage/${req.file.filename}` : null;
        // Check if the note exists and belongs to the user
        const [existingNote] = await db.query('SELECT * FROM notes WHERE note_id = ? AND user_id = ?', [noteId, userId]);        
        if (existingNote.length === 0) {
            return res.status(404).json({ message: 'Note not found or you do not have permission to update it' });
        }
        // Update the note
        await db.query('UPDATE notes SET note = ?, note_image = ? WHERE note_id = ?', [note, note_image, noteId]);
        res.status(200).json({ message: 'Note updated successfully' });
    }       
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const userId = req.user.userId; // Assuming the user ID is stored in the token payload
        // Check if the note exists and belongs to the user
        const [existingNote] = await db.query('SELECT * FROM notes WHERE note_id = ? AND user_id = ?', [noteId, userId]);
        if (existingNote.length === 0) {

            return res.status(404).json({ message: 'Note not found or you do not have permission to delete it' });
        }                           
        // Delete the note
        await db.query('DELETE FROM notes WHERE note_id = ?', [noteId]);
        res.status(200).json({ message: 'Note deleted successfully' });
    }

    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }           
};

const disableNote = async (req, res) => {
    try {
        const noteId = req.params.id;       
        const userId = req.user.userId; // Assuming the user ID is stored in the token payload
        // Check if the note exists and belongs to the user
        const [existingNote] = await db.query('SELECT * FROM notes WHERE note_id = ? AND user_id = ?', [noteId, userId]);

        if (existingNote.length === 0) {
            return res.status(404).json({ message: 'Note not found or you do not have permission to disable it' });
        }       
        // Disable the note by setting status to 0
        await db.query('UPDATE notes SET status = 0 WHERE note_id = ?', [noteId]);
        res.status(200).json({ message: 'Note disabled successfully' });
    }

    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }           
};

const enableNote = async (req, res) => {    
    try {
        const noteId = req.params.id;
        const userId = req.user.userId; // Assuming the user ID is stored in the token payload
        // Check if the note exists and belongs to the user
        const [existingNote] = await db.query('SELECT * FROM notes WHERE note_id = ? AND user_id = ?', [noteId, userId]);       
        if (existingNote.length === 0) {
            return res.status(404).json({ message: 'Note not found or you do not have permission to enable it' });
        }

        // Enable the note by setting status to 1
        await db.query('UPDATE notes SET status = 1 WHERE note_id = ?', [noteId]);
        res.status(200).json({ message: 'Note enabled successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
};  

const likeNote = async (req, res) => {
    try {
        const noteId = req.params.id;       
        const userId = req.user.userId; // Assuming the user ID is stored in the token payload
        // Check if the note exists
        const [existingNote] = await db.query('SELECT * FROM notes WHERE note_id = ?', [noteId]);

        if (existingNote.length === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check if the user has already liked the note
        const [existingLike] = await db.query('SELECT * FROM note_likes WHERE note_id = ? AND user_id = ?', [noteId, userId]);

        if (existingLike.length > 0) {
            return res.status(400).json({ message: 'You have already liked this note' });
        }

        // Insert the like into the database
        await db.query('INSERT INTO note_likes (note_id, user_id) VALUES (?, ?)', [noteId, userId]);
        res.status(200).json({ message: 'Note liked successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    
}   
};  

const unlikeNote = async (req, res) => {
    try {
        const noteId = req.params.id;       
        const userId = req.user.userId; // Assuming the user ID is stored in the token payload
        // Check if the note exists
        const [existingNote] = await db.query('SELECT * FROM notes WHERE note_id = ?', [noteId]);

        if (existingNote.length === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check if the user has liked the note
        const [existingLike] = await db.query('SELECT * FROM note_likes WHERE note_id = ? AND user_id = ?', [noteId, userId]);

        if (existingLike.length === 0) {
            return res.status(400).json({ message: 'You have not liked this note yet' });
        }

        // Remove the like from the database


        await db.query('DELETE FROM note_likes WHERE note_id = ? AND user_id = ?', [noteId, userId]);
        res.status(200).json({ message: 'Note unliked successfully' });
    }

    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }   

};  


module.exports = { createNote, getAllNotes, updateNote, deleteNote, disableNote, enableNote, likeNote, unlikeNote};
