import { useState } from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';

function App() {
  const [items, setItems] = useState(JSON.parse(
    localStorage.getItem('shoppingList')
  ))

  const [newItem, setNewItem] = useState('')

  const setAndSaveItems = (newItems) => {
    setItems(newItems)
    localStorage.setItem('shoppingList', JSON.stringify(newItems))
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const addingNewItem = { id, checked: false, item }
    const listItems = [...items, addingNewItem]
    setAndSaveItems(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return
    addItem(newItem)
    setNewItem('')
  }


  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {
      ...item, checked: !item.checked
    } : item)
    setAndSaveItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setAndSaveItems(listItems)
  }

  return (
    <div className="App">
      <Header title="Groceries" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
