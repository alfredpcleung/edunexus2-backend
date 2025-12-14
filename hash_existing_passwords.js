// hash_existing_passwords.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/user.model');

const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-uri-here';

async function hashPasswords() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const users = await User.find();
  let updatedCount = 0;

  for (const user of users) {
    // Check if password is already hashed (bcrypt hashes start with $2)
    if (!user.password.startsWith('$2')) {
      const hashed = await bcrypt.hash(user.password, 10);
      user.password = hashed;
      await user.save();
      updatedCount++;
      console.log(`Updated password for user: ${user.email}`);
    }
  }

  console.log(`Done! Updated ${updatedCount} user(s).`);
  await mongoose.disconnect();
}

hashPasswords().catch(err => {
  console.error('Error updating passwords:', err);
  mongoose.disconnect();
});
