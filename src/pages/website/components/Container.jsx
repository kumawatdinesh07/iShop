import React from 'react'

function Container(props) {
  return (                                                                              //null safe operator for remove unDefined                                 
    <div className={`${props.fluid === true ? 'w-full' : 'max-w-[1251px] '} mx-auto ${props.extraclass ?? ''}`}>
        {props.children}
    </div>
  )
}

export default Container;
