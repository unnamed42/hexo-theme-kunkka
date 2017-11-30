"use strict";

// check if license is common creatives
hexo.extend.helper.register('is_cc', function(license) {
    return license.startsWith("by") || license == "zero";
});
