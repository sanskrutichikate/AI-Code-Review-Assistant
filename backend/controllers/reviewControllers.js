import pool from "../config/db.js";

const getReviews = async (req, res) => {

    try {

        const userId = req.user.id;

        const result = await pool.query(
            `
            SELECT
                cs.id,
                cs.title,
                cs.language,
                cs.source_code,
                cs.created_at,
                rr.complexity,
                rr.code_smells,
                rr.documentation
            FROM code_snippets cs

            LEFT JOIN review_results rr
            ON cs.id = rr.snippet_id

            WHERE cs.user_id = $1

            ORDER BY cs.created_at DESC;
            `,
            [userId]
        );

        res.status(200).json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};
const getReviewById = async (req, res) => {

    try {

        const { id } = req.params;

        const userId = req.user.id;

        const result = await pool.query(
            `
            SELECT
                cs.id,
                cs.title,
                cs.language,
                cs.source_code,
                cs.created_at,
                rr.complexity,
                rr.code_smells,
                rr.documentation
            FROM code_snippets cs

            LEFT JOIN review_results rr
            ON cs.id = rr.snippet_id

            WHERE cs.id = $1
            AND cs.user_id = $2
            `,
            [id, userId]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Review not found"
            });

        }

        res.status(200).json(result.rows[0]);

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

const deleteReview = async (req, res) => {

    try {

        const { id } = req.params;

        const userId = req.user.id;

        // Check if snippet belongs to logged-in user
        const check = await pool.query(
            `
            SELECT * FROM code_snippets
            WHERE id = $1 AND user_id = $2
            `,
            [id, userId]
        );

        if (check.rows.length === 0) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        // Delete review_results first
        await pool.query(
            `
            DELETE FROM review_results
            WHERE snippet_id = $1
            `,
            [id]
        );

        // Delete ESLint results
        await pool.query(
            `
            DELETE FROM analysis_results
            WHERE snippet_id = $1
            `,
            [id]
        );

        // Delete snippet
        await pool.query(
            `
            DELETE FROM code_snippets
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({
            message: "Review deleted successfully."
        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

export { getReviews,  getReviewById, deleteReview };

