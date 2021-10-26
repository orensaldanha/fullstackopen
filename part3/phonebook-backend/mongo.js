const mongoose = require('mongoose')

const password = process.argv[2]

const url =
    `mongodb+srv://phonebook:${password}@cluster0.r5oap.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    
    const person = new Person({
        name: name,
        number: number
    })
    
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv.length == 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
