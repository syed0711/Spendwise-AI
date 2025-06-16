import FileUploader from '../components/FileUploader'

export interface HomeProps {
  onParsed: (txns: any[]) => void
}

export default function Home({ onParsed }: HomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center">Upload your CSV</h1>
        <FileUploader onParsed={onParsed} />
      </div>
    </div>
  )
}
