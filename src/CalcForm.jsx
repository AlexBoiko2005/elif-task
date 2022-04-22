import React from 'react'
import MyButton from './components/MyButton/MyButton'
import BankSelect from './components/BankSelect/BankSelect'
import './CalcForm.css'

const CalcForm = ({mortgage, setMortgage, banks, setBanks, selectedBank, setSelectedBank, modalRef, defaultBanks, calcSettings, ...props}) => {
    const calcFunction = (e) => {
        e.preventDefault()
        setBanks(JSON.parse(localStorage.getItem('banks')))
        if(banks === null || banks === undefined || selectedBank == '' || banks[0].name === '') {
            props.setCalcSettings(defaultBanks[0])
            modalRef.current.innerHTML = '<p>Choose or add bank!</p>'
            modalRef.current.style = 'transform: translateY(0px);'
        } else {
            props.setCalcSettings(banks.filter(bank => bank.name === selectedBank)[0])
            setMortgage({...mortgage, bank: selectedBank})
            if (parseInt(mortgage.loan) <= parseInt(calcSettings.maxLoan) && parseInt(mortgage.upPay) >= parseInt(mortgage.loan) / (100/parseFloat(calcSettings.upPay))) {
                const r = parseFloat(calcSettings.rate)
                const term = parseInt(calcSettings.term)
                const monthlyPay = (parseInt(mortgage.loan) * (r / 12) * (1 + r / 12) ** term) / ((1 + r / 12) ** term - 1) / 12
                modalRef.current.innerHTML = '<ol>Requrements: <li>Initial loan:   +</li><li>Down payment: +</li></ol><p>Great! You can take loan with <span>' + monthlyPay.toFixed(1) + '$</span>monthly mortgage payment on <span>' + calcSettings.term + '</span> months</p>'
                modalRef.current.style = 'transform: translateY(0px);'
            } else if (parseInt(mortgage.loan) <= parseInt(calcSettings.maxLoan) && parseInt(mortgage.upPay) < parseInt(mortgage.loan)/(100/parseInt(calcSettings.upPay))) {
                const minUpPay = parseInt(mortgage.loan) / (100 / parseInt(calcSettings.upPay))
                modalRef.current.innerHTML = '<ol>Requrements: <li>Initial loan:   +</li><li>Down payment: -</li></ol><p>Your down payment is too small! For yout loan it must be minimum ' + minUpPay + '$ in this bank.'
                modalRef.current.style = 'transform: translateY(0px);'
            } else if (parseInt(mortgage.loan) > parseInt(calcSettings.maxLoan)) {
                modalRef.current.innerHTML = '<ol>Requrements: <li>Initial loan:   -</li><li>Down payment: -</li></ol><p>Initial loan is too big! It can be maximum ' + parseInt(calcSettings.maxLoan) + '$ in this bank.'
                modalRef.current.style = 'transform: translateY(0px);'
            } else if (!selectedBank){
                modalRef.current.innerHTML = '<p>Choose or add bank!</p>'
                modalRef.current.style = 'transform: translateY(0px);'
            } else if (mortgage.loan == '' || mortgage.upPay == ''){
                modalRef.current.innerHTML = '<p>Fill all blanks!</p>'
                modalRef.current.style = 'transform: translateY(0px);'
            }
        }
        
    }

    const modalFunction = (e) => {
        e.target.style = 'transform: translateY(-700px);'
    }

    return (
        <form>
            <label>
                <h3 className='initial-loan'>Initial loan:</h3>
                <input value={mortgage.loan} type='number' onChange={e => {setMortgage({...mortgage, loan: e.target.value})}} ></input>
                <span>$</span>
            </label>
            <label>
                <h3 className='down-payment'> Down payment:</h3>
                <input value={mortgage.upPay} type='number' onChange={e => {setMortgage({...mortgage, upPay: e.target.value})}} ></input>
                <span>$</span>
            </label>
            <label>
                <h3 className='bank-sets'>Settings of bank:</h3>
                <BankSelect mortgage={mortgage} setMortgage={setMortgage} defaultBanks={defaultBanks} setSelectedBank={setSelectedBank} selectedBank={selectedBank} banks={banks} />
            </label>
            <MyButton onClick={e => {calcFunction(e)}} >Calc Mortgage</MyButton>
            <div className='modal' ref={modalRef} onClick={(e) => {modalFunction(e)}}></div>
        </form>
    )
}

export default CalcForm