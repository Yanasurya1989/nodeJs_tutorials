const contacts = require('./contacts')

const main = async () => {
    const nama = await contacts.tulisPertanyaan('Masukan nama: ')
    const email = await contacts.tulisPertanyaan('Masukan email: ')
    const noHP = await contacts.tulisPertanyaan('Masukan noHP: ')

    contacts.simpanContact(nama, email, noHP)
}

main()
