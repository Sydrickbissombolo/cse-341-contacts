const express = require('express');

const mongodb = require('./data/database');
const e = require('express');
const app = express();

const PORT = process.env.PORT || 5000

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
      console.error("❌ Failed to connect to database:", err);
  } else {
      console.log("✅ Database initialized successfully");
      
      // Start Server
      app.listen(PORT, () => {
          console.log(`🚀 Server is running on http://localhost:${PORT}`);
      });
  }
});