import React, { ReactNode } from 'react'
import NavBar from '../components/NavBar'

const layout = ({children} : {children: ReactNode}) => {
  return (
    <div>
        <NavBar />
        {children}
    </div>
  )
}

export default layout