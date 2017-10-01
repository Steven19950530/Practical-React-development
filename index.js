/**
 * Main page for Bluemix development
 */
const express = require('express')
const port = process.env.PORT || 3001;
const app = express();

app.use(express.static(`${__dirname}/ui-react/build`));
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/ui-react/build/index.html`);
}) 

app.listen(port, (err) => {
 if (err) {
   console.log(err);
   return;
 }
 console.log(`Server is live at http://localhost:${port}`);
});