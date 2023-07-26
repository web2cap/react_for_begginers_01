import { useState, useEffect } from 'react';

import Header from './Header';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('shoppingList')) || []
  )

  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items))
  }, [items])

  const addItem = (item) => {
    const id = (items && items.length) ? items[items.length - 1].id + 1 : 1
    const addingNewItem = { id, checked: false, item }
    const listItems = items ? ([...items, addingNewItem]) : [addingNewItem]
    setItems(listItems)
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
    setItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
  }

  return (
    <div className="App">
      <Header title="Groceries" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={
          items ? (items.filter(item =>
            ((item.item).toLowerCase()).includes(search.toLowerCase()))) : []
        }
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items ? items.length : 0} />
    </div>
  );
}

export default App;
