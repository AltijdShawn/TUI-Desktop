var fs = require("fs");

module.exports = ([opt,deps], args) => {
  var screen = deps.screen;
  var blessed = deps.blessed;
  var standalone = opt.standalone;
  
  screen.spawn(`${args.join(" ")}`)
  
};
