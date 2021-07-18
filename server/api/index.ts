import express from 'express';
import api_v0Routes from './v0';
import login from './authenticate';

const router = express.Router();

router.post('/authenticate', login);
router.use('/api/v0', api_v0Routes);

export default router;
