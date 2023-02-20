import { Icon } from '@iconify/react'

export const VerifResults = ({ setShowResults, text }) => {
  const backHandler = () => {
    setShowResults(false)
    text = ''
  }
  return (
    <section className='overflow-y-scroll fixed top-0 right-0 bottom-0 left-0 bg-grey-100 z-20 px-5 '>
      <figure className='text-5xl font-black text-center uppercase bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent z-10 pt-12'>
        Pillwise
      </figure>
      <h3 className='text-2xl text-dark font-black text-center uppercase pb-12'>Determina</h3>
      <div className='grid place-items-center'>
        <p className='text-3xl leading-10 px-5 max-w-2xl mx-auto text-center'>
          {text || <Icon icon='eos-icons:bubble-loading' />}
        </p>
        <button onClick={backHandler} className='px-5 hover:px-6 border border-grey-500 rounded-full mt-12 transition-all' type='button'>Atrás</button>
      </div>
    </section>
  )
}
