const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const inventoryRoutes = require('./routes/inventory');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Integrate Inventory API Routes
app.use('/api/inventory', inventoryRoutes);

app.listen(3001, () => console.log('Server running on port 3001'));
