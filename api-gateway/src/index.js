const express = require("express");
const cors = require("cors");
const gatewayRoutes = require("./routes/gatewayRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", gatewayRoutes);

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
