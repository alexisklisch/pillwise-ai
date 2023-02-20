import { useEffect, useState } from 'react'
const API_COHERE = import.meta.env.VITE_COHERE_API

export const useAIGenerate = (com) => {
  const [response, setResponse] = useState()

  useEffect(() => {
    const changeResponse = async () => {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Cohere-Version': '2022-12-06',
          'content-type': 'application/json',
          authorization: `Bearer ${API_COHERE}`
        },
        body: JSON.stringify({
          model: 'command-xlarge-20221108',
          max_tokens: 300,
          temperature: 0.2,
          p: 0.5,
          return_likelihoods: 'NONE',
          truncate: 'END',
          prompt: com
        })
      }
      if (!com) return
      fetch('https://api.cohere.ai/generate', options)
        .then(response => response.json())
        .then(response => {
          const gen = response.generations[0].text
          setResponse(gen)
        })
        .catch(err => console.error(err))
    }
    changeResponse()
  }, [com])

  return { generation: response }
}
