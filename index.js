var blessed = require("./lib/blessed/lib/blessed");
  // contrib = require("./lib/blessed-contrib/index");

var screen = blessed.screen({
  smartCSR: true,
  log: "./logs/TUI-DE.log",
  fullUnicode: true,
  dockBorders: true,
  autoPadding: false,
  ignoreDockContrast: true,
  warnings: true,
});
const std = {
  dependencies: {
    blessed: blessed,
    // contrib: contrib,
    screen: screen,
  },
};
const cmdFlags = process.argv.slice(2);
if (cmdFlags[0] === "--standalone-app") {
  require(`./DE/${cmdFlags[1]}.app`)(
    [
      {
        standalone: true,
      },
      std.dependencies,
    ],
    cmdFlags.slice(2)
  );
} else  require("./DE/main.shell")(std.dependencies);

screen.key(["C-c"], function (ch, key) {
  try {
    return screen.destroy();
  } catch (e) {
    throw new Error(e);
  }
});

async function render() {
  try {
    // screen.append(
    //   [

    //   ]
    // );

    screen.render();
    // render()
  } catch (e) {
    throw new Error(e);
    process.exit(0);
  }
}
render();
