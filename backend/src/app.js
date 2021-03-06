require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passportSettingRouter = require('./passport');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const socket = require('./socket/socket');
const { checkTokenAndSetUser } = require('./middlewares/auth');

// router
const apiRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.URI;

mongoose.connect(URI).then(() => console.log('MongoDB is connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('uploads'));
app.use(cookieParser());
app.use(passport.initialize());
passportSettingRouter();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  })
);

app.use(checkTokenAndSetUser);
app.use('/api', apiRouter);

const server = app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

socket(server);

app.use((err, req, res, next) => {
  res.json({ failure: err.message });
});
