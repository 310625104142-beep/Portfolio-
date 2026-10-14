import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { db } from './src/server/database.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Health / ping check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'healthy', uptime: process.uptime(), timestamp: new Date().toISOString() });
  });

  // Projects CRUD
  app.get('/api/projects', (req, res) => {
    const { category, search } = req.query;
    const projects = db.getProjects(category as string, search as string);
    res.json({ success: true, count: projects.length, data: projects });
  });

  app.get('/api/projects/:id', (req, res) => {
    const project = db.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  });

  app.post('/api/projects', (req, res) => {
    try {
      const created = db.createProject(req.body);
      res.status(201).json({ success: true, data: created });
    } catch (e: any) {
      res.status(400).json({ success: false, error: e.message });
    }
  });

  app.put('/api/projects/:id', (req, res) => {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: updated });
  });

  app.delete('/api/projects/:id', (req, res) => {
    const deleted = db.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, message: 'Project deleted successfully' });
  });

  // Skills, Experience, Testimonials
  app.get('/api/skills', (_req, res) => {
    res.json({ success: true, data: db.getSkills() });
  });

  app.get('/api/experience', (_req, res) => {
    res.json({ success: true, data: db.getExperience() });
  });

  app.get('/api/testimonials', (_req, res) => {
    res.json({ success: true, data: db.getTestimonials() });
  });

  // Contact Messages
  app.get('/api/messages', (_req, res) => {
    res.json({ success: true, data: db.getMessages() });
  });

  app.post('/api/messages', (req, res) => {
    const { name, email, subject, message, category } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }
    const created = db.createMessage({ name, email, subject: subject || 'General Inquiry', message, category });
    res.status(201).json({ success: true, message: 'Message recorded in database successfully!', data: created });
  });

  app.patch('/api/messages/:id/status', (req, res) => {
    const { status } = req.body;
    const updated = db.updateMessageStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ success: false, error: 'Message not found' });
    res.json({ success: true, data: updated });
  });

  app.delete('/api/messages/:id', (req, res) => {
    const deleted = db.deleteMessage(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Message not found' });
    res.json({ success: true, message: 'Message deleted' });
  });

  // Relational Database Inspection & Interactive Query Runner
  app.get('/api/db/schema', (_req, res) => {
    res.json({ success: true, data: db.getSchema() });
  });

  app.get('/api/db/stats', (_req, res) => {
    res.json({ success: true, data: db.getStats() });
  });

  app.post('/api/db/query', (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ success: false, error: 'Query string is required' });
    const result = db.executeSql(query);
    res.json({ success: true, data: result });
  });

  app.post('/api/db/reset', (_req, res) => {
    db.resetDatabase();
    res.json({ success: true, message: 'Database reset to canonical seed data' });
  });

  // Mount Vite middleware in development or static assets in production
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-Stack Portfolio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
