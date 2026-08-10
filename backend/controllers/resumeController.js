import connection from "../config/db.js";

// CREATE RESUME
export const createResume = (req, res) => {

    console.log(req.body);

    const {
        fullName,
        email,
        phone,
        address,
        skills,
        education
    } = req.body;

    const sql = `
    INSERT INTO resumes
    (user_id, full_name, email, phone, address, skills, education)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;

    connection.query(
        sql,
        [
            req.user.id,
            fullName,
            email,
            phone,
            address,
            skills,
            education
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err
                });
            }

            res.status(201).json({
                message: "Resume Created Successfully",
                id: result.insertId
            });

        }
    );
};

// GET ALL RESUMES
export const getAllResumes = (req, res) => {

    const sql = `
    SELECT *
    FROM resumes
    WHERE user_id = ?
    ORDER BY id DESC
`;

    connection.query(sql, [req.user.id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        res.status(200).json(result);

    });

};

// DELETE RESUME
export const deleteResume = (req, res) => {

    const { id } = req.params;

    const sql = `
    DELETE FROM resumes
    WHERE id = ? AND user_id = ?
`;

    connection.query(sql, [id, req.user.id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        res.status(200).json({
            message: "Resume Deleted Successfully"
        });

    });

};

export const updateResume = (req, res) => {

    const { id } = req.params;

    const {
        fullName,
        email,
        phone,
        address,
        skills,
        education
    } = req.body;

    const sql = `
    UPDATE resumes
    SET
    full_name = ?,
    email = ?,
    phone = ?,
    address = ?,
    skills = ?,
    education = ?
    WHERE id = ? AND user_id = ?
`;

    connection.query(
        sql,
        [
            fullName,
            email,
            phone,
            address,
            skills,
            education,
            id,
            req.user.id
        ],
        (err) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err
                });
            }

            res.json({
                message: "Resume Updated Successfully"
            });

        }
    );
};