import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useAIGenerate } from './hooks/useAIGenerate'
import { VerifResults } from './layouts/VerifResults'
import FormMedicine from './components/FormMedicine'
import { FormApiKey } from './components/FormApiKey'

export const App = () => {
  const [oaApikey] = useLocalStorage('openai-apikey', '')
  const [commandSearch, setCommandSearch] = useState()
  const [apikeyOn, setApikeyOn] = useState(false)
  const { generation } = useAIGenerate(commandSearch, oaApikey)

  const [showResults, setShowResults] = useState(false)

  return (
    <div>
      {/* Home Container */}
      <div className={showResults ? 'hidden' : undefined}>
        <section>
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
          {
            apikeyOn || oaApikey
              ? <FormMedicine setShowResults={setShowResults} setCommandSearch={setCommandSearch} setApikeyOn={setApikeyOn} />
              : <FormApiKey setApikeyOn={setApikeyOn} />
          }
          <section className='max-w-5xl mx-auto'>
            <h2 className='text-2xl font-bold text-center px-5'>¿Por qué es importante que uses <span className='font-black bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent'>Pillwise</span>?</h2>
            <div className='py-5 flex flex-col gap-10 lg:flex-row'>
              <article className='px-8'>
                <video
                  className='[mask:url("/svgs/video-mask.svg")_no-repeat_center] [mask-size:contain] mx-auto'
                  src='https://alexisklisch.com/projects/pillwise/vids/dados-de-la-mano.webm'
                  muted autoPlay loop width='320'
                />
                <p className='text-xl text-center text-dark mt-4'>La combinación de medicamentos puede aumentar o disminuir la concentración de un medicamento en el cuerpo, lo que puede resultar en una dosis inadecuada o excesiva.</p>
              </article>
              <article className='px-8'>
                <video
                  className='[mask:url("/svgs/video-mask.svg")_no-repeat_center] [mask-size:contain] mx-auto'
                  src='https://alexisklisch.com/projects/pillwise/vids/abuela-y-nieta.webm'
                  muted autoPlay loop width='320'
                />
                <p className='text-xl text-center text-dark mt-4'>Puede ser difícil para las personas conocer la compatibilidad de sus medicamentos, especialmente si tienen diferentes proveedores de atención médica que prescriben diferentes drogas.</p>
              </article>
            </div>
          </section>
          {/* Dedicatoria */}
          <section className='my-10'>
            <img className='w-full -mb-1' src='/svgs/wave-separator-dark.svg' alt='Separador oscuro' />
            <div className='bg-dark md:text-xl text-grey-100 text-center py-10 sm:px-32'>
              <div className='max-w-lg mx-auto'>
                <p>A mi abuela, cuya sabiduría y amor continúan viviendo en mi corazón.</p>
                <p>Aunque partió después de un accidente triste relacionado con la mezcla de medicamentos, su último consejo me inspiró a crear una app para prevenir errores similares.</p>
                <p>Gracias por ser mi luz y por siempre estar conmigo en cada línea de código escrita. Te amo.</p>
                <h1><span className='font-black bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent'>Vitalina</span> 💕</h1>
              </div>
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
      </div>
      {showResults && <VerifResults text={generation} setShowResults={setShowResults} />}
    </div>
  )
}
