import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }

  useEffect(hook, [])

  const addName = (event) => {
    setNewName(event.target.value)
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
            })
        }
    } else {
      personService
        .create({name: newName, number: newNumber})
        .then(person => setPersons(persons.concat(person)))
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
   if( window.confirm(`Delete ${(persons.find(person => id === person.id)).name}?`) ) {
    personService
    .destroy(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
   }
  }

  const addFilter = (event) => {
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
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