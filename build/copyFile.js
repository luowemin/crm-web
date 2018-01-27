var fs = require('fs');
var chalk = require('chalk')
module.exports = function(files,config){
	if(!config.buildAll){
		var pages = config.pages;
		files = files.filter((f) => {
			var flag = false;
			pages.forEach((p) => {
				if(f.indexOf(p) > -1){
					flag = true;
				}
			})
			return flag;
		});
	}
	var publicPath = config.build.assetsPublicPath;
	files.forEach((f) => {
		console.log('copy file:'+f);
		var dist = f.replace('/dist',publicPath);
		fs.createReadStream(f).pipe(fs.createWriteStream(dist));
	});
	console.log(chalk.cyan('  copy complete total ' + files.length + ' files.\n'))
}
