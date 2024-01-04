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
const { createAdapter } = require("@socket.io/mongo-adapter");
const { MongoClient } = require("mongodb");
const { Emitter } = require("@socket.io/mongo-emitter");
//

// Socket.io
const PM = require('./models/PM');

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
})


// MongoDB adapter && emitter
const DB = "forum_titan-roleplay";
const COLLECTION = "pms";
const mongoClient = new MongoClient(process.env.DB_URL);

mongoClient.connect();
const mongoCollection = mongoClient.db(DB).collection(COLLECTION);

mongoCollection.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600, background: true }
);

io.adapter(createAdapter(mongoCollection, {
  addCreatedAtField: true
}));

const emitter = new Emitter(mongoCollection);

// Socket.io main
io.on('connection', (socket) => {
  socket.on('sendMessage', (data) => {
    if (data.username) {
      try {
        PM.create({
          author: data.username,
          receiver: data.receiver,
          content: data.message
        });
      } catch (error) {
        console.log(error);
      };
    };
  });

  socket.on('currentChatInfo', (data) => {
    setTimeout(() => { // Timeout for the wait the real results for that the client re-render two times the data
      try {
        PM.find({
          author: data.username,
          receiver: data.receiver
        }).then(db => {
          emitter.emit('chatInfo', db);
        })
      } catch (error) {
        console.log(error)
      };
    }, 250)
  });
});

// Options
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true
};
const sessionOptions = {
  secret: 'titan-session',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
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