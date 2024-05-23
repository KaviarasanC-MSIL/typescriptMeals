import React from 'react'
import './SearchHeader.css'
import {SearchProps} from '../type'

export const SearchHeader:React.FC<SearchProps> = ({handleSearch}) => {
  return (
    <>
    <div className='container'>
    <div className='search'>
        <input type='text' placeholder='Search the name' onChange={handleSearch} />
        <hr></hr>
    </div>
    
    </div>
    </>
  )
}
