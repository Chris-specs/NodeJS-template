import express from 'express';

// ROUTES
import userRoutes from './routes/user.routes';

// CREATE APP
const app = express();

// ADDING JSON SUPPORT
app.use(express.json({ extended: true }));

// RESPONSE WHEN CONSULT IN THE BROWSER ONLY /api
app.get('/api', (req, res) => {
    res.send({
        message: 'API response',
    });
});

app.use('/api/users', userRoutes);

export default app;
