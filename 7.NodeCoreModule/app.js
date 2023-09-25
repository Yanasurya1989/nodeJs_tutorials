const fs = require('fs')

// console.log(fs)
// menuliskan string ke file (synchronous)

// try{
//     fs.writeFileSync('data/tes.txt', 'Halo word secara asynchronous')

// }catch(err){
//      console.log(err)
// }

// fs.writeFileSync('data/tes.txt', 'Halo word secara asynchronous')

// fs.writeFileSync('data/tes.txt', 'hallo word secara Asynchronouse', (errorMun) =>{
//     console.log(errorMun)
// })

// mmbaca isi file (synchronous)
// const data = fs.readFileSync('data/tes.txt')
// console.log(data.toString())
// const data = fs.readFileSync('data/tes.txt', 'utf-8')
// console.log(data)

// membaca isi file asynchronous
// fs.readFile('data/tes.txt', 'utf-8', (munError, data) => {
//     if(munError) throw munError;
//     console.log(data)
// })

// Readline
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question('Masukan ngaran: ', (nama) => {
    rl.question('Gaji baraha: ', (gaji) => {
        // console.log(`hatur nuhun mang ${nama}, jadi gajina teh ${gaji}`)

        const contact = {
            // nama: nama,
            // gaji: gaji

            // menyingkat code diatas krn sama
            nama, gaji}
            const file = fs.readFileSync('data/contacts.json', 'utf-8')
            // console.log(fileBuffer)
            const contacts = JSON.parse(file)

            contacts.push(contact)

            fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

            console.log('data sudah tersimpan')
        rl.close()
    })
})