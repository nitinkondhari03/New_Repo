import React from 'react'
import { Link } from 'react-router-dom'

const PagesNotFound = () => {
  return (
    <div><h3>Pages Not Found</h3>
    <Link to={'/'}>Home Page</Link>
    </div>
  )
}

export default PagesNotFound