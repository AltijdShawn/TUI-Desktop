module.exports = ([opt, deps]) => {
  var screen = deps.screen;
  var blessed = deps.blessed;
  var standalone = opt.standalone;
  
  var term = blessed.terminal({
    parent: screen,
    // arg: "-c 'neofetch'",
    label: " Terminal ",
    mouse: true,
    border: {
      type: "line",
    },
    cursorBlink: true,
    screenKeys: false,
    top: "center",
    left: "center",
    border: "line",

    height: "80%",
    width: "80%",

    cwd: process.env.HOME,
    keys: true,
    vi: true,

    scrollbar: {
      bg: "white",
      ch: " ",
    },
    style: {
      fg: "default",
      bg: "default",
      focus: {
        border: {
          fg: "green",
        },
      },
    },
  });

  require("./component/window-controls")({
    deps: deps,
    windowObject: term,
    standalone: standalone,
  })

  term.focus();
  screen.render();
};
