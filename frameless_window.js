function closeWindow() {
  const remote = require('electron').remote;
  var window = remote.getCurrentWindow();
  window.close();
}
