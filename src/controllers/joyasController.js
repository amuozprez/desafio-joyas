const pool = require('../db.js');
const format = require('pg-format');

const getJoyas = async (req, res) => {
  try {
    const { limits, page, order_by } = req.query;

    const limit = parseInt(limits) || 10;
    const offset = ((parseInt(page) || 1) - 1) * limit;
    const order = order_by ? order_by.replace('_', ' ') : 'id ASC';

    const query = format('SELECT * FROM inventario ORDER BY %s LIMIT %s OFFSET %s', order, limit, offset);
    const result = await pool.query(query);

    const joyas = result.rows.map(joya => ({
      ...joya,
      links: {
        self: `/joyas/${joya.id}`
      }
    }));

    res.json({
      total: joyas.length,
      joyas
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las joyas' });
  }
};

const getJoyasFiltradas = async (req, res) => {
  try {
    const { precio_max, precio_min, categoria, metal } = req.query;

    let query = 'SELECT * FROM inventario WHERE 1=1';
    const values = [];

    if (precio_max) {
      query += ' AND precio <= $1';
      values.push(parseInt(precio_max));
    }
    if (precio_min) {
      query += ' AND precio >= $2';
      values.push(parseInt(precio_min));
    }
    if (categoria) {
      query += ' AND categoria = $3';
      values.push(categoria);
    }
    if (metal) {
      query += ' AND metal = $4';
      values.push(metal);
    }

    const result = await pool.query(query, values);
    res.json({
      total: result.rowCount,
      joyas: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las joyas filtradas' });
  }
};

module.exports = { getJoyas, getJoyasFiltradas };