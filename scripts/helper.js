// Code from http://stackoverflow.com/a/4673436
// Example: printf('{0} is dead, but {1} is alive! {0} {2}', 'ASP', 'ASP.NET');
// Result: "ASP is dead, but ASP.NET is alive! ASP {2}"

hexo.extend.helper.register('printf',function(format){
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
});
