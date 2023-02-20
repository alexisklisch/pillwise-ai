import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
const Input = <input className='w-full text-lg text-dark py-2 px-5 rounded-full border border-grey-200 shadow placeholder:text-grey-500 focus-visible:outline-brand-orange' type='text' placeholder='Ingresa el nombre de la droga' />

export default function FormMedicine ({ setShowResults, setCommandSearch, setApikeyOn }) {
  const [verifDisabled, setVerifDisabled] = useState(true)
  const [inputQ, setInputQ] = useState([Input, Input])
  const [, setApikey] = useLocalStorage('openai-apikey')

  const formHandler = e => {
    e.preventDefault()
    const $form = e.target.parentElement.parentElement

    setShowResults(true)

    const $inputs = Array.from($form.querySelectorAll('input'))
    const medicinesArr = []
    $inputs.forEach(medicine => medicinesArr.push(medicine.value))
    const result = medicinesArr.slice(0, -1).join(', ') + ' y ' + medicinesArr[medicinesArr.length - 1]

    const propmtText = `¿Los medicamentos ${result} son aptos para tomar en conjunto? ¿Por qué? Dime si tiene un índice de peligro bajo, medio o alto.`
    setCommandSearch(propmtText)
  }

  const verifyIfFormIsDisabled = e => {
    const $form = e.target.parentElement.parentElement
    const $inputs = Array.from($form.querySelectorAll('input'))
    const existInput = $inputs.some(elem => elem.value)
    setVerifDisabled(!existInput)
  }

  const resetApiKey = () => {
    setApikey('')
    setApikeyOn(false)
  }

  return (
    <form
      onChange={(e) => verifyIfFormIsDisabled(e)}
      onSubmit={(e) => formHandler(e)}
      className='py-12 px-5 max-w-4xl mx-auto'
    >
      <div className='grid gap-4'>{inputQ.map((input, i) => input)}</div>
      <div type='button' className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
        <button
          onClick={() => setInputQ([...inputQ.slice(0, -1)])}
          type='button'
          className='text-lg text-dark py-2 px-5 rounded-full border border-grey-200 shadow'
        >
          Quitar
        </button>
        <button
          onClick={() => setInputQ([...inputQ, Input])}
          type='button'
          className='text-lg text-brand-purple py-2 px-5 rounded-full border border-grey-200 shadow'
        >
          Agregar
        </button>
        <button
          type='submit'
          disabled={verifDisabled}
          className='bg-brand-purple col-span-2 md:col-span-1 font-bold text-lg text-grey-100 py-2 px-5 rounded-full border border-grey-200 shadow disabled:opacity-50'
        >
          Verificar
        </button>
      </div>
      <p className='text-center mt-6'>Si quieres cambiar cambiar tu API Key, <button type='button' onClick={resetApiKey} className='font-bold text-brand-orange'>haz click aquí.</button></p>
    </form>
  )
}
