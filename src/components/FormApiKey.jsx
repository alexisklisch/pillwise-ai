import { useLocalStorage } from '../hooks/useLocalStorage'

export function FormApiKey ({ setApikeyOn }) {
  const [, setOaApikey] = useLocalStorage('openai-apikey', '')

  const formHandler = e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    setOaApikey(data['api-key'])
    setApikeyOn(true)
  }
  return (
    <form
      className='max-w-sm mx-auto py-28'
      onSubmit={formHandler}
    >
      <h4 className='mb-6'>Crea una cuenta en <a className='font-bold' href='https://platform.openai.com/signup' target='_blank' rel='noreferrer'>openai.com</a> y consigue tu clave única <a className='font-bold text-brand-violet' href='https://platform.openai.com/account/api-keys'>aquí</a>.</h4>
      <div className='grid gap-3'>
        <input
          className='w-full text-lg text-dark py-2 px-5 rounded-full border border-grey-200 shadow placeholder:text-grey-500 focus-visible:outline-brand-orange'
          type='text' placeholder='Tu API key' name='api-key'
        />
        <button
          className='bg-brand-purple col-span-2 md:col-span-1 font-bold text-lg text-grey-100 py-2 px-5 rounded-full border border-grey-200 shadow disabled:opacity-50'
        >
          Agregar
        </button>
      </div>
    </form>
  )
}
