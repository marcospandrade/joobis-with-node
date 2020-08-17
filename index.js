require('dotenv').config();

const server = require('./server');

const PORT = process.env.PORT || 3300;

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));