const db = require('../config/db');

class Trip {
  // Get all trips
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM trips');
    return rows;
  }

  // Get a single trip by ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM trips WHERE id = ?', [id]);
    return rows[0];
  }

  // Create a new trip
  static async create(tripData) {
    const { title, description, destination, start_date, end_date, price } = tripData;
    const [result] = await db.query(
      'INSERT INTO trips (title, description, destination, start_date, end_date, price) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, destination, start_date, end_date, price]
    );
    return { id: result.insertId, ...tripData };
  }

  // Update a trip
  static async update(id, tripData) {
    const { title, description, destination, start_date, end_date, price } = tripData;
    await db.query(
      'UPDATE trips SET title = ?, description = ?, destination = ?, start_date = ?, end_date = ?, price = ? WHERE id = ?',
      [title, description, destination, start_date, end_date, price, id]
    );
    return { id, ...tripData };
  }

  // Delete a trip
  static async delete(id) {
    await db.query('DELETE FROM trips WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Trip;
