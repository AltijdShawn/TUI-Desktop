module.exports = (settings) => {
    let maximized = false;

    const isStandalone = settings.standalone;
    const windowObject = settings.windowObject;
    const deps = settings.deps,
          screen = deps.screen,
          blessed = deps.blessed;


    var close_btn = blessed.box({
        parent: windowObject,
        top: 0,
        left: 0,
        shrink: true,
        content: "X",
        style: {
          bg: "red",
          focus: {
            bg: "red",
          },
        },
      });
      var maximize_btn = blessed.box({
        parent: windowObject,
        top: 0,
        left: "100%-1",
        shrink: true,
        content: "^",
        style: {
          bg: "green",
          focus: {
            bg: "green",
          },
        },
      });
    
      if (isStandalone) {
        windowObject.height = "100%";
        windowObject.width = "100%";
        close_btn.hide();
        maximize_btn.hide();
      }
    
      maximize_btn.on("click", () => {
        if (!isStandalone) toggleMaximized();
      });

      screen.key("f6", () => {
          windowObject.destroy();
          screen.render();
      })

      close_btn.on("click", () => {
        windowObject.destroy();
        screen.render();
      });
    
      let toggleMaximized = () => {
        if (maximized == false) {
          maximize_btn.style.bg = "blue";
          maximize_btn.style.focus.bg = "blue";
          windowObject.height = "100%";
          windowObject.width = "100%";
          maximized = true;
        } else if (maximized == true) {
          maximize_btn.style.bg = "green";
          maximize_btn.style.focus.bg = "green";
          windowObject.height = "80%";
          windowObject.width = "80%";
          maximized = false;
        }
        windowObject.focus();
        screen.render();
      };

      screen.render()
    };