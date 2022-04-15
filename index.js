const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Set Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Set handlebar index GET route
app.get('/', function (req, res) {
  res.render('home', {});
});

// Static folder set
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
