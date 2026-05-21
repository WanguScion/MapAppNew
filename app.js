//Imports
const express = require('express');
const pU = require('./src/utils/pathUtil');

//My Modules
const { homeController } = require(pU.path.join(pU.rootDir, 'src', 'controllers', 'homeController'));

//Declarations
const app = express();

app.use(express.static(pathUtil.path.join(pathUtil.rootDir, 'public')));

//routers
app.use('/home', homeController);
app.use('/', (req, res, next) => {
    res.redirect(301, '/home');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
