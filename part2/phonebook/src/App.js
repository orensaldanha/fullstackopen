import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({ name, number, handleDelete }) => {
  return (
    <div>
      {name} {number} <button onClick={handleDelete}>delete</button>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const index = persons.findIndex(person => person.name === newName)

    if (index === -1) {
      const personObject = { 
        name: newName,  
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

    } else {
      const personObject = persons[index]

      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPersonObject = {
          ...personObject,
          number: newNumber
        }
        const personId = changedPersonObject.id
  
        personService
          .update(personId, changedPersonObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personId ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleFilterText = (event) => setFilterText(event.target.value)
  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(() => setPersons(persons.filter(p => p.id !== person.id)))
    }
  }

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
              .map(person => 
                <Person 
                  key={person.id} 
                  name={person.name} 
                  number={person.number} 
                  handleDelete={() => handleDelete(person)}/>
              )
      }
    </div>
  )
}

export default App