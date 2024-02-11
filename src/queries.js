import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2
export const query1 = await Human.findByPk(2)

// console.log(query1)
// Get the first animal whose species is "fish"
export const query2 = await Animal.findOne({
    where: {
        species: "fish"
    }
});

// console.log(query2)

// Get all animals belonging to the human with primary key 5
export const query3 =  await Animal.findAll({
    where: { humanId: 5 } 
});

// console.log(query3)

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = await Animal.findAll({
    where: {
        birthYear: { [Op.gt]: 2015 }
    }
});
    // console.log(query4)
// Get all the humans with first names that start with "J"
export const query5 = await Human.findAll({
    where: {
        fname: { [Op.like]: 'J%' }
    }
});
    // console.log(query5)
// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({
    where: {
        birthYear: null
    }
});
    // console.log(query6)

// Get all the animals with species "fish" OR "rabbit"
export const query7 = await Animal.findAll({
    where: {
        species: {
            [Op.or]: ['fish', 'rabbit']
        }
    }
});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = await Human.findAll({
    where: {
        email: {
            [Op.notLike]: '%gmail%'
        }
    }
});

// Continue reading the instructions before you move on!
export async function printHumansAndAnimals() {
    const humansWithAnimals = await Human.findAll({ include: Animal });
    
    humansWithAnimals.forEach(human => {
        console.log(human.getFullName());

        human.animals.forEach(animal => {
            console.log(`${animal.name} (${animal.species})`);
        });
    });
}

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
    const humans = new Set();

    const animals = await Animal.findAll({
        where: { species: species },
        include: Human 
    });

    animals.forEach(animal => {
        if (animal.human) { 
            humans.add(animal.human.getFullName()); 
        }
    });

    return humans;
}




