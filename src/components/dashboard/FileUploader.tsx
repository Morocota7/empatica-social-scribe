
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, File, X } from "lucide-react"

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <Card className="bg-white">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-medium">Documentos de Referencia</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center items-center border-2 border-dashed border-gray-200 rounded-lg p-6">
            <label className="flex flex-col items-center gap-2 cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-500">
                Arrastra archivos aquí o haz clic para seleccionar
              </span>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <Button variant="outline" size="sm">
                Seleccionar archivos
              </Button>
            </label>
          </div>
          
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default FileUploader
