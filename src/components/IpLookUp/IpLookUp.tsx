import { useState } from "react";
import IpData from "./IpData";
import IpForm from "./IpForm";
import { IpData as IpDataType } from "../../types";

export const IpLookUp = () => {
  const [ipInfo, setIpInfo] = useState<IpDataType | undefined>();
  
  return (
    <div className="h-screen flex flex-col gap-3 justify-around md:content-center md:flex-row">
      <IpForm setIpInfo={setIpInfo}/>
      <IpData ipData={ipInfo}/>
    </div>
  );
}

export default IpLookUp