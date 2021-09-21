import express from 'express';

const app = express(); 

app.get('/', (req, res) => {
    res.json({
        "message": "Hi world tech"
    })
})

app.listen(7000, () => console.log('server on port 7000'));