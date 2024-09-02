const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'school_dbms'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Upload photo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
  // Update user profile photo
  app.post('/api/users/update-photo', upload.single('photo'), (req, res) => {
    const email = req.body.email;
    const photoUrl = `uploads/${req.file.filename}`;
  
    db.query('UPDATE users SET Picture = ? WHERE email = ?', [photoUrl, email], (err, result) => {
      if (err) {
        console.error('Error updating photo:', err);
        res.status(500).send('Server error');
      } else {
        res.json({ success: true, photoUrl });
      }
    });
  });
  
  // Middleware to verify JWT
  const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  
      req.email = decoded.email;
      next();
    });
  };
  
  // Get user details by email
  app.get('/api/users/:email', (req, res) => {
    const email = req.params.email;
    console.log(`Fetching details for email: ${email}`);
    db.query('SELECT No, names, username, email, Picture FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error fetching user details:', err);
        res.status(500).json({ error: 'Server error' });
      } else if (results.length === 0) {
        console.log(`No user found for email: ${email}`);
        res.status(404).json({ error: 'User not found' });
      } else {
        console.log(`User details found: ${JSON.stringify(results[0])}`);
        res.json(results[0]);
      }
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
