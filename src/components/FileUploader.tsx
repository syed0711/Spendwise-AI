import { useState } from 'react'

export interface FileUploaderProps {
  onParsed: (txns: any[]) => void
}

export default function FileUploader({ onParsed }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: in future, upload and parse file then invoke onParsed
    onParsed([])
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        disabled={!file}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Upload
      </button>
    </form>
  )
}
