# scittle_kitchen_plugin
## Start EurOffice
Download the EurOffice docker image

```
docker pull ghcr.io/euro-office/documentserver:latest
```

In the terminal, start docker and run that image
```
sudo systemctl start docker

sudo docker run -i -t -d -p 8090:80 --restart=always -e EXAMPLE_ENABLED=true -e JWT_SECRET=my_jwt_secret ghcr.io/euro-office/documentserver:latest
```
To run the image, there needs to be a `/etc/onlyoffice/documentserver/local.json` file which disables the JWT security check (see below). Also note that the port I chose is hardcoded to be `8090`. On my Fedora-Linux machine, there always appears a "docker: Error ... Bind for 0.0.0.0:8090 failed: port is already allocated" error, I always ignore this error and still the following works.

You need to be connected to the public internet (for whatever reason otherwise you get a gateway-error). When in Firefox you open ...
```
http://localhost:8090/example/
```

... you should see the EurOffice logo and the "Create new" link on the top left. Create a spreadsheet `new.xlsx`.

Clone this repository and start the `cors_server.py` local Python web-server via

```
~/klmtemp/scittle_kitchen_plugin/emmy_plugin$ python ../cors_server.py  `
```

Within the EurOffice browser spreadsheet `new.xlsx`, open the browser Developer Console. On the bottom right, change the evaluation  context from `Top` to `new.xslx - Euro Office ` (otherwise you get `ReferenceError: Asc is not defined`)

To activeate the emmy_plugin, type

```
Asc.editor.installDeveloperPlugin("http://localhost:8003/config.json")
```
You should see, on top next to the `View` menu, the `Plugins` menu.

Should there be any Cors error in the console, check whether the cors_server.py works crrectly by trying to fetch the config.json (sometimes just fetching helps to resolve an eventual Cors issue)

```
fetch("http://localhost:8003/config.json")
.then(function(response) {
  return response.json();
})
.then(function(data) {
  console.log(data);
});
```

## Create local.json
For local test use of the plugin, one can disable JWT security. Indeed for my setup, I need to disable JWT. Of course JWT must not be disabled when running a production server, a usecase I am not describing here, rather I am describing a local EurOffice playground.

To disable JWT, create the file `/etc/onlyoffice/documentserver/local.json`

```
"services": {
    "CoAuthoring": {
        "token": {
            "enable": {
                "browser": false,
                "request": {
                    "inbox": false,
                    "outbox": false
                }
            }
        }
    }
}
```

## Tutorials for writing EurOffice plugins

https://api.onlyoffice.com/docs/plugin-and-macros/samples/plugins/hello-world/

https://api.onlyoffice.com/docs/office-api/get-started/overview/

https://deepwiki.com/ONLYOFFICE/onlyoffice.github.io/2.1-plugin-api-(asc.plugin)

https://www.onlyoffice.com/blog/2025/11/debugging-onlyoffice-plugins-practical-guide

### Sources for plugin examples

https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins

https://github.com/ONLYOFFICE/sdkjs-plugins

### This plugin is based on the OnlyOffice get-and-paste-html plugin

Description:

https://api.onlyoffice.com/docs/plugin-and-macros/samples/plugins/get-and-paste-html/

Source:

https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/html

### Some methods not well documented yet

`window.Asc.plugin.tr('Sometext')`: translates a string to the locale
