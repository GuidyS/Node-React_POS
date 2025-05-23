const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Static serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    // unique filename: timestamp-originalname
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Upload image endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Return the URL to access the image
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// TODO: Replace with your actual SQL Server config
const config = {
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  server: 'YOUR_DB_SERVER', // เช่น 'localhost' หรือ '192.168.1.100'
  database: 'YOUR_DB_NAME',
  options: {
    encrypt: true, // สำหรับ Azure หรือ SQL Server ที่ต้องการ encryption
    trustServerCertificate: true // สำหรับ local dev
  }
};

/**
 * MainMenu API (ใช้ตาราง MainMenu)
 */

// GET all menu items
app.get('/api/mainmenu', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM MainMenu');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST new menu item (with image and tag)
app.post('/api/mainmenu', upload.single('menu_image'), async (req, res) => {
  const { menu_name, menu_description, menu_price, menu_status, menu_tag } = req.body;
  let image_url = null;
  if (req.file) {
    image_url = `/uploads/${req.file.filename}`;
  }
  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO MainMenu (menu_name, menu_description, menu_price, menu_status, image_url, menu_tag)
      VALUES (${menu_name}, ${menu_description}, ${menu_price}, ${menu_status}, ${image_url}, ${menu_tag})
    `;
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT update menu item
app.put('/api/mainmenu/:id', async (req, res) => {
  const { menu_name, menu_description, menu_price, menu_status, image_url } = req.body;
  try {
    await sql.connect(config);
    await sql.query`
      UPDATE MainMenu
      SET menu_name=${menu_name},
          menu_description=${menu_description},
          menu_price=${menu_price},
          menu_status=${menu_status},
          image_url=${image_url},
          updated_at=GETDATE()
      WHERE menu_id=${req.params.id}
    `;
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE menu item
app.delete('/api/mainmenu/:id', async (req, res) => {
  try {
    await sql.connect(config);
    await sql.query`DELETE FROM MainMenu WHERE menu_id=${req.params.id}`;
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
