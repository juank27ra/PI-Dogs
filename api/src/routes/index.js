const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios')
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getInfoApi = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const info = await apiUrl.data.map(e => {

        return {
            id: e.id,
            name: e.name,
            weight: e.weight.metric + " kg",                //peso
            height: e.height.metric + " cm",            // altura//.split(' - ')[0]
            life_span: e.life_span,
            temperament: e.temperament ? e.temperament : null,              //.map(e => e),
            image: e.image.url
        }
        
    })
    return info
};


const getInfoDb = async () => {
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
                through: {
                    attributes: [],
            },
        }
    })
};
// console.log(getInfoDb())

const getAllDogs = async () => {
    let apiInfo = await getInfoApi();
    let dbInfo = await getInfoDb();
    let todaInfo = apiInfo.concat(dbInfo);
    return todaInfo
};
// console.log(getAllDogs())


router.get('/', async (req, res) => {
    try {
    const name = req.query.name;
         let dogsTotal = await getAllDogs();
    if(name){
        let dogsName = await dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))//
        dogsName.length ?
        res.status(200).send(dogsName) : 
        res.status(404).send({info:'El Perro No Existe'});
    }else{
        // res.status(200).send(dogsTotal);
        res.json(dogsTotal);
        // console.log(dogsTotal)
    }
    } catch (error) {
        console.log(error, "no existe nombre")
      }
});


router.get('/temperaments', async (req, res) => {
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperaments = temperamentsApi.data.map(e => {
        if(!e.temperament) return e.temperament = undefined;
    const aux = e.temperament.split(', ');
    // console.log(aux)
    return aux;
    });
    const ord = temperaments.flat().filter(Boolean).sort();
    const strUnicos = [...new Set(ord)]
    strUnicos.forEach((e) => {
            Temperament.findOrCreate({
                where: { 
                    name: e
                }
            })
        })
        const allTemperaments = await Temperament.findAll();    
        res.send(allTemperaments);
});


router.post('/', async (req, res) => {
    const { 
        name, id, height, weight, life_span, image, createInDb, temperaments} = req.body
        
    const dogsCreate = Dog.create ({                    //await
        name,
        id,
        height,
        weight,
        life_span: life_span + ' years',
        image,
        createInDb,
        temperaments
    });
    // console.log(dogsCreate)

    const temperamentDb = await Temperament.findAll({ 
        where:{ name : temperaments}                                        // or temperament?
    })           
    dogsCreate.addTemperament(temperamentDb)

    res.send('Dog creado con éxito!')

});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    // console.log({id})
    const dogsTotal = await getAllDogs()
    // console.log(dogsTotal)
    if(id){
        let dogId = await dogsTotal.filter(e => e.id == id)
        // console.log(dogId)
        dogId.length ?
        res.status(200).json(dogId) :
        res.status(404).send('Perro no encontrado 😥')
    }
})

module.exports = router;
