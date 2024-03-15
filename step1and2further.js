const fs = require('fs')
const axios = require('axios')

async function cat(file) {
    try {
        const data = await fs.promises.readFile(file, 'utf8')
        console.log(data)
    } catch (err) {
        console.error(`ERROR IS: ${err}`)
        process.exit(1)
    }
}
async function webCat(url) {
    try {
        const resp = await axios.get(url)
        console.log(resp.data)
    } catch (err) {
        console.error(`ERROR IS: ${err}`)
        process.exit(1)
    }
}
async function processArguments() {
    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i]
        if (arg.slice(0, 4) !== 'http') await cat(arg)
        else await webCat(arg)
    }
}
processArguments()
