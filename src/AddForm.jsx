import React from 'react'
import MyButton from './components/MyButton/MyButton'

const AddForm = ({bank, setBank, localStore, ...props}) => {
    return (
        <form>
            <label>
                <h3 className='bank-name'>Bank name:</h3>
                <input onChange={e => {setBank({...bank, name: e.target.value, id: e.target.value})}} value={bank.name} type='text'></input>
            </label>
            <label>
                <h3 className='interest-rate'>Interest rate:</h3>
                <input onChange={e => {setBank({...bank, rate: e.target.value})}} value={bank.rate} type='number' step='0.1'></input>
                <span>%</span>
            </label>
            <label>
                <h3 className='max-loan'>Maximum loan:</h3>
                <input onChange={e => {setBank({...bank, maxLoan: e.target.value})}} value={bank.maxLoan} type='number'></input>
                <span>$</span>
            </label>
            <label>
                <h3 className='upfront-pay'>Minimum down payment:</h3>
                <input onChange={e => {setBank({...bank, upPay: e.target.value})}} value={bank.upPay} type='number' step='0.1'></input>
                <span>%</span>
            </label>
            <label>
                <h3 className='loan-term' >Loan term:</h3>
                <input onChange={e => {setBank({...bank, term: e.target.value})}} value={bank.term} type='number' id='months-input'></input>
                <span>months</span>
            </label>
            <MyButton href='#' onClick={e => {e.preventDefault();localStore(e, bank);}}>Add bank setting</MyButton>
        </form>
    )
}

export default AddForm