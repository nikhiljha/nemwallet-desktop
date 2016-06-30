// We are based on electron, so we need to initiate it.
const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window')
var system = "Unknown OS";
var os = require('os')

switch(os.type()) {
    case "Linux":
        system = "Linux";
        break;
    case "Darwin":
        system = "Mac";
        break;
    case "Windows_NT":
        system = "Windows";
        break;
    default:
        system = "Unknown OS";
}

// When the app is ready...
app.on('ready', function () {

  var express = require('express');
  var path = require('path');
  var app = express();

  // Define the port to run on
  app.set('port', 3000);

  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/lightwallet/wallet/*', express.static(path.join(__dirname + '/public')));
  app.use('/lightwallet/login', express.static(path.join(__dirname + '/public')));
  app.use('/lightwallet', express.static(path.join(__dirname + '/public')));

  // Listen for requests
  var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
  });

  // Create a new window and let it load in the background.
  var win = new BrowserWindow({autoHideMenuBar: true, nodeIntegration: false, width: 1280, height: 720, show: false, title: "NEM Wallet for " + system});

  // When it is closed, delete the window.
  win.on('closed', function() {
    win = null;
  });

  // Don't let the page title change!
  win.on('page-title-updated', function(event) {
    event.preventDefault();
  });

  win.loadURL('http://localhost:3000/#!/login');
  win.show();
})
