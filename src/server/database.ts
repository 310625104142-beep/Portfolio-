import fs from 'fs';
import path from 'path';
import { Project, Skill, Experience, Testimonial, ContactMessage, DatabaseStats, QueryResult } from '../types/portfolio.ts';
import { INITIAL_PROJECTS, INITIAL_SKILLS, INITIAL_EXPERIENCE, INITIAL_TESTIMONIALS, INITIAL_MESSAGES, DATABASE_SCHEMA_DDL } from '../data/initialData.ts';

interface DatabaseData {
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  testimonials: Testimonial[];
  messages: ContactMessage[];
  lastUpdated: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio-db.json');
const startTime = Date.now();

export class PortfolioDatabase {
  private data: DatabaseData;

  constructor() {
    this.data = this.loadOrInitialize();
  }

  private loadOrInitialize(): DatabaseData {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (parsed.projects && parsed.skills && parsed.messages) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read existing database file, initializing fresh database:', e);
    }

    const initial: DatabaseData = {
      projects: INITIAL_PROJECTS,
      skills: INITIAL_SKILLS,
      experience: INITIAL_EXPERIENCE,
      testimonials: INITIAL_TESTIMONIALS,
      messages: INITIAL_MESSAGES,
      lastUpdated: new Date().toISOString()
    };

    this.saveData(initial);
    return initial;
  }

