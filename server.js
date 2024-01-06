// Routers
const users = require('./routers/user/users');
const userRegister = require('./routers/user/register');
const userLogin = require('./routers/user/login');
const userLogout = require('./routers/user/logout');
const userEdit = require('./routers/user/edit');
const userParam = require('./routers/user/param');
const topics = require('./routers/topic/topics');
const topicNew = require('./routers/topic/new');
const topicParam = require('./routers/topic/params/param');
const commentNew = require('./routers/topic/comment/new');
const comments = require('./routers/topic/comment/comments');
const categoriesParam = require('./routers/topic/params/categories');
//
const express = require('express');
const app = express();
const mongoDb = require('./middlewares/mongodb');
const rateLimit = require('./middlewares/ratelimit');
const server = require('http').createServer(app);
const session = require('express-session');
const cors = require('cors')
require('dotenv').config();
mongoDb();
//

// Options
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST'],
  credentials: true
};
const sessionOptions = {
  secret: 'titan-session',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // For that express-session cookies not beign saved in Chrome
    secure: true,
    sameSite: 'none'
  },
  proxy: true
  //
};

// Middlewares
app.use(session(sessionOptions));
app.use(cors(corsOptions));
app.use(rateLimit);
app.use(express.json());

// Routers
app.use(userRegister);
app.use(userLogin);
app.use(userLogout);
app.use(users);
app.use(userEdit);
app.use(userParam);
app.use(topicParam);
app.use(categoriesParam);
app.use(topics);
app.use(topicNew);
app.use(commentNew);
app.use(comments);

server.listen(process.env.PORT, () => {
  console.log(`Port: ${process.env.PORT}`);
});