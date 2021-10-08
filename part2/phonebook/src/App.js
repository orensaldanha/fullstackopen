import React, { useState } from 'react'

const Filter = ({ handleFilterText }) => {
  return (
    <div>
      filter show with <input onChange={handleFilterText}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNewName}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNewNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.findIndex(person => person.name === newName) === -1) {
      const personObject = { 
        name: newName,  
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleFilterText = (event) => setFilterText(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterText={handleFilterText}/>
      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().startsWith(filterText.toLowerCase()))
              .map(person => <Person key={person.id} name={person.name} number={person.number}/>)
      }
    </div>
  )
}

export default App