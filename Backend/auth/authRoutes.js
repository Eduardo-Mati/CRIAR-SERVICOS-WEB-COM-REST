import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
	res.status(501).send('register route not implemented yet');
});

router.post('/login', (req, res) => {
	res.status(501).send('login route not implemented yet');
});

export default router;