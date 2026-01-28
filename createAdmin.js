require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const exists = await User.findOne({ email: 'admin@parlour.com' });

  if (exists) {
    console.log("Admin already exists.");
    process.exit(0);
  }

  const hashed = await bcrypt.hash('Password@123', 10);

  const admin = new User({
    name: "Admin",
    email: "admin@parlour.com",
    password: hashed,
    role: "admin"
  });

  await admin.save();

  console.log("Admin created → Email: admin@parlour.com | Password: Password@123");
  process.exit(0);
}

main();
