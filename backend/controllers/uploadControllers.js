import pool from "../config/db.js";

// Upload Code File


const uploadFile = async (req, res) => {

    try {

        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded."
            });
        }

        // Logged-in user
        const userId = req.user.id;

        // Uploaded file details
        const fileName = req.file.filename;
        const filePath = req.file.path;

        // Save into database
        const query = `
            INSERT INTO uploaded_files
            (user_id, file_name, file_path)
            VALUES ($1,$2,$3)
            RETURNING *;
        `;

        const result = await pool.query(query, [
            userId,
            fileName,
            filePath
        ]);

        res.status(201).json({
            message: "File uploaded successfully.",
            file: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

export { uploadFile };