import express from 'express';
import AppController from '../controllers/AppController.js';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

// home router
router.get('/', AppController.getHome);

// auth router
router.post('/auth/signup', AuthController.registerUser);
router.post('/auth/login', AuthController.logIn);

export default router;
