let express = require('express');
let mongoose = require('mongoose');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
let cors = require('cors');
require('dotenv').config();
let app = express();
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/website/enquiry', enquiryRouter);

// http://localhost:8020/api/website/enquiry/insert

// Connect to MongoDB
mongoose.connect(process.env.DBURL).then(()=>{
    console.log('Connected to MOngoDB');
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
}).catch((err) => console.log(err));