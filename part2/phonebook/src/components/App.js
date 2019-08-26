import React, { useState } from 'react'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "123-123123" }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const addName = (event) => {
    setNewName(event.target.value)
  }

  const addPhoneBook = (event) => {
    event.preventDefault()
    if(persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    setNewName('')
    setNewNumber('')
  }

  const addNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filtered =(persons) =>  persons.filter((person) =>
   person.name.toLowerCase().includes(newFilter.toLowerCase()))
  

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
       <Persons persons={(filtered(persons))} />
    </div>
  )
}

export default App