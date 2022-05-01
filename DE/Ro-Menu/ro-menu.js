const fs = require("fs");
module.exports = (ch, key, deps) => {
  var screen = deps.screen;
  var blessed = deps.blessed;

  var prompt = blessed.prompt({
    parent: screen,
    border: "line",
    height: "shrink",
    width: "half",
    top: "center",
    left: "center",
    label: " {blue-fg}Ro-Menu{/blue-fg} ",
    tags: true,
    keys: true,
    vi: true,
  });
  prompt.input("", (err, value) => {
    try {
      // Slice args
      var args = value.split(" ");
      // var cmd = args.shift();
      // var cmd_args = args;

      if (args[0] === "") {
          return;
      } else if (args[0] === "exit") {
        process.exit(0);
      } else if (args[0] === "cancel") return;
      else if (args[0] === "run-app") {
        try {
          return require(`../${args[1]}.app`)(
            [
              {
                standalone: false
              },
              deps
            ],
            args.slice(2)
          );
        } catch (e) {
          var msg = blessed.message({
            parent: screen,
            border: "line",
            height: "shrink",
            width: "half",
            top: "center",
            left: "center",
            label: " {blue-fg}Ro-Menu Message{/blue-fg} ",
            tags: true,
            keys: true,
            vi: true,
          });
          screen.log(e);
          return msg.error("Program not found");
        }
      }
        else if (args[0] === "run-js") {
          try {
            eval(`${args.slice(1).join(" ")}`);
            screen.render()
            return;
          } catch (e) {
            var msg = blessed.message({
              parent: screen,
              border: "line",
              height: "shrink",
              width: "half",
              top: "center",
              left: "center",
              label: " {blue-fg}Ro-Menu Message{/blue-fg} ",
              tags: true,
              keys: true,
              vi: true,
            });
            msg.error(e);
          }
      
      // else if (args[0] === "run-js") {
      //   var msg = blessed.message({
      //     parent: screen,
      //     border: "line",
      //     height: "shrink",
      //     width: "half",
      //     top: "center",
      //     left: "center",
      //     label: " {blue-fg}Ro-Menu Message{/blue-fg} ",
      //     tags: true,
      //     keys: true,
      //     vi: true,
      //   });
      //   msg.display(
      //     "This is currently disabled, because of a bug in the ro-menu module.\nThe bug causes the whole shell to freeze, we are working on fixing it",
      //     0
      //   );
      } else {
        var msg = blessed.message({
          parent: screen,
          border: "line",
          height: "shrink",
          width: "half",
          top: "center",
          left: "center",
          label: " {blue-fg}Ro-Menu Message{/blue-fg} ",
          tags: true,
          keys: true,
          vi: true,
        });
        fs.readFile("./DE/Ro-Menu/man.ro-menu.txt", "utf8", (err, data) => {
          if (err) throw new Error(err);
          return msg.display(data, 0);
        });
      }
    } catch (e) {
      return;
    }
  });

  screen.render();
};
