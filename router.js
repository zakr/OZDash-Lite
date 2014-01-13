//basic route loader
require("fs").readdirSync("./dist/routes").forEach(function(file) {
    var fn = file.replace(/(.*)\.(.*?)$/, "$1");
    exports[fn] = require("./dist/routes/" + file);
});