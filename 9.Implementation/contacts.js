const fs = require('fs') 
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// membuat folder dengan nama data jika belum ada
const dirPath = './data'
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

// membuat file contacs.json jika belum ada
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama)
        })
    })
}

const simpanContact = (nama, email, noHP) => {
    // const contact = {nama: nama, email:email, noHP:noHP} //krn propertis dan value sama jadi propertis tidak perlu ditulis
    const contact = {nama, email, noHP}
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)

    contacts.push(contact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

    console.log('data sudah tersimpan')
    rl.close()
}

module.exports = {tulisPertanyaan, simpanContact}