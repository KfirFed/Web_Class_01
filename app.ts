import dotenv from "dotenv";
import { initApp, swagger } from "./server";

dotenv.config();
const port = process.env.PORT;

const app = initApp();

initApp().then((app) => {
  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
  swagger(app);
});
