const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mozoexpress', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

const comboSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const mesaSchema = new mongoose.Schema({
  nombre: String,
  capacidad: Number,
});

const pedidoSchema = new mongoose.Schema({
  mesa: String,
  combos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Combo' }],
  total: Number,
});

const Combo = mongoose.model('Combo', comboSchema);
const Mesa = mongoose.model('Mesa', mesaSchema);
const Pedido = mongoose.model('Pedido', pedidoSchema);

app.get('/api/combos', async (req, res) => {
  try {
    const combos = await Combo.find();
    res.json(combos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener combos' });
  }
});


app.post('/api/combos', async (req, res) => {
  const { name, description, price } = req.body;

  const nuevoCombo = new Combo({
    name,
    price,
  });

  try {
    await nuevoCombo.save();
    res.status(201).json(nuevoCombo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el combo' });
  }
});


app.get('/api/mesas', async (req, res) => {
  try {
    const mesas = await Mesa.find();
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mesas' });
  }
});


app.get('/api/pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('combos');
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});


app.post('/api/pedidos', async (req, res) => {
  const { mesa, combos, total } = req.body;

  const nuevoPedido = new Pedido({
    mesa,
    combos,
    total,
  });

  try {
    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
