import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Upload } from 'lucide-react'

export interface HomeProps {
  onParsed: (txns: any[]) => void
}

export default function Home({ onParsed }: HomeProps) {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

<<<<<<< codex/update-home.tsx-to-use-firebase-function-for-csv-parsing
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const { data } = await axios.post('/parseFinancials', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      onParsed(data.transactions)
      navigate('/dashboard')
    } catch (err) {
      setError('Failed to parse file')
    } finally {
      setLoading(false)
    }
=======
  // After parsing, save transactions then redirect
  const handleParsed = (txns: any[]) => {
    onParsed(txns)
    navigate('/dashboard')
>>>>>>> main
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md text-base font-sans">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload your file</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 sm:flex-row sm:items-center"
        >
          <label htmlFor="file" className="flex-1">
            <input
              id="file"
              type="file"
              accept=".csv,.pdf,.xlsx"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full border rounded p-2 focus-visible:outline outline-2 outline-offset-2 outline-[#0052cc]"
            />
          </label>
          <button
            type="submit"
            disabled={!file || loading}
            className="bg-[#0052cc] text-white rounded px-4 py-2 flex items-center gap-2 hover:bg-[#0046b3] focus-visible:outline outline-2 outline-offset-2 outline-[#0052cc] disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <Upload size={16} /> Upload
              </>
            )}
          </button>
        </form>
        {error && <p className="text-red-600 mt-2" role="alert">{error}</p>}
      </div>
    </div>
  )
}
