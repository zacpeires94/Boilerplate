const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const session = require('express-session')
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// connect-session-sequelize stores session data in the psql db, 
// as opposed to just in memory, when only using session
const db = require('./db');
const dbStore = new SequelizeStore({ db: db });

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done))

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create and save session, remembering user
app.use(session({
    secret: process.env.SESSION_SECRET || 'boilerplate secret',
    store: dbStore,
    resave: false,
    saveUninitialized: true
  }));
  
dbStore.sync();

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "..", "/public")));

app.use("/api", require("./api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

const port = process.env.PORT || 3000;

db.sync()
  .then(function(){
    app.listen(port, function () {
        console.log(`Your server, listening on port ${port}`);
      });
  }) 


app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

