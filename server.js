const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const db = require('./config/database')
const Sorvete = require('./models/Sorvete.model')
const Acai = require('./models/Acai.model')
const Picole = require('./models/Picole.model')
const Funcionario = require('./models/Funcionario.model')
const Milkshake = require('./models/Milkshake.model')
const Doces = require('./models/Doces.model')
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


// ---------------- PICOLE ---------------------
app.get("/sorvete", async (req,res)=>{
    try{
        let sorvetes = await Sorvete.findAll()

        sorvetes = sorvetes.map(s => s.dataValues)
        
        res.render('Sorvete/listarSorvete',{sorvetes})
    }catch(err){
        console.log(err)
        res.status(500).send('erro ao carregar os dados')
    }
})

// EDITAR
app.get("/sorvete/:id/editar", async (req,res)=>{
    try{
    let sorvete = await Sorvete.findByPk(req.params.id)

    res.render('Sorvete/editarSorvete', {sorvete: sorvete.dataValues})
    }catch(err){
        console.log(err)
        res.status(500).send('erro ao carregar os dados')
    }

})

// EDITAR
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

// FORM CADASTRO
app.get("/sorvete/cadastrar", (req,res) => res.render("Sorvete/cadastrarSorvete"))

// CADASTRAR
app.post("/sorvete/cadastrar", async(req,res) =>{
    try{

        await Sorvete.create({
            sabor : req.body.sabor,
            valor : req.body.valor
        }) 

        const sorvetes = await Sorvete.findAll();
        const sorvetesFormatados = sorvetes.map(s => s.dataValues);
        res.render("Sorvete/listarSorvete", {sorvetes:sorvetesFormatados})
}catch(err){
    console.log(err)
    res.status(500).send('erro ao cadastrar')
}

})

// EXCLUIR
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






// ---------------- AÇAI ---------------------

// LISTAR
app.get("/acai", async (req, res) => {
    const acais = (await Acai.findAll()).map(a => a.dataValues)
    res.render("Acai/listarAcai", { acais })
})

// FORM CADASTRO
app.get("/acai/cadastrar", (req,res)=>{
    res.render("Acai/cadastrarAcai")
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
    res.render("Acai/editarAcai", { acai: acai.dataValues })
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





// ---------------- PICOLE ---------------------

// LISTAR
app.get("/picole", async (req,res)=>{
    const picoles = (await Picole.findAll()).map(p => p.dataValues)
    res.render("Picole/listarPicole", { picoles })
})

// FORM CADASTRO
app.get("/picole/cadastrar", (req,res)=>{
    res.render("Picole/cadastrarPicole")
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
    res.render("Picole/editarPicole", { picole: picole.dataValues })
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




// ---------------- Milkshake ---------------------
// LISTAR
app.get("/milkshake", async (req,res)=>{
    const milkshakes = (await Milkshake.findAll()).map(m => m.dataValues)
    res.render("Milkshake/listarMilkshake", { milkshakes })
})

// FORM CADASTRO
app.get("/milkshake/cadastrar", (req,res)=>{
    res.render("Milkshake/cadastrarMilkshake")
})

// CADASTRAR
app.post("/Milkshake/cadastrar", async (req,res)=>{
    await Milkshake.create({
        sabor: req.body.sabor,
        tamanho: req.body.tamanho,
        valor: req.body.valor
    })
    res.redirect("/milkshake")
})

// FORM EDITAR
app.get("/milkshake/:id/editar", async (req,res)=>{
    const milkshake = await Milkshake.findByPk(req.params.id)
    res.render("Milkshake/editarMilkshake", { milkshake: milkshake.dataValues })
})

// EDITAR
app.post("/milkshake/:id/editar", async (req,res)=>{
    const milkshake = await Milkshake.findByPk(req.params.id)
    milkshake.sabor = req.body.sabor
    milkshake.tamanho = req.body.tamanho
    milkshake.valor = req.body.valor
    await milkshake.save()
    res.redirect("/milkshake")
})

// EXCLUIR
app.post("/milkshake/excluir/:id", async (req,res)=>{
    const milkshake = await Milkshake.findByPk(req.params.id)
    await milkshake.destroy()
    res.redirect("/milkshake")
})


// ---------------- Funcionario ---------------------
// LISTAR
app.get("/funcionario", async (req,res)=>{
    const funcionarios = (await Funcionario.findAll()).map(m => m.dataValues)
    res.render("Funcionario/listarFuncionario", { funcionarios })
})

// FORM CADASTRO
app.get("/funcionario/cadastrar", (req,res)=>{
    res.render("Funcionario/cadastrarFuncionario")
})

// CADASTRAR
app.post("/funcionario/cadastrar", async (req,res)=>{
    await Funcionario.create({
        nome: req.body.nome,
        cpf: req.body.cpf,
        cargo: req.body.cargo,
        salario: req.body.salario
    })
    res.redirect("/funcionario")
})

// FORM EDITAR
app.get("/funcionario/:id/editar", async (req,res)=>{
    const funcionario = await Funcionario.findByPk(req.params.id)
    res.render("Funcionario/editarFuncionario", { funcionario: funcionario.dataValues })
})

// EDITAR
app.post("/funcionario/:id/editar", async (req,res)=>{
    const funcionario = await Funcionario.findByPk(req.params.id)
    funcionario.nome = req.body.nome
    funcionario.cpf = req.body.cpf
    funcionario.cargo = req.body.cargo
    funcionario.salario = req.body.salario
    await funcionario.save()
    res.redirect("/funcionario")
})

// EXCLUIR
app.post("/funcionario/excluir/:id", async (req,res)=>{
    const funcionario = await Funcionario.findByPk(req.params.id)
    await funcionario.destroy()
    res.redirect("/funcionario")
})



// ---------------- Doces ---------------------
// LISTAR
app.get("/doce", async (req,res)=>{
    const doces = (await Doces.findAll()).map(m => m.dataValues)
    res.render("Doce/listarDoce", { doces })
})

// FORM CADASTRO
app.get("/doce/cadastrar", (req,res)=>{
    res.render("Doce/cadastrarDoce")
})

// CADASTRAR
app.post("/doce/cadastrar", async (req,res)=>{
    await Doces.create({
        nome: req.body.nome,
        tamanho: req.body.tamanho,
        valor: req.body.valor
        
    })
    res.redirect("/doce")
})

// FORM EDITAR
app.get("/doce/:id/editar", async (req,res)=>{
    const doce = await Doces.findByPk(req.params.id)
    res.render("Doce/editarDoce", { doce: doce.dataValues })
})

// EDITAR
app.post("/doce/:id/editar", async (req,res)=>{
    const doce = await Doces.findByPk(req.params.id)
    doce.nome = req.body.nome
    doce.tamanho = req.body.tamanho
    doce.valor = req.body.valor
    await doce.save()
    res.redirect("/doce")
})

// EXCLUIR
app.post("/doce/excluir/:id", async (req,res)=>{
    const doce = await Doces.findByPk(req.params.id)
    await doce.destroy()
    res.redirect("/doce")
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: http://localhost:${port}`)
})