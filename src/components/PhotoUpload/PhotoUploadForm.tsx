import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import Button from "../Button/Button";
import { postImage } from '../../api/ImageToText';
import { TextData } from '../../types';
import { AxiosError } from 'axios';

const transformRawDataToText = (data: TextData[]) => {
  const resultText = data.map(dataItem => dataItem.text).join(' ');

  return resultText;
}

const PhotoUploadForm = () => {
  const [file, setFile] = useState<File | undefined>();
  const [loadingError, setLoadingError] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  console.log(file);
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onFileUpload();
  };

  const handleButtonClick = () => {
    if (!hiddenFileInput.current) return;
    
    hiddenFileInput.current.click();
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    setLoadingError('');
    
    if (!file) return;
    
    formData.append('Image', file);
    setIsLoading(true);

    try {
      const resultData = await postImage(formData);
      const resultText = transformRawDataToText(resultData);
      
      console.log(resultText);
    } catch (error) {
      setLoadingError((error as AxiosError<{error: string}>).response?.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    setFile(e.target.files[0]);
  };
  
  return (
    <div className="w-full flex justify-center items-center">
      <form 
        onSubmit={handleSubmit}
        className="w-[400px] h-max"
      >
        <div 
          className="flex p-2 flex-row gap-2 justify-between bg-slate-100 items-center rounded-md border mb-2"
        >
          <div className='overflow-hidden break-words max-w-[70%]'>
            {file
              ? (<p>{file.name}</p>)
              : (<p>Choose image file...</p>)}
          </div>

          <button 
            className='border py-1 px-3 rounded-md bg-white hover:bg-slate-200 font-bold text-sm'
            onClick={handleButtonClick}
          >
            Browse Files
          </button>
        </div>

        <input
          type="file"
          className='hidden'
          ref={hiddenFileInput}
          accept='image/png, image/jpeg'
          onChange={onFileChange}
        />
        <Button isLoading={isLoading}>Image to text</Button>
      </form>
    </div>
  )
}

export default PhotoUploadForm