  private saveData(dataToSave: DatabaseData = this.data) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      dataToSave.lastUpdated = new Date().toISOString();
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to persist database file to disk:', e);
    }
  }

  public getProjects(category?: string, search?: string): Project[] {
    let result = [...this.data.projects];
    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some(t => t.toLowerCase().includes(q))
      );
    }
    return result;
  }

  public getProjectById(id: string): Project | undefined {
    return this.data.projects.find(p => p.id === id);
  }

  public createProject(projectData: Omit<Project, 'id'> & { id?: string }): Project {
    const id = projectData.id || `proj-${Date.now()}`;
    const newProject: Project = {
      ...projectData,
      id,
      stars: projectData.stars ?? 0,
      year: projectData.year ?? new Date().getFullYear().toString(),
      featured: projectData.featured ?? false,
      metrics: projectData.metrics ?? [{ label: 'Performance', value: '100%' }],
      architecture: projectData.architecture ?? {
        frontend: 'React 19',
        backend: 'Express.js',
        database: 'PostgreSQL',
        deployment: 'Cloud Run / Vercel'
      },
      keyDecisions: projectData.keyDecisions ?? ['Architected with modular full-stack separation']
    };

    this.data.projects.unshift(newProject);
    this.saveData();
    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | null {
    const idx = this.data.projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.projects[idx] = { ...this.data.projects[idx], ...updates, id };
    this.saveData();
    return this.data.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const initLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter(p => p.id !== id);
    if (this.data.projects.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  public getSkills(): Skill[] {
    return this.data.skills;
  }

  public getExperience(): Experience[] {
    return this.data.experience;
  }

  public getTestimonials(): Testimonial[] {
    return this.data.testimonials;
  }

  public getMessages(): ContactMessage[] {
    return this.data.messages;
  }

  public createMessage(msg: { name: string; email: string; subject: string; message: string; category?: ContactMessage['category'] }): ContactMessage {
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      category: msg.category || 'General Inquiry' as any,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };
    this.data.messages.unshift(newMessage);
    this.saveData();
    return newMessage;
  }

  public updateMessageStatus(id: string, status: ContactMessage['status']): ContactMessage | null {
    const msg = this.data.messages.find(m => m.id === id);
    if (!msg) return null;
    msg.status = status;
    this.saveData();
    return msg;
  }

  public deleteMessage(id: string): boolean {
    const initLen = this.data.messages.length;
    this.data.messages = this.data.messages.filter(m => m.id !== id);
    if (this.data.messages.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  public getStats(): DatabaseStats {
    let sizeKb = 12;
    try {
      if (fs.existsSync(DB_FILE)) {
        const stat = fs.statSync(DB_FILE);
        sizeKb = Math.round(stat.size / 1024);
      }
    } catch {
      // fallback
    }

    const memoryMb = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
    const uptimeSec = Math.round((Date.now() - startTime) / 1000);

    return {
      projectsCount: this.data.projects.length,
      messagesCount: this.data.messages.length,
      skillsCount: this.data.skills.length,
      experienceCount: this.data.experience.length,
      uptimeSeconds: uptimeSec,
      memoryUsageMb: memoryMb,
      databaseSizeKb: sizeKb,
      lastBackup: this.data.lastUpdated
    };
  }

  public getSchema(): { ddl: string; tables: { name: string; count: number; columns: string[] }[] } {
    return {
      ddl: DATABASE_SCHEMA_DDL,
      tables: [
        {
          name: 'projects',
          count: this.data.projects.length,
          columns: ['id', 'title', 'tagline', 'category', 'description', 'full_story', 'tech_stack', 'live_url', 'repo_url', 'image_url', 'metrics', 'stars', 'year', 'featured', 'architecture', 'key_decisions']
        },
        {
          name: 'skills',
          count: this.data.skills.length,
          columns: ['id', 'category', 'name', 'proficiency', 'years', 'highlight', 'level']
        },
        {
          name: 'experience',
          count: this.data.experience.length,
          columns: ['id', 'role', 'company', 'period', 'location', 'type', 'description', 'achievements', 'tech_stack']
        },
        {
          name: 'contact_messages',
          count: this.data.messages.length,
          columns: ['id', 'name', 'email', 'subject', 'message', 'category', 'created_at', 'status']
        },
        {
          name: 'testimonials',
          count: this.data.testimonials.length,
          columns: ['id', 'name', 'role', 'company', 'avatar', 'quote', 'relationship']
        }
      ]
    };
  }

  public resetDatabase(): void {
    this.data = {
      projects: [...INITIAL_PROJECTS],
      skills: [...INITIAL_SKILLS],
      experience: [...INITIAL_EXPERIENCE],
      testimonials: [...INITIAL_TESTIMONIALS],
      messages: [...INITIAL_MESSAGES],
      lastUpdated: new Date().toISOString()
    };
    this.saveData();
  }

  // Interactive SQL query execution engine
  public executeSql(sql: string): QueryResult {
    const t0 = performance.now();
    const cleanSql = sql.trim().replace(/;+$/, '');

    try {
      if (!cleanSql) {
        return {
          columns: [],
          rows: [],
          rowCount: 0,
          executionTimeMs: 0,
          query: sql,
          error: 'Empty query'
        };
      }

      if (/^SHOW\s+TABLES/i.test(cleanSql)) {
        const rows = [
          { table_name: 'projects', rows: this.data.projects.length },
          { table_name: 'skills', rows: this.data.skills.length },
          { table_name: 'experience', rows: this.data.experience.length },
          { table_name: 'contact_messages', rows: this.data.messages.length },
          { table_name: 'testimonials', rows: this.data.testimonials.length }
        ];
        return {
          columns: ['table_name', 'rows'],
          rows,
          rowCount: rows.length,
          executionTimeMs: Math.round((performance.now() - t0) * 100) / 100,
          query: sql
        };
      }

      // SELECT queries
      const selectMatch = cleanSql.match(/^SELECT\s+(.+?)\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+([a-zA-Z0-9_]+)(?:\s+(ASC|DESC))?)?(?:\s+LIMIT\s+(\d+))?$/i);

      if (!selectMatch) {
        // Fallback for simple queries
        if (cleanSql.toUpperCase().startsWith('SELECT')) {
          return {
            columns: ['status'],
            rows: [{ status: 'SQL syntax accepted. Use standard SELECT col1, col2 FROM [projects|skills|contact_messages|experience] WHERE ... ORDER BY ... LIMIT ...' }],
            rowCount: 1,
            executionTimeMs: Math.round((performance.now() - t0) * 100) / 100,
            query: sql
          };
        }
        return {
          columns: [],
          rows: [],
          rowCount: 0,
          executionTimeMs: Math.round((performance.now() - t0) * 100) / 100,
          query: sql,
          error: 'Query not supported in read-only sandbox. Supported: SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ... or SHOW TABLES'
        };
      }

      const [, rawCols, rawTable, rawWhere, rawOrderBy, rawOrderDir, rawLimit] = selectMatch;
      const tableName = rawTable.toLowerCase();

      let targetData: any[] = [];
      if (tableName === 'projects') targetData = this.data.projects;
      else if (tableName === 'skills') targetData = this.data.skills;
      else if (tableName === 'experience') targetData = this.data.experience;
      else if (tableName === 'contact_messages' || tableName === 'messages') targetData = this.data.messages;
      else if (tableName === 'testimonials') targetData = this.data.testimonials;
      else {
        return {
          columns: [],
          rows: [],
          rowCount: 0,
          executionTimeMs: Math.round((performance.now() - t0) * 100) / 100,
          query: sql,
          error: `Table "${rawTable}" does not exist in schema. Available tables: projects, skills, experience, contact_messages, testimonials.`
        };
      }

      let filtered = [...targetData];

      // WHERE clause filtering (simple parser for = / > / < / LIKE / !=)
      if (rawWhere) {
        const whereClause = rawWhere.trim();
        filtered = filtered.filter(row => {
          try {
            // handle simple equality: col = 'val' or col = 1 or col = true
            const eqMatch = whereClause.match(/([a-zA-Z0-9_]+)\s*(=|!=|>|<|LIKE)\s*['"]?([^'"]+)['"]?/i);
            if (eqMatch) {
              const [, col, op, val] = eqMatch;
              const rowVal = row[col] ?? row[toCamelCase(col)];
              if (rowVal === undefined) return false;

              if (op === '=') {
                if (typeof rowVal === 'boolean') return String(rowVal) === val.toLowerCase();
                if (typeof rowVal === 'number') return Number(rowVal) === Number(val);
                return String(rowVal).toLowerCase() === val.toLowerCase();
              } else if (op === '!=') {
                return String(rowVal).toLowerCase() !== val.toLowerCase();
              } else if (op === '>') {
                return Number(rowVal) > Number(val);
              } else if (op === '<') {
                return Number(rowVal) < Number(val);
              } else if (op.toUpperCase() === 'LIKE') {
                const pattern = val.replace(/%/g, '.*');
                return new RegExp(pattern, 'i').test(String(rowVal));
              }
            }
            return true;
          } catch {
            return true;
          }
        });
      }

      // ORDER BY
      if (rawOrderBy) {
        const col = rawOrderBy.trim();
        const isDesc = (rawOrderDir || '').toUpperCase() === 'DESC';
        filtered.sort((a, b) => {
          const valA = a[col] ?? a[toCamelCase(col)];
          const valB = b[col] ?? b[toCamelCase(col)];
          if (valA === valB) return 0;
          if (valA === undefined) return 1;
          if (valB === undefined) return -1;
          if (typeof valA === 'number' && typeof valB === 'number') {
            return isDesc ? valB - valA : valA - valB;
          }
          return isDesc
            ? String(valB).localeCompare(String(valA))
            : String(valA).localeCompare(String(valB));
        });
      }

      // LIMIT
      if (rawLimit) {
        const lim = parseInt(rawLimit, 10);
        if (!isNaN(lim)) {
          filtered = filtered.slice(0, lim);
        }
      }

      // Project columns
      let columns: string[] = [];
      let mappedRows: Record<string, unknown>[] = [];

      if (rawCols.trim() === '*') {
        if (filtered.length > 0) {
          columns = Object.keys(filtered[0]).filter(k => typeof filtered[0][k] !== 'object' || Array.isArray(filtered[0][k]));
        } else {
          columns = ['id', 'title', 'category'];
        }
        mappedRows = filtered.map(row => {
          const obj: Record<string, unknown> = {};
          for (const col of columns) {
            obj[col] = Array.isArray(row[col]) ? row[col].join(', ') : row[col];
          }
          return obj;
        });
      } else {
        const requestedCols = rawCols.split(',').map(c => c.trim());
        columns = requestedCols;
        mappedRows = filtered.map(row => {
          const obj: Record<string, unknown> = {};
          for (const col of requestedCols) {
            const val = row[col] ?? row[toCamelCase(col)];
            obj[col] = Array.isArray(val) ? val.join(', ') : (val ?? null);
          }
          return obj;
        });
      }

      const elapsed = Math.round((performance.now() - t0) * 100) / 100;
      return {
        columns,
        rows: mappedRows,
        rowCount: mappedRows.length,
        executionTimeMs: elapsed,
        query: sql
      };
    } catch (err: any) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: Math.round((performance.now() - t0) * 100) / 100,
        query: sql,
        error: err.message || 'Execution error'
      };
    }
  }
}

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, g) => g.toUpperCase());
}

export const db = new PortfolioDatabase();
