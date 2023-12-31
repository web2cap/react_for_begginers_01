import { useState, useEffect } from 'react';

import Header from './Header';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import apiRequest from './ApiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items'

  const [items, setItems] = useState(
    //JSON.parse(localStorage.getItem('shoppingList')) || []
    []
  )

  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error("Did not receive expected data")
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    // setTimeout(() => {
    (async () => await fetchItems())()
    //}, 2000)
  }, [])

  const addItem = async (item) => {
    const id = (items && items.length) ? items[items.length - 1].id + 1 : 1
    const addingNewItem = { id, checked: false, item }
    const listItems = items ? ([...items, addingNewItem]) : [addingNewItem]
    setItems(listItems)

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addingNewItem)
    }
    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchError(result)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return
    addItem(newItem)
    setNewItem('')
  }


  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? {
      ...item, checked: !item.checked
    } : item)
    setItems(listItems)

    const myItem = listItems.filter((item) => item.id === id)
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    }
    const itemURL = `${API_URL}/${id}`
    const result = await apiRequest(itemURL, updateOptions)
    if (result) setFetchError(result)

  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)

    const deleteOptions = {
      method: 'DELETE',
    }

    const itemURL = `${API_URL}/${id}`
    const result = await apiRequest(itemURL, deleteOptions)
    if (result) setFetchError(result)

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
      <main>
        {isLoading && <p>Loading Items ...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items={
            items ? (items.filter(item =>
              ((item.item).toLowerCase()).includes(search.toLowerCase()))) : []
          }
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items ? items.length : 0} />
    </div>
  );
}

export default App;
