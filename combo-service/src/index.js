const express = require("express");
const cors = require("cors");
const comboRoutes = require("./routes/comboRoutes");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use("/api/combos", comboRoutes);

app.listen(PORT, () => {
  console.log(`Combo Service running on http://localhost:${PORT}`);
});
