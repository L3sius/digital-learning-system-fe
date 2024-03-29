const express = require("express");
const path = require("path");
const app = express();

app.use(
  express.static(
    path.join(__dirname, "dist/digital-learning-system-fe/browser")
  )
);

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "dist/digital-learning-system-fe/browser/index.html")
  );
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
