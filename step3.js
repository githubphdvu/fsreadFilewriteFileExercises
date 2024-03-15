const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(file, toFile) {
    fs.readFile(file, 'utf8',(err, data)=>{
        if (err) {
            console.error(`ERROR IS: ${err}`)
            process.exit(1)
        } 
        else  helper(data, toFile)
    })
}
async function webCat(url, toFile) {
    try {
        let resp = await axios.get(url)
        helper(resp.data, toFile)
    } 
    catch (err) {
        console.error(`ERROR IS: ${err}`)
        process.exit(1)
    }
}
function helper(data, toFile) {//write to toFile if --out given, else console.log it
    if (!toFile) console.log(data)
    else  {
        fs.writeFile(toFile, data, 'utf8',err=>{
            if (err) {
                console.error(`ERROR IS: ${err}`)
                process.exit(1)
            }
        })
    } 
}

let toFile,from

if (process.argv[2] === '--out') {//node step3.js --out  toFile  from
    toFile = process.argv[3]
    from = process.argv[4]
} 
else  from = process.argv[2]

if (from.slice(0, 4) !== 'http')  cat(from, toFile)
else webCat(from, toFile)
