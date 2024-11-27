const axios = require("axios");

const getOrders = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5003/api/database/orders");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:5003/api/database/orders/${req.params.id}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el pedido" });
  }
};

const createOrder = async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5003/api/database/orders", req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pedido" });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
};
