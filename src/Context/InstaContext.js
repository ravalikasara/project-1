import React from 'react'

const InstaContext = React.createContext({
  SearchStatus: false,
  searchInput: '',
  onSearchClick: () => {},
})

export default InstaContext
