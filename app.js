// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const client = require('./config/mongoDb');

// express app initialization
const app = express();
dotenv.config();
app.use(express.json());
app.use(fileUpload());
app.use(cors());

// Import Routes
const adminRoutes = require('./route/adminRoute');
const carouselRoutes = require('./route/carousel');
const userInfoRoutes = require('./route/userInfo');

// application routes
const run = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        app.get('/', (req, res) => {
            res.send('Hey, Welcome To Vaultus Server🔑🔑👨‍💻');
        });
        app.use('/admin', adminRoutes);
        app.use('/carousel', carouselRoutes);
        app.use('/userInfo', userInfoRoutes);
    } catch (err) {
        console.log(err);
    }
};

run().catch(console.dir);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
