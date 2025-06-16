import FileUploader from '../components/FileUploader'
import { useNavigate } from 'react-router-dom'

export interface HomeProps {
  onParsed: (txns: any[]) => void
}

export default function Home({ onParsed }: HomeProps) {
  const navigate = useNavigate()

  // After parsing, save transactions then redirect
  const handleParsed = (txns: any[]) => {
    onParsed(txns)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md text-base font-sans">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload your CSV</h1>
        <FileUploader onParsed={handleParsed} />
      </div>
    </div>
  )
}
