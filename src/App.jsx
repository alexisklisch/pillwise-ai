import { useState } from 'react'
import { useAIGenerate } from './hooks/useAIGenerate'
import { VerifResults } from './layouts/VerifResults'

const Input = <input className='w-full text-lg text-dark py-2 px-5 rounded-full border border-grey-200 shadow placeholder:text-grey-500 focus-visible:outline-brand-orange' type='text' placeholder='Ingresa el nombre de la droga' />

export const App = () => {
  const [verifDisabled, setVerifDisabled] = useState(true)
  const [commandSearch, setCommandSearch] = useState()
  const [showResults, setShowResults] = useState(false)
  const [inputQ, setInputQ] = useState([Input, Input])
  const { generation } = useAIGenerate(commandSearch)

  const verifHandler = e => {
    e.preventDefault()
    const $form = e.target.parentElement.parentElement

    setShowResults(true)

    const $inputs = Array.from($form.querySelectorAll('input'))
    const medicinesArr = []
    $inputs.forEach(medicine => medicinesArr.push(medicine.value))
    const result = medicinesArr.slice(0, -1).join(', ') + ' and ' + medicinesArr[medicinesArr.length - 1]

    const propmtText = `Assess the compatibility of medications ${result} and classify as <minor>, <monitor closely>, <serious>, or <don't use together> based on the necessary level of attention.`
    setCommandSearch(propmtText)
  }

  const verifAbleHandler = e => {
    const $form = e.target.parentElement.parentElement
    const $inputs = Array.from($form.querySelectorAll('input'))
    const existInput = $inputs.some(elem => elem.value)
    setVerifDisabled(!existInput)
  }

  return (
    <div>
      <section className={showResults ? 'hidden' : undefined}>
        <header
          className='bg-dark text-grey-100 [background-image:url("https://images.unsplash.com/photo-1498757581981-8ddb3c0b9b07")] [background-size:cover] [background-position:center] min-h-[80vh] md:min-h-[60vh] md:[background-position:0_-200px] lg:[background-position:0_-500px] md:[background-attachment:fixed] relative -z-10 flex flex-col justify-between'
        >
          {/* Overlay */}
          <div className='bg-dark opacity-70 absolute top-0 right-0 bottom-0 left-0 -z-10' />
          <figure className='text-5xl md:text-8xl font-black text-center uppercase bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent z-10 pt-12'>Pillwise</figure>
          <h1 className='pb-12 sm:pb-24 px-5 text-xl sm:text-2xl uppercase text-center'>Asegurate que tus medicamentos puedan tomarse juntos</h1>
          <img className='absolute bottom-0 w-full -mb-1' src='/svgs/wave-separator.svg ' alt='Separador de secciones en forma de onda' />
        </header>
      </section>
      <main className='bg-grey-100'>
        <form onChange={e => verifAbleHandler(e)} onSubmit={e => verifHandler(e)} className='py-12 px-5 max-w-4xl mx-auto'>
          <div className='grid gap-4'>
            {inputQ.map(input => input)}
          </div>
          <div type='button' className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
            <button onClick={() => setInputQ([...inputQ.slice(0, -1)])} type='button' className='text-lg text-dark py-2 px-5 rounded-full border border-grey-200 shadow'>Quitar</button>
            <button onClick={() => setInputQ([...inputQ, Input])} type='button' className='text-lg text-brand-purple py-2 px-5 rounded-full border border-grey-200 shadow'>Agregar</button>
            <button type='submit' disabled={verifDisabled} className='bg-brand-purple col-span-2 md:col-span-1 font-bold text-lg text-grey-100 py-2 px-5 rounded-full border border-grey-200 shadow disabled:opacity-50'>Verificar</button>
          </div>
        </form>
        <section className='max-w-5xl mx-auto'>
          <h2 className='text-2xl font-bold text-center px-5'>¿Por qué es importante que uses <span className='font-black bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent'>Pillwise</span>?</h2>
          <div className='py-5 flex flex-col gap-10 lg:flex-row'>
            <article className='px-8'>
              <video
                className='[mask:url("/svgs/video-mask.svg")_no-repeat_center] [mask-size:contain] mx-auto'
                src='/vids/dados-de-la-mano.webm'
                muted autoPlay loop width='320'
              />
              <p className='text-xl text-center text-dark mt-4'>La combinación de medicamentos puede aumentar o disminuir la concentración de un medicamento en el cuerpo, lo que puede resultar en una dosis inadecuada o excesiva.</p>
            </article>
            <article className='px-8'>
              <video
                className='[mask:url("/svgs/video-mask.svg")_no-repeat_center] [mask-size:contain] mx-auto'
                src='/vids/abuela-y-nieta.webm'
                muted autoPlay loop width='320'
              />
              <p className='text-xl text-center text-dark mt-4'>Puede ser difícil para las personas conocer la compatibilidad de sus medicamentos, especialmente si tienen diferentes proveedores de atención médica que prescriben diferentes drogas.</p>
            </article>
          </div>
        </section>
        {/* Dedicatoria */}
        <section className='my-10'>
          <img className='w-full -mb-1' src='/svgs/wave-separator-dark.svg' alt='Separador oscuro' />
          <div className='bg-dark md:text-xl text-grey-100 text-center px-8 py-10 sm:px-32'>
            <p>A mi abuela, cuya sabiduría y amor continúan viviendo en mi corazón.</p>
            <p>Aunque partió después de un accidente triste relacionado con la mezcla de medicamentos, su último consejo me inspiró a crear una app para prevenir errores similares.</p>
            <p>Gracias por ser mi luz y por siempre estar conmigo en cada línea de código escrita. Te amo.</p>
            <h1><span className='font-black bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent'>Vitalina</span> 💕</h1>
          </div>
          <img className='w-full rotate-180 -mt-1' src='/svgs/wave-separator-dark.svg' alt='Separador oscuro' />
        </section>
        <footer className='grid gap-6 sm:max-w-2xl mx-auto py-8 md:pb-20'>
          <article className='flex flex-col items-center gap-2'>
            <h6 className='text-grey-500 text-sm'>Una creación de</h6>
            <a href='https://alexisklisch.com' target='_blank' rel='noreferrer'><img src='/svgs/logo-alexis-klisch.svg' alt='Logotipo de Alexis Klisch' /></a>
          </article>
        </footer>
      </main>
      {showResults && <VerifResults text={generation} setShowResults={setShowResults} />}
    </div>
  )
}
