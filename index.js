const app = require("./app");

const port = 5000;

const startServer = () => {
  app.listen(port, () => {
    console.log(`API is running on port ${port}`);
  });
};

startServer();
