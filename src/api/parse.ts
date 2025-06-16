import axios from 'axios'

export async function parseFinancials(text: string, type: string) {
  const { data } = await axios.post(import.meta.env.VITE_PARSE_URL, {
    text,
    type,
  })
  return data.transactions as any[]
}
