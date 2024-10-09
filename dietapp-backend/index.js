const app = require('./app'); // Express instance app.js'ten geliyor
const { PORT } = require("./config/config"); // Port bilgisi config'den geliyor

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
