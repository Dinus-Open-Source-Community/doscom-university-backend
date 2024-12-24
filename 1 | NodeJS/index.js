const express = require('express');

const app = express();
const router = require('./router.js');

const PORT = 3000;

const logger = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get('/product', (req, res) => {
    res.json([
        "Xiaomi",
        "Apple",
        "Samsung"
    ]);
})

app.get('/order', (req, res) => {
    res.json([
        {
            id: 1,
            paid: true,
            userId: 1
        },
        {
            id: 2,
            paid: true,
            userId: 2
        },
        {
            id: 3,
            paid: false,
            userId: 3
        }
    ])
})

app.listen(PORT, () => {
    console.log(`server berjalan pada port ${PORT}`);
});