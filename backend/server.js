const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const upload = multer();

app.post("/api/company-administrator", upload.none(), (req, res) => {
  const formData = req.body;
  console.log("Form Data : ", formData);
  res.status(200).json({
    message: "Form successfully submitted",
    data: formData,
  });
});

app.get("/api/company-administrator", () => {});

app.listen(3000, () => {
  console.log("Server is running on PORT : 3000");
});
