import { useState } from "react";
import PhotoUploadData from "./PhotoUploadData"
import PhotoUploadForm from "./PhotoUploadForm"

export const PhotoUpload = () => {
  const [resultData, setResultData] = useState<string>('');
  
  return (
    <div className="h-[50vh] flex flex-col gap-3 justify-around md:content-center md:flex-row">
      <PhotoUploadForm onChangeResultData={setResultData} />
      <PhotoUploadData data={resultData}/>
    </div>
  )
}

export default PhotoUpload