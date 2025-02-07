import React from 'react'
import BudgetList from './_components/BudgetList'

function Budget() {
  return (
    <div className='p-7'>
      <h2 className='font-bold text-2xl'>My Budgets</h2>
      <BudgetList/>
    </div>
  )
}

export default Budget