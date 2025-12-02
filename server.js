const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const db = require('./config/database')
const Sorvete = require('./models/Sorvete.model')
const Acai = require('./models/Acai.model')
const Picole = require('./models/Picole.model')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.engine('handlebars', exphbs.engine({defaultLayout : false}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended : true}))
db.sync({force:false}).then(()=>{
    console.log('Servidor sincronizado')
})




app.get("/", (req,res)=>{
    res.render("home")
})

app.get("/sorvete", async (req,res)=>{
    try{
        let sorvetes = await Sorvete.findAll()

        sorvetes = sorvetes.map(s => s.dataValues)

        res.render('listarSorvete',{sorvetes})
    }catch(err){
        console.log(err)
        res.status(500).send('erro ao carregar os dados')
    }
})

app.get("/sorvete/:id/editar", async (req,res)=>{
    try{
    let sorvete = await Sorvete.findByPk(req.params.id)

    res.render('editarSorvete', {sorvete: sorvete.dataValues})
    }catch(err){
        console.log(err)
        res.status(500).send('erro ao carregar os dados')
    }

})

app.post("/sorvete/:id/update", async(req,res)=>{
    try{
    let sorvete = await Sorvete.findByPk(req.params.id)
   
    sorvete.sabor = req.body.sabor
    sorvete.valor = req.body.valor

    await sorvete.save()
    res.redirect("/sorvete")
    }catch(err){
        console.log(err)
        res.status(500).send('erro ao carregar os dados')
    }
})

app.get("/sorvete/cadastrar", (req,res) => res.render("cadastrarSorvete"))

app.post("/cadastrar", async(req,res) =>{
    try{

        await Sorvete.create({
            sabor : req.body.sabor,
            valor : req.body.valor
        }) 

        const sorvetes = await Sorvete.findAll();
        const sorvetesFormatados = sorvetes.map(s => s.dataValues);
        res.render("listarSorvete", {sorvetes:sorvetesFormatados})
}catch(err){
    console.log(err)
    res.status(500).send('erro ao cadastrar')
}

})

app.post("/sorvete/excluir/:id", async (req,res)=>{
   try{
        let sorvete = await Sorvete.findByPk(req.params.id)
        await sorvete.destroy();
        res.redirect("/sorvete")
   }catch(err){
        console.log(err)  
        res.status(500).send("Erro ao excluir")
   }

})






// ---------------- AÇAI (SEQUELIZE) ---------------------

// LISTAR
app.get("/acai", async (req, res) => {
    const acais = (await Acai.findAll()).map(a => a.dataValues)
    res.render("listarAcai", { acais })
})

// FORM CADASTRO
app.get("/acai/cadastrar", (req,res)=>{
    res.render("cadastrarAcai")
})

// CADASTRAR
app.post("/acai/cadastrar", async (req,res)=>{
    await Acai.create({
        tamanho: req.body.tamanho,
        valor: req.body.valor
    })
    res.redirect("/acai")
})

// FORM EDITAR
app.get("/acai/:id/editar", async (req,res)=>{
    const acai = await Acai.findByPk(req.params.id)
    res.render("editarAcai", { acai: acai.dataValues })
})

// EDITAR
app.post("/acai/:id/editar", async (req,res)=>{
    const acai = await Acai.findByPk(req.params.id)
    acai.tamanho = req.body.tamanho
    acai.valor = req.body.valor
    await acai.save()
    res.redirect("/acai")
})

// EXCLUIR
app.post("/acai/excluir/:id", async (req,res)=>{
    const acai = await Acai.findByPk(req.params.id)
    await acai.destroy()
    res.redirect("/acai")
})





// ---------------- PICOLE (SEQUELIZE) ---------------------

// LISTAR
app.get("/picole", async (req,res)=>{
    const picoles = (await Picole.findAll()).map(p => p.dataValues)
    res.render("listarPicole", { picoles })
})

// FORM CADASTRO
app.get("/picole/cadastrar", (req,res)=>{
    res.render("cadastrarPicole")
})

// CADASTRAR
app.post("/picole/cadastrar", async (req,res)=>{
    await Picole.create({
        sabor: req.body.sabor,
        valor: req.body.valor
    })
    res.redirect("/picole")
})

// FORM EDITAR
app.get("/picole/:id/editar", async (req,res)=>{
    const picole = await Picole.findByPk(req.params.id)
    res.render("editarPicole", { picole: picole.dataValues })
})

// EDITAR
app.post("/picole/:id/editar", async (req,res)=>{
    const picole = await Picole.findByPk(req.params.id)
    picole.sabor = req.body.sabor
    picole.valor = req.body.valor
    await picole.save()
    res.redirect("/picole")
})

// EXCLUIR
app.post("/picole/excluir/:id", async (req,res)=>{
    const picole = await Picole.findByPk(req.params.id)
    await picole.destroy()
    res.redirect("/picole")
})


app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: http://localhost:${port}`)
})