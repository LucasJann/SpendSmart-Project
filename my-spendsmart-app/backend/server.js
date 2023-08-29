const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 5000;

// Configuração do CORS para permitir solicitações do seu frontend (http://localhost:3000)
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Configuração do Multer para lidar com uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Rota para lidar com uploads de imagem
app.post("/uploadImage", upload.single("image"), (req, res) => {
  const imagePath = req.file.filename;
  const imageUrl = `${imagePath}`; 

  res.json({
    message: {
      path: imageUrl,
    },
  });
});

// Configuração para servir imagens estáticas da pasta "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
