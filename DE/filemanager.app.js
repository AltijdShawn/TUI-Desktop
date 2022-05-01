var fs = require("fs");

module.exports = ([opt,deps]) => {
  var screen = deps.screen;
  var blessed = deps.blessed;
  var standalone = opt.standalone;

  var fm = blessed.filemanager({
    parent: screen,
    border: 'line',
    style: {
      selected: {
        bg: 'blue'
      }
    },
    height: 'half',
    width: 'half',
    top: 'center',
    left: 'center',
    label: ' File manager ',
    cwd: process.env.HOME,
    keys: true,
    vi: true,
    scrollbar: {
      bg: 'white',
      ch: ' '
    },
    draggable: true
  });
  
  var box = blessed.box({
    parent: screen,
    style: {
      bg: 'green'
    },
    border: 'line',
    height: 'half',
    width: 'half',
    top: 'center',
    left: 'center',
    hidden: true
  });

  require("./component/window-controls")({
    deps: deps,
    windowObject: fm,
    standalone: standalone,
  })

  fm.refresh();
  fm.focus()
  screen.render();
  
  screen.key('q', function() {
    // fm.hide()
    fm.destroy()
    screen.remove(fm);
  });
  
  screen.key(['s', 'p'], function() {
    fm.hide();
    screen.render();
    setTimeout(function() {
      fm.pick(function(err, file) {
        box.show();
        box.setContent(err ? err + '' : file);
        screen.render();
        setTimeout(function() {
          box.hide();
          fm.reset(function() {
            fm.show();
            screen.render();
          });
        }, 2000);
      });
    }, 2000);
  });
};
