import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './index.js';

// Setup __dirname replacement in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  console.log('Starting migration...');
  const client = await pool.connect();
  try {
    // Read schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Creating tables...');
    await client.query(schemaSql);
    console.log('Tables created successfully.');

    // Check if table is empty before seeding
    const res = await client.query('SELECT COUNT(*) FROM projects');
    const count = parseInt(res.rows[0].count, 10);
    
    if (count === 0) {
      // Read seed.sql
      const seedPath = path.join(__dirname, 'seed.sql');
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      
      console.log('Seeding data...');
      await client.query(seedSql);
      console.log('Data seeded successfully.');
    } else {
      console.log('Database already has data. Skipping seed.');
    }

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    client.release();
    await pool.end();
    console.log('Migration process finished.');
  }
}

runMigration().catch((err) => {
  console.error('Unhandled error in migration script:', err);
  process.exit(1);
});
