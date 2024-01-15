const fs = require('fs');

fs.readFile('./test.txt', 'utf8', (error,data) => {
   
    fs.mkdir('./files', () =>{
        fs.writeFile('./files/test2.txt', `${data} New text!`,() => {

        });    
    });
    console.log(data);
});

