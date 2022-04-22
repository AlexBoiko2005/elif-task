import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import AddForm from './AddForm'
import Nav from './components/nav/Nav'
import CalcForm from './CalcForm'

const App = () => {
  const [banks, setBanks] = useState(JSON.parse(localStorage.getItem('banks')))
  const [bank, setBank] = useState({id: '', name: '', rate: '', maxLoan: '', upPay: '', term: ''})
  const [page, setPage] = useState('addBank')
  const [mortgage, setMortgage] = useState({loan: '', upPay: '', bank: ''})
  const [selectedBank, setSelectedBank] = useState('')
  const [calcSettings, setCalcSettings] = useState({id: '', name: '', rate: '', maxLoan: '', upPay: '', term: ''})
  const modalRef = useRef();
  
  const localStore = (event, bank) => {
    if (bank.name && !!bank.rate && !!bank.maxLoan && !!bank.upPay && !!bank.term) {
      event.target.className = 'myBtn' + ' myBtnAdded'
      if (!localStorage.banks) {
        localStorage.banks = '[' + JSON.stringify(bank) + ']'
      } else {
        let arr = JSON.parse(localStorage.banks);
        arr.push(bank)
        localStorage.banks = JSON.stringify(arr)
      }
      setBanks(JSON.parse(localStorage.getItem('banks')))
      setBank({id: bank.id, name: '', rate: '', maxLoan: '', upPay: '', term: ''})
      setTimeout(() => {event.target.className = 'myBtn'}, 1000)
    } else {
      event.target.className += ' myBtnAnim'
    }
  }

  return (
    <div className="App">
      <Nav setPage={setPage} />
      {page === 'addBank'
        ? <div>
            <h1>Bank App</h1>
            <AddForm 
              bank={bank} 
              setBank={setBank} 
              localStore={localStore} 
            />
          </div>
        : <div> 
            <h1>Bank App</h1>
            <CalcForm 
              defaultBanks={[{id: '', name: '', rate: '', maxLoan: '', upPay: '', term: ''}]} 
              selectedBank={selectedBank} 
              setSelectedBank={setSelectedBank} 
              mortgage={mortgage} 
              banks={banks} 
              setBanks={setBanks}
              setMortgage={setMortgage} 
              modalRef={modalRef} 
              calcSettings={calcSettings}
              setCalcSettings={setCalcSettings}
            /> 
          </div>
      }
      
    </div>
  );
}

export default App;
