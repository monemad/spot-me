import express from 'express';

const app = express();
const port = 5000;

app.listen(port, () => {
    console.log(`SpotMe API server is listening on port ${port}...`);
});
