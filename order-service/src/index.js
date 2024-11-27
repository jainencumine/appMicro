const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Order Service running on http://localhost:${PORT}`);
});
