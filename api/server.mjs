import app from "./index.mjs";
const PORT = process.env.PORT || 3000;
console.log("1")
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});