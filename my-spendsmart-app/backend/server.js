const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Configuração do CORS para permitir solicitações de diferentes domínios (necessário para um frontend separado)
app.use(cors());

// Configuração do Multer para lidar com uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rota para lidar com uploads de imagem
app.post('/uploadImage', upload.single('image'), (req, res) => {
  res.status(200).send('Imagem enviada com sucesso!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});