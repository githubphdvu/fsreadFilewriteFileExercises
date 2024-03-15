const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(file) {//read file and console.log it
    fs.readFile(file, 'utf8',(err, data)=>{
        if (err) {
            console.error(`ERROR IS: ${err}`)
            process.exit(1)
        } 
        else  console.log(data)
    })
}
async function webCat(url) {//read url page and console.log it
    try {
        let resp = await axios.get(url)
        console.log(resp.data)
    } 
    catch (err) {
        console.error(`ERROR IS: ${err}`)
        process.exit(1)
    }
}
let arg = process.argv[2]
if (arg.slice(0, 4) !== 'http') cat(arg)
else webCat(arg)
