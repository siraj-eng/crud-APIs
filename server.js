const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./database');
const User = require('./models/user.js');
const user = require('./routes/user.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Sync Database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Unable to sync database:', err);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', user);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
