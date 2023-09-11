import { useState } from "react";
import IpData from "./IpData";
import IpForm from "./IpForm";
import { IpData as IpDataType } from "../../types";
import IpFormLegacy from "./IpFormLegacy";

export const IpLookUp = () => {
  const [ipInfo, setIpInfo] = useState<IpDataType | undefined>();
  
  return (
    <div className="h-[50vh] flex flex-col gap-3 justify-around md:content-center md:flex-row">
      <div className="w-full gap-10 flex flex-col justify-center items-center">
        <IpForm setIpInfo={setIpInfo}/>
        <IpFormLegacy setIpInfo={setIpInfo}/>
      </div>

      <IpData ipData={ipInfo}/>
    </div>
  );
}

export default IpLookUp