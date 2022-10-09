import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {

  if (message !== null) {
    const messageColor = message.type === 'error' ? 'red' : 'green'

    const notificationStyle = {
      color: messageColor,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    return (
      <div style={notificationStyle}>
        {message.text}
      </div>
    )
  }

  return null
}

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
  const [notificationMessage, setNotificationMessage] = useState(null)

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
          
          setNotificationMessage({
            text: `Added ${returnedPerson.name}`,
            type: 'success'
          })
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
        .catch(error => {
          setNotificationMessage({
            text: error.response.data.error,
            type: 'error'
          })

          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
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

            setNotificationMessage({
              text: `Changed ${returnedPerson.name}'s number`,
              type: 'success'
            })
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
          })
          .catch(error => {
            setNotificationMessage({
              text: error.response.data.error,
              type: 'error'
            })
  
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
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
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))

          setNotificationMessage({
            text: `Deleted ${person.name}`,
            type: 'success'
          })
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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