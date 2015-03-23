var fs = require('fs'),
    path = require('path'),
    nconf = require('nconf'),
    meta = require('../../src/meta'),
    user = require('../../src/user'),
    websockets = require('../../src/socket.io/index.js'),
    templates = module.parent.require('templates.js');

var constants = Object.freeze({
    'name' : 'Cash Item Store',
    'admin' : {
        'route' : '/store',
        'icon' : 'fa-money'
    },
    'defaults' : {
        'items' : [
            { 'name' : 'Bronze badge', 'price' : 10 },
            { 'name' : 'Silver badge', 'price' : 50 },
            { 'name' : 'Gold badge', 'price' : 250 }
        ]
    }
});

var Store = {};

// Render the admin page
function renderAdmin(req, res, next) {
    if (res.locals.isAPI) {
        res.json({});
    } else {
        res.render('admin/store', {});
    }
}

// Retrieve store page for user
// TODO: what do we really want to do here?
function getStore(req, res, next) {

    user.getUserField(req.user.uid, 'items', function(err, items) {
        res.json({
            items : items || [] 
        });
    });
}

// Handle a buy request
// TODO: is this the right place?
function buyStore(req, res, next) {
    user.getUserField(req.user.uid, 'currency', function(err, points) {
        if (err) {
            return next(err);
        }
   
        // TODO: lookup item from req params
        // TODO: perform transaction (assign item to user, remove points)
        // TODO: return salient info

        res.json({
            transaction : true 
        });
    });
}

// Setup routing
Store.init = function(params, callback) {
    var app = params.router;
    var middleware = params.middleware;
    var controllers = params.controllers;

    app.get('/admin/store', middleware.admin.builderHeader, renderAdmin);
    app.get('/api/admin/store', renderAdmin);
    app.get('/api/store', middleware.authenticate, getStore);
    app.post('/api/store', middleware.authenticate, buyStore);

    callback();
};

Store.addAdminNavigation = function(header, callback) {
    header.plugins.push({
        'route' : constants.admin.route,
        'icon' : constants.admin.icon,
        'name' : constants.name
    });

    callback(null, header);
};

Store.addProfileInfo = function(profile, callback) {
    user.getUserField(profile.uid, 'items', function(err, data) {
        var prefix = "<span class='bought-items'>";
        var suffix = "</span>";

        var html = data.reduce(function(h, item) {
            h += '<b>' + item.name + '</b>, ';
        }, prefix) + suffix;

        profile.profile.push({
            content : html
        });

        callback(err, profile);
    });
};

Store.buyItem = function(data) {
    
};

module.exports = Store;
