import authRoutes from './auth.js';

export default function setupRoutes(app) {
    app.use('/api/v1/auth', authRoutes);  
}
