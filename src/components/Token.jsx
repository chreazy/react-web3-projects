import React from 'react'

const Token = ({name, symbol, supply, tokenAddress}) => {
  return (
    <>
        <li className="table__value">{name}</li>        
        <li className="table__value">{symbol}</li>        
        <li className="table__value">{supply}</li>        
        <li className="table__value">{tokenAddress}</li> 
    </>
  )
}

export default Token