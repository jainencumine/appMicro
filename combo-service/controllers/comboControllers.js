const Combo = require("../models/comboModel");

const getCombos = async (req, res) => {
  try {
    const combos = await Combo.find();
    res.json(combos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener combos" });
  }
};

const getComboById = async (req, res) => {
  try {
    const combo = await Combo.findById(req.params.id);
    if (!combo) return res.status(404).json({ error: "Combo no encontrado" });
    res.json(combo);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el combo" });
  }
};

const createCombo = async (req, res) => {
  const { name, price } = req.body;

  try {
    const newCombo = new Combo({ name, price });
    await newCombo.save();
    res.status(201).json(newCombo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el combo" });
  }
};

const updateCombo = async (req, res) => {
  const { name, price } = req.body;

  try {
    const updatedCombo = await Combo.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true }
    );
    if (!updatedCombo)
      return res.status(404).json({ error: "Combo no encontrado" });
    res.json(updatedCombo);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el combo" });
  }
};

const deleteCombo = async (req, res) => {
  try {
    const deletedCombo = await Combo.findByIdAndDelete(req.params.id);
    if (!deletedCombo)
      return res.status(404).json({ error: "Combo no encontrado" });
    res.json(deletedCombo);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el combo" });
  }
};

module.exports = {
  getCombos,
  getComboById,
  createCombo,
  updateCombo,
  deleteCombo,
};
