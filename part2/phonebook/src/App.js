import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [newMessageClass, setNewMessageClass] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }

  useEffect(hook, [])

  const addName = (event) => {
    setNewName(event.target.value)
  }
  const showMessage = (message, messageClass, mSec=2500) => {
    setNewMessage(message)
    setNewMessageClass(messageClass)
    setTimeout(() => {
      setNewMessage(null)
      setNewMessageClass("")
    }, mSec)
  }
  const addPhoneBook = (event) => {
    event.preventDefault()
    const thePerson = persons.find((person) => person.name === newName)
    if(thePerson) {
      const approved = window.confirm(
        `${newName} is already added to phonebook would you like to update number?`
      );
      if(approved) {
          const newObject = {
            ...thePerson, number: newNumber
          }
          personService
            .update(thePerson.id, newObject)
            .then(updatedObject => {
              setPersons(persons.map(person => 
                updatedObject.id !== person.id ? person : updatedObject ))
              showMessage(
                `Updated ${thePerson.name}'s phone number`, 
                'message notification')
            })
        }
    } else {
      personService
        .create({name: newName, number: newNumber})
        .then(person => {
          setPersons(persons.concat(person))
          showMessage(`Added ${person.name}`, 'message notification')
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const addNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filtered = (persons) =>  persons.filter((person) =>
   person.name.toLowerCase().includes(newFilter.toLowerCase()))
  

  const personRow = (people) => {
    return people.map(person =>
      <Person key={person.id} person={person} handleDelete={() => {deletePerson(person.id)}}/>  
    )
  }
  const deletePerson = (id) => {
    const deletePerson = persons.find(person => id === person.id)
   if( window.confirm(`Delete ${deletePerson.name}?`) ) {
    personService
    .destroy(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      showMessage(
        `Information of ${deletePerson.name} has already been removed from server`, 
        "message error"
      )
      setPersons(persons.filter(p => p.id !== id ))
    })
   }
  }

  const addFilter = (event) => {
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification  message={newMessage} messageClass={newMessageClass}/>
      <Filter onChange={addFilter} value={newFilter}/>
      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addPhoneBook}
        onNumberChange={addNumber}
        numberValue={newNumber}
        onNameChange={addName}
        nameValue={newName}
      />
      <h2>Numbers</h2>
      {personRow(filtered(persons))}
    </div>
  )
}

export default App