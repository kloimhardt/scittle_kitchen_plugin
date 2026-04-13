# scittle_kitchen_plugin
Tutorial

https://api.onlyoffice.com/docs/plugin-and-macros/samples/plugins/hello-world/
https://api.onlyoffice.com/docs/office-api/get-started/overview/

```
python cors_server.py
```

In browser developer console, on the right bottom switch from `top` to  `new.docx` (otherwise below you get `ReferenceError: Asc is not defined`)

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
generate uuid: `$ uuidgen`

`Plugins` appears next to `View`
