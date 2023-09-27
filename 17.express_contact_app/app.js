const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact, findContact} = require('./utils/contacts')

const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')

// Third-party Middleware
app.use(expressLayouts)

// Build-in middleware
app.use(express.static('public'))

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
    })
})

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