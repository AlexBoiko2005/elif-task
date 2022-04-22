import React, { useEffect, useRef } from 'react'
import './BankSelect.css'

const BankSelect = ({banks, selectedBank, setSelectedBank, defaultBanks, setMortgage, mortgage, ...props}) => {
    const selectValueRef = useRef()
    useEffect(() => {
        if (!!banks) {
            setSelectedBank(banks[0].name)
        } else {
            setSelectedBank('')
        }
        
    }, [])
    return (
        <select ref={selectValueRef} value={selectedBank} onChange={e => {setSelectedBank(e.target.value); setMortgage({...mortgage, bank: selectedBank}); }}>
            {banks === null
                ? <option value={defaultBanks[0].name}>{defaultBanks[0].name}</option>
                : banks.map((elem, index, key) => {
                    return (
                        <option onClick={(e) => {selectValueRef.current.value = e.target.value}} key={index}>{elem.name}</option>
                    )
            })}
        </select>
    )
}

export default BankSelect