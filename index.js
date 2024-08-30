const parse = require('csv-parse');
const fs = require('fs');

const results = [];
const habitablePlanets = []

fs.createReadStream('kepler_data.csv')
.pipe(parse.parse({
    comment:'#',
    columns: true
}))
.on('data', (data)=>{
    results.push(data);
    if(isHabitablePlanet(data)){
        habitablePlanets.push(data);
    }
})
.on('error', (err)=>{
    console.log(err);
})
.on('end',()=>{
    console.log('Total number of habitable plannets found so far: '+habitablePlanets.length);
    console.log(habitablePlanets.map((planet)=>{
        return 'Planet Name:'+ planet['kepler_name']
    }));
    console.log('Done.');
})

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}