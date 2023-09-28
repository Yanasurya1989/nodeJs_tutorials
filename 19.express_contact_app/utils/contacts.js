const fs = require('fs') 

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


// ambil semua data di contact.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(fileBuffer)

    return contacts 
}

// cari contact berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
    return contact
}

// menuliskan / menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

// menambahkan data contact baru
const addContact = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContacts(contacts)
}

// cek nama yang duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.nama === nama)
}

// hapus contact
const deleteContact = (nama) => {
    const contact = loadContact() //ambil contact dari json
    const filteredContacts = contact.filter((contact) => contact.nama !== nama) //filter akan mengembalikan semua data dalam json berbeda dengan find yang hanya akan menemukan satu sesuai request, dan pada kasus ini akan mengembalikan nama2 selain dari yang di kirimkan(argumen)

    // console.log(filteredContacts) //akan menampilkan nama2 selain yang di delete, untuk menjalankan lihat pada console log setelah nodemon (menjalankan app)
    saveContacts(filteredContacts) //save contact adalah fungsi yang telah dibuat untuk menampilkan list data setelah menambahkan, nah sekarang pada fungsi ini save contact diisi dengan fungsi filtered contact yaitu menampilkan semua data selain yang di pilih untuk menjalankan fungsi delete
}

// mengubah contacts
const updateContacts = (contactBaru) => {
    const contacts = loadContact()

    // hilangkan contact lama yang namanya sama dengan oledNama
    const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oledNama)

    // console.log(filteredContacts, contactBaru)
    delete contactBaru.oledNama
    filteredContacts.push(contactBaru)
    saveContacts(filteredContacts)
}
module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts }