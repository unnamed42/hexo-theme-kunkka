"use strict";

// check if license is common creatives
hexo.extend.helper.register("is_cc", (license) => license.startsWith("by") || license === "zero");
