import React from 'react'

const InstaContext = React.createContext({
  SearchStatus: false,
  onChangeSearchInput: () => {},
})

export default InstaContext
