function cetakNama(nama){
    return `halo nama saya ${nama}`
}

const PI = 3.14

const mahasiswa = {
    nama: 'Yana Surya',
    umur: 34,
    cetakMhs(){
        return `halo nama saya ${this.nama} berusia ${this.umur} tahun.`
    }
}

class Orang{
    constructor(){
        console.log('Objk orang telah dibuat!!')
    }
}

// module.exports.bikinSendiri = cetakNama
// module.exports.bikinSendiriPI = PI
// module.exports.mahasiswa = mahasiswa
// module.exports.Orang = Orang

// cara lain untuk export
// module.exports = {
//     cetakNama: cetakNama,
//     apa: PI,
//     mahasiswa:mahasiswa,
//     Orang: Orang
// }

// jika property dan value bernilai sama 
module.exports = {cetakNama, PI, mahasiswa, Orang}