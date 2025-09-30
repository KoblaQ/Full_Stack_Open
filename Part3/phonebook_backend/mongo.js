const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://KoblaQ:${password}@cluster0.m8d64pf.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length > 3) {
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
