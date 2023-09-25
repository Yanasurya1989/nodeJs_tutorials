const yargs = require("yargs")
const contacts = require('./contacts')
// console.log(process.argv[2])

// const command = process.argv[2]
// if(command === 'add'){

// }else if(command === 'remove'){

// }else if(command === 'list'){

// }

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true, //true berarti harus diisi
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false, //false berarti boleh ga diisi
            type: 'string',
        },
        noHP: {
            describe: 'No Hp',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        // const contact = {
        //     nama: argv.nama,
        //     email: argv.email,
        //     noHP: argv.noHP
        // }
        // console.log(contact)

        contacts.simpanContact(argv.nama, argv.email, argv.noHP)
    }
})
yargs.parse()

// console.log(yargs.argv)

// const contacts = require('./contacts')

// const main = async () => {
//     const nama = await contacts.tulisPertanyaan('Masukan nama: ')
//     const email = await contacts.tulisPertanyaan('Masukan email: ')
//     const noHP = await contacts.tulisPertanyaan('Masukan noHP: ')

//     contacts.simpanContact(nama, email, noHP)
// }

// main()
