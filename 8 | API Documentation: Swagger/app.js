const express = require('express');
const app = express();
const PORT = 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const smartphones = require('./phones.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json(smartphones);
});

app.get('/phones', (req, res) => {
    res.json(smartphones);
});

app.get('/phones/:id', (req, res) => {
    const phone = smartphones.find(phone => phone.id === parseInt(req.params.id));
    res.json(phone);
});

app.post('/phones', (req, res) => {

    const fs = require('fs');

    const newPhone = {
        id: smartphones.length + 1,
        ...req.body
    };

    smartphones.push(newPhone);

    let data = JSON.stringify(smartphones, null, 2);

    fs.writeFileSync('./phones.json', data, (error) => {
        res.status(500).json({ message: error })
    });

    res.json(newPhone);
})

app.put('/phones/:id', (req, res) => {

    const fs = require('fs');

    const index = smartphones.findIndex(phone => phone.id === parseInt(req.params.id));

    if (index !== -1) {

        smartphones[index] = { id: parseInt(req.params.id), ...req.body };

        let data = JSON.stringify(smartphones, null, 2);

        fs.writeFileSync('./phones.json', data, (error) => {
            res.status(500).json({ message: error })
        });

    } else {
        res.status(404).json({ message: 'Phone not found!' });
    }

    res.json(smartphones[index]);
})

app.delete('/phones/:id', (req, res) => {

    const fs = require('fs');

    let filtered = smartphones.filter(phone => phone.id !== parseInt(req.params.id));

    let data = JSON.stringify(filtered, null, 2);

    fs.writeFileSync('./phones.json', data, (error) => {
        res.status(500).json({ message: error });
    });

    res.json({ message: 'Phone deleted' });
})

app.listen(PORT, function () {
    console.log('Listening on port', PORT);
});
