import { Router, Request, Response } from 'express';
import { query } from '../db/index.js';

const router = Router();

// GET all projects
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err: any) {
    console.error('Error fetching projects', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// GET single project by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    console.error(`Error fetching project id ${id}`, err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// POST a new project
router.post('/', async (req: Request, res: Response) => {
  const { name, scope, description, image_url, project_url, github_url } = req.body;
  
  if (!name || !scope) {
    return res.status(400).json({ error: 'Name and scope are required fields' });
  }

  try {
    const result = await query(
      `INSERT INTO projects (name, scope, description, image_url, project_url, github_url) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [name, scope, description || '', image_url || '', project_url || '', github_url || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error('Error creating project', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// PUT (update) a project
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, scope, description, image_url, project_url, github_url } = req.body;

  if (!name || !scope) {
    return res.status(400).json({ error: 'Name and scope are required fields' });
  }

  try {
    const checkExist = await query('SELECT * FROM projects WHERE id = $1', [id]);
    if (checkExist.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const result = await query(
      `UPDATE projects 
       SET name = $1, scope = $2, description = $3, image_url = $4, project_url = $5, github_url = $6, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $7 
       RETURNING *`,
      [name, scope, description || '', image_url || '', project_url || '', github_url || '', id]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    console.error(`Error updating project id ${id}`, err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// DELETE a project
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const checkExist = await query('SELECT * FROM projects WHERE id = $1', [id]);
    if (checkExist.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await query('DELETE FROM projects WHERE id = $1', [id]);
    res.json({ message: 'Project deleted successfully', id });
  } catch (err: any) {
    console.error(`Error deleting project id ${id}`, err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

export default router;
