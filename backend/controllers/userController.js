import connection from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `;

    connection.query(
        sql,
        [name, email, hashedPassword], // Use hashedPassword here
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err
                });
            }

            res.status(201).json({
                message: "User Registered Successfully"
            });
        }
    );
};

export const loginUser = (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    connection.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    });

};

export const getProfile = (req, res) => {

    const sql = `
        SELECT id, name, email, phone
        FROM users
        WHERE id = ?
    `;

    connection.query(
        sql,
        [req.user.id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.json(result[0]);
        }
    );
};

export const updateProfile = (req, res) => {

    const { name, email, phone } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const sql = `
        UPDATE users
        SET name = ?, email = ?, phone = ?
        WHERE id = ?
    `;

    connection.query(
        sql,
        [name, email, phone || null, req.user.id],
        (err, result) => {

            if (err) {

                // Duplicate email
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "Email is already registered"
                    });
                }

                return res.status(500).json({
                    message: "Database Error",
                    error: err
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.status(200).json({
                message: "Profile updated successfully",
                user: {
                    id: req.user.id,
                    name,
                    email,
                    phone: phone || ""
                }
            });

        }
    );
};

export const changePassword = (req, res) => {

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({
            message: "Current password and new password are required"
        });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({
            message: "New password must be at least 6 characters"
        });
    }

    const sql = "SELECT password FROM users WHERE id = ?";

    connection.query(
        sql,
        [req.user.id],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(
                currentPassword,
                user.password
            );

            if (!isMatch) {
                return res.status(401).json({
                    message: "Current password is incorrect"
                });
            }

            const hashedPassword = await bcrypt.hash(
                newPassword,
                10
            );

            const updateSql = `
                UPDATE users
                SET password = ?
                WHERE id = ?
            `;

            connection.query(
                updateSql,
                [hashedPassword, req.user.id],
                (updateErr) => {

                    if (updateErr) {
                        return res.status(500).json({
                            message: "Failed to update password",
                            error: updateErr
                        });
                    }

                    res.status(200).json({
                        message: "Password changed successfully"
                    });

                }
            );
        }
    );
};