import { useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'

export const useAIGenerate = (com, apiKey) => {
  const [response, setResponse] = useState()

  useEffect(() => {
    const changeResponse = async () => {
      if (!com) return
      const configuration = new Configuration({
        apiKey
      })
      const openai = new OpenAIApi(configuration)
      await openai.createCompletion({
        model: 'text-davinci-002',
        max_tokens: 2000,
        prompt: com
      })
        .then(response => {
          const gen = response.data.choices[0].text
          setResponse(gen)
        })
        .catch(err => {
          const res = `Ocurrió un error a la hora de generar tu solicitud. El servicio no funciona o la API Key que proporcionaste no es válida.
          ${err}`
          setResponse(res)
        })
    }
    changeResponse()
  }, [com])

  return { generation: response }
}
