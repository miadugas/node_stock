const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;

// API KEY pk_3e454339e37d4279a255542226dfea07
// create call API function
function call_api(finishedAPI) {
  request(
    'https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_3e454339e37d4279a255542226dfea07',
    { json: true },
    (err, res, body) => {
      // basic error handle
      if (err) {
        return console.log(err);
      }
      if (res.statusCode === 200) {
        //console.log(body);
        finishedAPI(body);
      }
    }
  );
}

// Set Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Set handlebar index GET route
app.get('/', function (req, res) {
  call_api(function (doneAPI) {
    res.render('home', {
      stock: doneAPI,
    });
  });
});

// Set handlebar about GET route
app.get('/about.html', function (req, res) {
  res.render('about');
});

// Static folder set
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
