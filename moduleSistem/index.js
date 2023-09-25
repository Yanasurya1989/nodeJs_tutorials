// cara memanggil module lain :
// const cetakNama = require('./coba') //local module ditandai dengan (./) yang merupakan relatif url
// const fs = require('fs') //core module
// const moment = require('moment')//third party module/tersedia ketika instal npm module/ tersimpan di node_modules

// const cetakNama = require('./coba')
// const PI = require('./coba')
const coba = require('./coba')

// console.log(cetakNama('Yana'))
// console.log(coba)
// console.log(
//     coba.bikinSendiri('Yana'), 
//     coba.bikinSendiriPI, 
//     coba.mahasiswa.cetakMhs(),
//     new coba.Orang
// )


// console.log(
//     coba.cetakNama('Yana'), 
//     coba.apa, 
//     coba.mahasiswa.cetakMhs(),
//     new coba.Orang
// )

console.log(
    coba.cetakNama('Yana'), 
    coba.PI, 
    coba.mahasiswa.cetakMhs(),
    new coba.Orang
)