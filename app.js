const express = require ('express');
const mongooseConnect = require ('./config/mongoose');
const routes = require ('./routes')

const app = express();
const port = 3000;

mongooseConnect();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(routes);



app.listen(port, () => {
    console.log(`app runs on http://localhost:${port}`)
})