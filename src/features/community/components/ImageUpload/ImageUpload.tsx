import { useRef, useState } from 'react'
import './ImageUpload.css'

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export const ImageUpload = ({ images, onChange, maxImages = 5 }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const remainingSlots = maxImages - images.length
    if (remainingSlots <= 0) {
      alert(`Bạn chỉ có thể upload tối đa ${maxImages} ảnh`)
      return
    }

    const filesArray = Array.from(files).slice(0, remainingSlots)
    const newImages: string[] = []

    filesArray.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} không phải là file ảnh`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          newImages.push(result)
          if (newImages.length === filesArray.length) {
            onChange([...images, ...newImages])
          }
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  return (
    <div className="image-upload">
      {images.length > 0 && (
        <div className="image-upload__preview">
          {images.map((image, index) => (
            <div key={index} className="image-upload__preview-item">
              <img src={image} alt={`Preview ${index + 1}`} />
              <button
                type="button"
                className="image-upload__remove"
                onClick={() => removeImage(index)}
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < maxImages && (
        <div
          className={`image-upload__dropzone ${isDragging ? 'image-upload__dropzone--dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          <div className="image-upload__dropzone-content">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>Kéo thả ảnh vào đây hoặc click để chọn</span>
            <span className="image-upload__hint">
              {images.length}/{maxImages} ảnh
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
