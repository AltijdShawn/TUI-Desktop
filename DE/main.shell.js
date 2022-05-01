module.exports = (deps) => {
  var screen = deps.screen;
  var blessed = deps.blessed;

  var bg = blessed.image({
    parent: screen,
    top: "center",
    left: "center",
    width: "100%",
    height: "100%",
    file: "../Wallpaper.png",
  })

  screen.append(bg);
  screen.on("keypress", (ch, key) => {
    // throw new Error(key.name);
    
    // check if the menu is needed
    if (key.name == "f7") {
      require("./Ro-Menu/ro-menu")(ch,key,deps);
    }
  });
  screen.render();
  
};
