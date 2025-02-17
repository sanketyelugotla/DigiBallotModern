import React from 'react'

export default function HoverMainDiv({ children, open }) {
  return (
    <div className={open ? "dim-background" : ""}>
      {children}
    </div>
  )
}
