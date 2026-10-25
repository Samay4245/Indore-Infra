const bcrypt = require('bcryptjs');
const db = require('./config/db');

async function createAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in the environment.');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [existing] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      await db.execute('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username]);
      console.log(`Admin user (${username}) password updated.`);
    } else {
      await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
      console.log(`Admin user (${username}) created.`);
    }
  } finally {
    await db.end();
  }
}

createAdmin().catch((error) => {
  console.error('Error creating admin:', error);
  process.exitCode = 1;
});
