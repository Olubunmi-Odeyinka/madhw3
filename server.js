const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use('/filestream', require('./fileStream'));

app.get('/', (req, res) => { res.send('Hello Mobile Developers'); });

// matches "GET /hello/foo" and "GET /hello/bar"
	// request.params(":name") is 'foo' or 'bar'
app.get("/hello/:name", (req, res) => {
    res.send("Hello: " + req.params.name);
});

// // this route sesponds with the body of the request 
app.post("/simple", (request, response) => {
    response.send("Request body: " + request.body);
});

//   // this route uses raw byte output for response
//   post("/raw", (request, response) -> {
//     OutputStream out = response.raw().getOutputStream();
//     out.write("Writing to raw!".getBytes());
//     out.close();
//     return response.raw();
//   });

//Tasks:
// 1. Define a route for handling a HTTP POST request

// 2. Get the image from the request, possibly storing it somewhere before proceeding.

// 3. Process the image using the JHLabs filtering library (you have to add the dependency)

// 4. Write the processed image to the HTTP response ( Tip: response.raw() can be helpful)


app.listen(port, () =>{
    console.log('server is up on port ' + port)
});

module.exports.app = app;