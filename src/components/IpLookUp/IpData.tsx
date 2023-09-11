import { FC } from "react"
import { IpData as IpDataType } from "../../types"
import { ResultData } from "../ResultData"

interface Props {
  ipData?: IpDataType
}

export const IpData:FC<Props> = ({ ipData }) => {
  return (
    <ResultData>
      { ipData ? (
        <>
          <p>
            <b>IP Address:</b> {ipData.address}
          </p>

          <p>
            <b>Country:</b> {ipData.country}
          </p>

          <p>
            <b>Latitude:</b> {ipData.lat}
          </p>

          <p>
            <b>Longitude:</b> {ipData.lon}
          </p>

          <p>
            <b>Timezone:</b> {ipData.timezone}
          </p>
        </>
      ) : (
        <p>Here will be your ip data info</p>
      ) }
    </ResultData>
  )
}

export default IpData