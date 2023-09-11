import { FC } from "react"
import { ResultData } from "../ResultData"

interface Props {
  data?: string
}

const PhotoUploadData:FC<Props> = ({ data }) => {
  return (
    <ResultData>
      {data ? (
        <p>
          <b>Recognized text: </b> {data}
        </p>
      ) : (
        <p>
          Your text will be here
        </p>
      )}
    </ResultData>
  )
}

export default PhotoUploadData