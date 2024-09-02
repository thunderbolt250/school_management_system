const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

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

// Change user password
app.post('/api/users/change-password', (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  db.query('SELECT password FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Server error');
    } else if (results.length === 0 || !(await bcrypt.compare(oldPassword, results[0].password))) {
      res.status(400).send('Old password is incorrect.');
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (err, result) => {
        if (err) {
          console.error('Error updating password:', err);
          res.status(500).send('Server error');
        } else {
          res.json({ success: true });
        }
      });
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

// Fetch total number of students
app.get('/api/total-students', (req, res) => {
  db.query('SELECT COUNT(*) AS total FROM students', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json({ total: results[0].total });
    }
  });
});

// Fetch total number of users
app.get('/api/total-users', (req, res) => {
  db.query('SELECT COUNT(*) AS total FROM users', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json({ total: results[0].total });
    }
  });
});

// CRUD operations for students
app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/students', (req, res) => {
  const student = req.body;
  db.query('INSERT INTO students SET ?', student, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(result);
    }
  });
});

app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const student = req.body;
  db.query('UPDATE students SET ? WHERE No = ?', [student, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(result);
    }
  });
});

app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM students WHERE No = ?', id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(result);
    }
  });
});

// User login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else if (results.length > 0) {
      const user = results[0];
      console.log("<><><><><><>?<>",user);
      const isMatch = await bcrypt.compare(password, user.Password);
      if (isMatch) {
        const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ success: true, token });
      } else {
        res.json({ success: false });
      }
    } else {
      res.json({ success: false });
    }
  });
});

// Fetch all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Create a new user
app.post('/api/users', async (req, res) => {
  const { names, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { names, username, email, password: hashedPassword };

  db.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).send('Server error');
    } else {
      res.json(result);
    }
  });
});

// Update a user
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  db.query('UPDATE users SET ? WHERE No = ?', [user, id], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Server error');
    } else {
      res.json(result);
    }
  });
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE No = ?', id, (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Server error');
    } else {
      res.json(result);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
