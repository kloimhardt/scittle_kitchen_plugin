# scittle_kitchen_plugin
## Tutorials

https://api.onlyoffice.com/docs/plugin-and-macros/samples/plugins/hello-world/
https://api.onlyoffice.com/docs/office-api/get-started/overview/

https://deepwiki.com/ONLYOFFICE/onlyoffice.github.io/2.1-plugin-api-(asc.plugin)

blog on debugging plugins:
https://www.onlyoffice.com/blog/2025/11/debugging-onlyoffice-plugins-practical-guide

## Sources for plugin examples
https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins
https://github.com/ONLYOFFICE/sdkjs-plugins

### Get and paste html:
this is an especially good example

Description: https://api.onlyoffice.com/docs/plugin-and-macros/samples/plugins/get-and-paste-html/

Source: https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/html

## How to add Plugins in Euro-Office

```
python cors_server.py
```

Start Euro-Office. In browser developer console, on the right bottom switch from `top` to  `new.docx` (otherwise you get `ReferenceError: Asc is not defined`)

```
fetch("http://localhost:8003/config.json")
.then(function(response) {
  return response.json();
})
.then(function(data) {
  console.log(data);
});

Asc.editor.installDeveloperPlugin("http://localhost:8003/config.json")
```

`Plugins` appears next to `View`

## some methods

window.Asc.plugin.tr('Warning'): translates a string to the locale
