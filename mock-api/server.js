const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = 'devkey';

// In-memory data
let users = [
  { id: 1, name: 'Admin Uno', email: 'admin@example.com', password: 'password', role: 'admin' },
  { id: 2, name: 'Profe Dos', email: 'prof@example.com', password: 'password', role: 'profesor' },
  { id: 3, name: 'Alumno Tres', email: 'student@example.com', password: 'password', role: 'estudiante' }
];

let courses = [
  { id: 1, title: 'Matemáticas Básicas', teacher: 'Profe Dos', status: 'Activo' },
  { id: 2, title: 'Historia General', teacher: 'Profe Dos', status: 'Activo' }
];

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ sub: user.id, role: user.role }, SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// Users CRUD
app.get('/api/users', (req, res) => {
  const safeUsers = users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role }));
  res.json(safeUsers);
});

app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id, name, email, role, password: 'password' };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Usuario no encontrado' });
  const { name, email, role } = req.body;
  users[idx] = { ...users[idx], name, email, role };
  res.json(users[idx]);
});

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  users = users.filter(u => u.id !== id);
  res.status(204).send();
});

// Courses CRUD
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.post('/api/courses', (req, res) => {
  const { title, teacher, status } = req.body;
  const id = courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1;
  const newCourse = { id, title, teacher, status };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.put('/api/courses/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = courses.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Curso no encontrado' });
  const { title, teacher, status } = req.body;
  courses[idx] = { ...courses[idx], title, teacher, status };
  res.json(courses[idx]);
});

app.delete('/api/courses/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  courses = courses.filter(c => c.id !== id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Mock API running on port', PORT));
