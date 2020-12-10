const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
} else {
    const password = process.argv[2]

    const url =
    `mongodb+srv://server:${password}@h2c-puhelinluettelo.eon4t.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)


    // Print all numbers
    if (process.argv.length === 3) {
        console.log('phonebook:')
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    } else {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
        })

        person.save().then(response => {

            console.log(`added ${person.name} number ${person.number} to phonebook`, response)
            mongoose.connection.close()
        })
    }


}