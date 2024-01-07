const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded.encoded({ extended: true }));

mongoose.connect('mongo://localhost/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.use('/api', routes);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});