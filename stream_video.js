const express = require('express');
const server = express();
const os = require( 'os' );
var fs = require( 'fs' );

if(!process.argv[2]){
	return console.log('Path is required');
}
const path = process.argv[2];

server.get('/', (req, res) => {
	fs.readdir(path, (err, files) =>{
		let response = '';
		files.forEach((file) => {
			response  += `<a href="/watch/${ file }"> ${ file }</a> <br />`;
		});
		res.send(response);
	})
});

server.get('/watch/:file', (req, res) => {
	const response = `
		<video src="${ '/' + req.params.file }" controls autoplay>
		</video>
	`;
	res.send(response);
});

server.use(express.static(path));
server.listen(process.argv[3] || 80);

const interfaces = os.networkInterfaces();
const addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

process.stdout.write('Serving video at: ');
console.log(addresses.toString() + ':' + (process.argv[3] || 80));