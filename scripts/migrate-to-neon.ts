/**
 * AmanDevs — Database Setup Script (Migration of historical records disabled)
 *
 * NOTE: Per production requirements, historical records in data/inquiries.json
 * are NOT imported into Neon PostgreSQL. The database starts completely empty (0 records).
 * This script initializes the schema and indexes safely.
 */

import "./init-neon-db";
