const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const apiRoute = require("./routes/index");

app.use('/api', apiRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/api', (req, res) => {
    res.send('Welcome to the server');
}
);