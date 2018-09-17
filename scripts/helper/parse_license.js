"use strict";

hexo.extend.helper.register("parse_license", (license) => {
    if(license.startsWith("by") || license == "zero") {
        return {
            url: "https://creativecommons.org/licenses/" + license + "/4.0",
            name: license.toUpperCase()
        };
    } else
        return {
            url: "",
            name: license
        };
});
