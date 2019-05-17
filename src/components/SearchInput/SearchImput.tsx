import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

const SearchInput: React.FC = () => {
  return (
    <div className="search-input">
      <input type="text" name="search" className="search-input__inp" />
    </div>
  )
}

export default SearchInput