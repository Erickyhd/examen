import app from "./app.js";
import {port} from "./config.js";
import db from "./db.js";

app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`);
});
