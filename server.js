const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.engine('handlebars', exphbs.engine({defaultLayout : false}))
app.set('view engine', 'handlebars')

let sorvetes = [
    {id:1, sabor: 'Morango', valor : 15}
]

app.get("/", (req,res)=>{
    res.render("home")
})

app.get("/sorvete", (req,res)=>{
    res.render("listarSorvete",{sorvetes})
})

app.get("/sorvete/:id/editar", (req,res)=>{
    const id = parseInt(req.params.id)
    const sorvete = sorvetes.find(s => s.id === id)

    if(!sorvete) return res.status(404).send("Sorvete não encontrado")

    res.render("editarSorvete",{sorvete})

})

app.post("/sorvete/:id/editar/", (req,res)=>{
    const id = parseInt(req.params.id)
    const sorvete = sorvetes.find(s => s.id === id)

    if(!sorvete) return res.status(404).send("Sorvete não encontrado")
    
    sorvete.sabor = req.body.sabor
    sorvete.valor = req.body.valor
    res.redirect("/sorvete")

})

app.get("/sorvete/cadastrar", (req,res) => res.render("cadastrarSorvete"))

app.post("/cadastrar",(req,res) =>{
    const {sabor,valor} = req.body
    const novoSorvete = {id : sorvetes.length + 1, sabor, valor}

    sorvetes.push(novoSorvete)

    res.render("listarSorvete", {sorvetes})
})

app.post("/sorvete/excluir/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const index = sorvetes.findIndex(s => s.id === id)

    if(!index) return res.status(404).send("Sorvete não encontrado")
    
    sorvetes.splice(index, 1)
    res.redirect("/sorvete")

})






// ---------------- AÇAI ---------------------

let acais = [
    { id: 1, tamanho: "300ml", valor: 12 }
]

// LISTAR
app.get("/acai", (req,res)=>{
    res.render("listarAcai", { acais })
})

// FORM CADASTRO
app.get("/acai/cadastrar", (req,res)=>{
    res.render("cadastrarAcai")
})

// CADASTRAR
app.post("/acai/cadastrar", (req,res)=>{
    const { tamanho, valor } = req.body
    const novo = { id: acais.length + 1, tamanho, valor }
    acais.push(novo)
    res.redirect("/acai")
})

// FORM EDITAR
app.get("/acai/:id/editar", (req,res)=>{
    const id = parseInt(req.params.id)
    const acai = acais.find(a => a.id === id)
    if(!acai) return res.status(404).send("Açaí não encontrado")
    res.render("editarAcai", { acai })
})

// EDITAR
app.post("/acai/:id/editar", (req,res)=>{
    const id = parseInt(req.params.id)
    const acai = acais.find(a => a.id === id)
    if(!acai) return res.status(404).send("Açaí não encontrado")

    acai.tamanho = req.body.tamanho
    acai.valor = req.body.valor

    res.redirect("/acai")
})

// EXCLUIR
app.post("/acai/excluir/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const index = acais.findIndex(a => a.id === id)

    if(index === -1) return res.status(404).send("Açaí não encontrado")

    acais.splice(index, 1)
    res.redirect("/acai")
})




// ---------------- PICOLE ---------------------

let picoles = [
    { id: 1, sabor: "Uva", valor: 5 }
]

// LISTAR
app.get("/picole", (req,res)=>{
    res.render("listarPicole", { picoles })
})

// FORM CADASTRO
app.get("/picole/cadastrar", (req,res)=>{
    res.render("cadastrarPicole")
})

// CADASTRAR
app.post("/picole/cadastrar", (req,res)=>{
    const { sabor, valor } = req.body
    const novo = { id: picoles.length + 1, sabor, valor }
    picoles.push(novo)
    res.redirect("/picole")
})

// FORM EDITAR
app.get("/picole/:id/editar", (req,res)=>{
    const id = parseInt(req.params.id)
    const picole = picoles.find(p => p.id === id)
    if(!picole) return res.status(404).send("Picolé não encontrado")
    res.render("editarPicole", { picole })
})

// EDITAR
app.post("/picole/:id/editar", (req,res)=>{
    const id = parseInt(req.params.id)
    const picole = picoles.find(p => p.id === id)
    if(!picole) return res.status(404).send("Picolé não encontrado")

    picole.sabor = req.body.sabor
    picole.valor = req.body.valor

    res.redirect("/picole")
})

// EXCLUIR
app.post("/picole/excluir/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const index = picoles.findIndex(p => p.id === id)

    if(index === -1) return res.status(404).send("Picolé não encontrado")

    picoles.splice(index, 1)
    res.redirect("/picole")
})


app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: http://localhost:${port}`)
})