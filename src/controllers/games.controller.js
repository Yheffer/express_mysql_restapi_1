import { pool } from "../db.js";

export const getGames = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM games");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getGame = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM games WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0) {
      return res.status(404).json({
        message: "Game not found",
      });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const createGame = async (req, res) => {
  const { title, genre, price } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO games (title, genre, price) VALUES (?, ?, ?)",
      [title, genre, price]
    );
    res.send({
      id: rows.insertId,
      title,
      genre,
      price,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateGame = async (req, res) => {
  const { id } = req.params;
  const { title, genre, price } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE games SET title = IFNULL(?, title), genre = IFNULL(?, genre), price = IFNULL(?, price) WHERE id = ?",
      [title, genre, price, id]
    );
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Game not found",
      });
    const [rows] = await pool.query("SELECT * FROM games WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM games WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Game not found",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
