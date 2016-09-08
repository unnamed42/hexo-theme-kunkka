hexo.extend.generator.register('customed',function(local){
    return [
        {path: '/404.html', data: {}, layout: ['404','base']},
        {path: '/search.html', data: {}, layout: ['search','layout']}
    ];
}); 
