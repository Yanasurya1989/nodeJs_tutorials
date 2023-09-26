const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
//   res.send('Hello World!')
//   res.send('<h1>Hello World!</h1>')
// res.json({
//         nama: "Yana",
//         email: "yana@yans.com",
//         noHP: "089767764543"
//     })

    res.sendFile('./index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
//   res.send('Hello abot!')
    res.sendFile('./about.html', {root: __dirname})
})

app.get('/contact', (req, res) => {
//   res.send('ini adalah halaman contact')
    res.sendFile('./contact.html', {root: __dirname})
})


app.get('/product/:id/category/:idCat', (req, res) => {// :id dijadikan placeholder untuk ditangkap sebagia id, req(request) yang dikirim res(response) yang dikembalikan oleh express
    // res.send(`Product IDna teh : ${req.params.id} <br> Category IDna : ${req.params.idCat}`)
    res.send(`Product IDna teh : ${req.params.id} <br> Category IDna : ${req.query.idCat}`)
})

app.use('/tes', (req, res) => {
    res.status(404) //untuk menampilkan pesan not found
  res.send('dijalankan pada request apapun, jika ini disimpan paling atas maka request2 lain tidak akan pernah dijalankan, karenanya ditempatkan di baris paling bawah untuk menghandle request yang tidak tersedia')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
































// const http = require('http')
// const fs = require('fs')
// const path = require('path')
// const port = 3000

// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if(err){
//             res.writeHead(404)
//             res.write('Error: file not found')
//         }else{
//             res.write(data)
//         }
//         res.end()
//     })
// }

// http
// .createServer((req, res) => {
    
//     res.writeHead(200, {
//         'Content-Type': 'text/html',
//     })

//     const url = req.url

//     switch (url) {
//         case '/about':
//             renderHTML('./about.html', res)
//             break
//         case '/contact':
//             renderHTML('./contact.html', res)
//             break
//         default:
//             renderHTML('./index.html', res)
//             break
//     }

//     // if(url === '/about'){
//     //     // res.write('<h1>Ini adalah halaman abot</h1>')
//     //     // res.end()
//     //     // fs.readFile('./about.html', (err, data) => {
//     //     //     if(err){
//     //     //         res.writeHead(404)
//     //     //         res.write('Error: file not found')
//     //     //     }else{
//     //     //         res.write(data)
//     //     //     }
//     //     //     res.end()
//     //     // })

//     //     renderHTML('./about.html', res)
//     // }else if(url === '/contact'){
//     //     // res.write('<h1>Ini adalah halaman contact</h1>')
//     //     // res.end()

//     //     renderHTML('./contact.html', res)
//     // }else{
//     //     // res.write('hallo world werod')
//     //     // fs.readFile('./index.html', (err, data) => {
//     //     //     if(err){
//     //     //         res.writeHead(404)
//     //     //         res.write('Error: file not found')
//     //     //     }else{
//     //     //         res.write(data)
//     //     //     }
//     //     //     res.end()
//     //     // })
//     //     renderHTML('./index.html', res)
//     // }

// })
// .listen(port, () => {
//     console.log(`Seerver is listening on port ${port}`)
// })