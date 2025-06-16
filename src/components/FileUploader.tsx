import { useState, ChangeEvent } from 'react'
import { parseFinancials } from '../api/parse'

interface FileUploaderProps {
  onParsed: (transactions: any[]) => void
}

export default function FileUploader({ onParsed }: FileUploaderProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setLoading(true)

    try {
      const text = await file.text()
      const transactions = await parseFinancials(text, 'csv')
      onParsed(transactions)
    } catch (err: any) {
      setError(err?.message || 'Failed to parse file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white file:hover:bg-blue-700"
      />
      {loading && <p className="text-gray-500">Parsing...</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  )
}
