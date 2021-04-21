const express = require('express');

require('dotenv').config();

const app = express();

app.get('/rest', (req, res) => {
    res.json({
        data: 'hello'
    });
});

app.listen(process.env.PORT, () => 
    console.log(`server listening at port ${process.env.PORT}`));