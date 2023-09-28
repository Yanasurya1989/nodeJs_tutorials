const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts} = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')

// Third-party Middleware
app.use(expressLayouts)

// Build-in middleware
app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
)

app.use(flash())

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Yana Surya',
            emial: 'yanasurya1989@gmail.com'
        },
        {
            nama: 'Laya Surya',
            emial: 'jhg@gmail.com'
        },
        {
            nama: 'Srma Surya',
            emial: 'hhjg@gmail.com'
        },
    ]
    res.render('index',{
        nama: 'Yana Surya', 
        titile: 'Halaman Home Yeuh',
        // mahasiswa: mahasiswa, //yang pertama sebagai key, mahasiswa yang kedua sebagai value yang merupakan variable untuk array yang telah dibuat diatas dan penulisannya bisa disingkat menjadi : 
        mahasiswa,
        layout: 'layouts/main-layout'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        titile: 'about'
    })
})

app.get('/contact', (req, res) => {
    const contacts = loadContact()

    // console.log(contacts)
    res.render('contact', {
        titile: 'contact nya',
        layout: 'layouts/main-layout',
        // contacts: contacts, //sinfkat code ini dengan code dibawah
        contacts,
        msg: req.flash('msg'), //emesge adalah variable dari bawah yang ditangkap disini
    })
})

// halaman form tambah data contact
app.get('/contact/add', (req, res)=>{
    res.render('add-contact', {
        titile: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout'
    })
})

// proses data contact
app.post('/contact', [
        body('nama').custom((value) => {
            const duplikat = cekDuplikat(value)
            if(duplikat){
                throw new Error('Nama contact sudah ada')
            }
            return true
        }),
        check('email', 'email tidak palid di walungan').isEmail(),
        check('nohp', 'No HP oge teu palid').isMobilePhone('id-ID')
    ], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(400).json({errors: errors.array()})
        res.render('add-contact', {
            titile: 'Form Tambah Data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
        })
    } else {
        addContact(req.body)
        // kirimkan flash massage
        req.flash('msg', 'Data contact berhasil ditambahkan')
        res.redirect('/contact')
    }
    // console.log(req.body)
    // res.send(req.body)
    // addContact(req.body) 
    // res.redirect('/contact')
})

// proses delete contact
app.get('/contact/delete/:nama', (req, res)=> { //susunan penulisan req dengan res berpengaruh pada re.param.nama pada code dibawah jadi susunannya harus begini
    const contact = findContact(req.params.nama) //mencari kontak berdasar nama krn nama dengan get(yang diinputkan di browser) agar tidak memproses nama yang diinputkan di browser

    // jika nama tidak ditemukan
    if(!contact){
        res.status(404)
        res.send('<h1>404 ceunah</h1>')
    }else{
        // res.send('ok') //hanya menampilkan pesan ok dilayar

        deleteContact(req.params.nama) //menjalankan fungsi delete
        req.flash('msg', 'Data contact berhasil dihapus')   
            res.redirect('/contact') 
    }


})

// halaman form edit data contact
app.get('/contact/edit/:nama', (req, res)=>{ //titikdua nama merupakan id yang akan diberi aksi edit
    const contact = findContact(req.params.nama) //untuk mengirim data pada colom edit agar bisa tampil, diambil dulu dengan find kemudian kirimkan ke variable dibawah dengan nama contact
    
    res.render('edit-contact', {
        titile: 'Form Ubah Data Contact',
        layout: 'layouts/main-layout',
        // contact: contact //variable contact berisi data yang diambil dari json yang disimpan kedalam variable contact diatas dan karena yang dikirim dengan variable yang menampungnya memiliki nama yang sama jadi penulisan bisa shortland seperti dibawah
        contact,

    })
})

// proses ubah data
// app.post('/contact/update', (req, res) => { //routenya(contact/update) samakan dengan action pada form editnya
    // res.send(req.body)//oledName untuk menyimpan data sebelum diedit karena nama sebelumnya masih harus tetap ada krn nama lama marupakan hasil proses data add, sehingga ketika hanya mengganti yang lain tanpa mengganti nama akan eror krn nama dianggap sudah ada

app.post(
    '/contact/update', 
    [
        body('nama').custom((value, {req}) => {
            const duplikat = cekDuplikat(value)
            if(value !== req.body.oledName && duplikat){ //jika value form edit tidak sama dengan nama sebelumnya dan terjadi duplikat tetap tidak eror krn bisa jadi yang diganti item lain tanpa mengganti nama
                throw new Error('Nama contact sudah ada')
            }
            return true
        }),
        check('email', 'email tidak palid di walungan').isEmail(),
        check('nohp', 'No HP oge teu palid').isMobilePhone('id-ID')
    ], 
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(400).json({errors: errors.array()})
            res.render('edit-contact', {
                titile: 'Form Ubah Data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                contact: req.body, //agar meskipun terjadi eror tetap menampilkan data dari formnya
            })
        } else {
            // res.send(req.body) //hanya untuk debuging(menampilkan hasil sementara)
            updateContacts(req.body)
            // kirimkan flash massage
            req.flash('msg', 'Data contact berhasil diubah')
            res.redirect('/contact')
        }
        // console.log(req.body)
        // res.send(req.body)
        // addContact(req.body) 
        // res.redirect('/contact')
})

// halaman detil contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)

    res.render('detil', {
        titile: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        // contacts: contacts, //sinfkat code ini dengan code dibawah
        contact,
    })
})

app.use('/tes', (req, res) => {
    res.status(404) 
  res.send('dijalankan pada request apapun, jika ini disimpan paling atas maka request2 lain tidak akan pernah dijalankan, karenanya ditempatkan di baris paling bawah untuk menghandle request yang tidak tersedia')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})