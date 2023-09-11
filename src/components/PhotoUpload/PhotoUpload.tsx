import PhotoUploadData from "./PhotoUploadData"
import PhotoUploadForm from "./PhotoUploadForm"

export const PhotoUpload = () => {
  return (
    <div className="h-screen flex flex-col gap-3 justify-around md:content-center md:flex-row">
      <PhotoUploadForm />
      <PhotoUploadData />
    </div>
  )
}

export default PhotoUpload