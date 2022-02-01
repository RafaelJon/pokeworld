const initialState = []

export const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'init':
      let data = JSON.parse(window.localStorage.getItem('collection'))
      if (data != null) return data
      return []

    case 'catch':
      let collection = JSON.parse(window.localStorage.getItem('collection')) !== null ? JSON.parse(window.localStorage.getItem('collection')) : []
      let newCollection = [...collection, { ...action.pokemon }]
      try {
        window.localStorage.setItem('collection', JSON.stringify(newCollection))
      } catch (error) {
        alert('collection is full')
        return collection
      }
      return newCollection
    case 'release':
      let releasedCollection = [...state]
      releasedCollection.splice(action.idx, 1)
      window.localStorage.setItem('collection', JSON.stringify(releasedCollection))
      return releasedCollection

    default:
      return state
  }
}