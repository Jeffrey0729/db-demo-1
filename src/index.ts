import './config';
import 'express-async-errors';
import express, { Express } from 'express';
import { addNewBook } from './controllers/BookController';
import { addNewReview } from './controllers/ReviewController';

import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import {
  registerUser,
  logIn,
  getUserProfileData,
  getAllUserProfiles,
  resetProfileViews,
  updateUserEmail,
} from './controllers/UserController';

const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;

const SQLiteStore = connectSqlite3(session);

app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.sqlite' }),
    secret: COOKIE_SECRET,
    cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
    name: 'session',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());

app.post('/api/users', registerUser); // Create an account
app.post('/api/login', logIn); // Log in to an account
app.post('/api/users/profileViews/reset', resetProfileViews); // Log in to an account

app.get('/api/users', getAllUserProfiles);
app.get('/api/users/:userId', getUserProfileData);
app.post('/api/users/:userId/email', updateUserEmail);

app.post('/api/addNewBook');
app.post('/api/books/:bookId/reviews', addNewReview);
app.get('/api/books/:bookId/reviews', addReviewsForBook);


app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
