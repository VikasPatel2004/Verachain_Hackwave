import express = require('express');
import cors = require('cors');
import mongoose = require('mongoose');
import jwt = require('jsonwebtoken');
import { UserModel } from './Models/db';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/verachain';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error: any) => console.error('MongoDB connection error:', error));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Authentication Routes

// Register endpoint
app.post('/api/auth/register', async (req: any, res: any) => {
  try {
    const { email, username, password, role } = req.body;

    // Validate input
    if (!email || !username || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['consumer', 'supplier'].includes(role)) {
      return res.status(400).json({ message: 'Role must be either consumer or supplier' });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or username' });
    }

    // Create new user
    const user = new UserModel({ email, username, password, role });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user by username or email
    const user = await UserModel.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await (user as any).comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get current user endpoint
app.get('/api/auth/me', async (req: any, res: any) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Health check endpoint
app.get('/api/health', (req: any, res: any) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
