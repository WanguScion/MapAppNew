const express = require('express');
const pU = require('../utils/pathUtil');

const { authController } = require(pU.path.join(pU.rootDir, 'src', 'controllers', 'home.auth.controller'));
const { mapController } = require(pU.path.join(pU.rootDir, 'src', 'controllers', 'home.map.controller'));

const homeController = express.Router();

homeController.use('/auth', authController);
homeController.use('/map', mapController);

homeController.use((req, res, next) => {
    res.redirect('views/homepage.html');
});

module.exports = {
    homeController
};
