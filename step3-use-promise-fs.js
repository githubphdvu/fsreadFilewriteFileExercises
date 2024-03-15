const fs = require('fs')
const {readFile, writeFile} = fs.promises
const process = require('process')
const axios = require('axios')

async function cat(file) {
    try {
        return await readFile(file, 'utf8')
    } 
    catch (err) {
        console.error(`ERROR IS: ${err}`)
        process.exit(1)
    }
}
async function webCat(url) {
    try {
        return (await axios.get(url)).data
    } 
    catch (err) {
        console.error(`ERROR IS: ${err}`)
        process.exit(1)
    }
}
async function write(path, contents) {
    try {
        await writeFile(path, contents, "utf8")
    } 
    catch (err) {
      console.error(`Error writing ${path}: ${err}`)
      process.exit(1)
    }
}
async function main() {
    let from
    let toFile

    if (process.argv[2] === '--out') {
        toFile = process.argv[3]
        path = process.argv[4]
    } 
    else from = process.argv[2]

    let contentsPromise = (from.slice(0, 4) === 'http') ? webCat(from)
                                                        : cat(from)
    let contents = await contentsPromise
    if (toFile) await write(toFile, contents)
    else console.log(contents)
}
main()