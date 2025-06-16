import { useState } from 'react'

export interface FileUploaderProps {
  onParsed: (txns: any[]) => void
}

export default function FileUploader({ onParsed }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [liveMsg, setLiveMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) {
      setFile(null)
      setError('')
      setLiveMsg('')
      return
    }
    const isCsv = f.type === 'text/csv' || f.name.toLowerCase().endsWith('.csv')
    if (isCsv) {
      setFile(f)
      setError('')
      setLiveMsg(`File selected: ${f.name}`)
    } else {
      setFile(null)
      setError('Please upload a CSV file')
      setLiveMsg('Error: Please upload a CSV file')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: in future, upload and parse file then invoke onParsed
    onParsed([])
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center text-base font-sans">
      <label htmlFor="csv-input" className="flex-1">
        <input
          id="csv-input"
          type="file"
          accept=".csv,text/csv"
          onChange={handleChange}
          className="w-full border rounded p-2 focus-visible:outline outline-2 outline-offset-2 outline-[#0052cc]"
        />
      </label>
      {file && (
        <span className="sm:ml-2 text-gray-700 truncate flex-1" aria-label={`Selected file: ${file.name}`}>{file.name}</span>
      )}
      <button
        type="submit"
        disabled={!file}
        className="bg-[#0052cc] text-white rounded px-4 py-2 hover:bg-[#0046b3] focus-visible:outline outline-2 outline-offset-2 outline-[#0052cc] disabled:opacity-50"
      >
        Upload
      </button>
      {error && (
        <p className="text-red-600 sm:basis-full" role="alert">{error}</p>
      )}
      <div aria-live="polite" className="sr-only">{liveMsg}</div>
    </form>
  )
}
