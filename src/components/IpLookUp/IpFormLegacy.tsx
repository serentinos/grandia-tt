import { ChangeEvent, FC, FormEvent, useState } from "react";
import Button from "../Button/Button";
import { ErrorMessage } from "../ErrorMessage";
import { getInfo } from "../../api/ipLookup";
import { IpData } from "../../types";

interface Props {
  setIpInfo: React.Dispatch<React.SetStateAction<IpData | undefined>>
}

export const IpFormLegacy:FC<Props> = ({ setIpInfo }) => {
  const [formStore, setFormStore] = useState<string>('');
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const validateIpString = (ipString: string) => {
    const maxBlocks = 4;
    const maxBlockValue = 255;
    
    const stringArray = ipString.split('.');

    if (ipString.includes('+')) {
      setError(`IP address should me in x.x.x.x format and without "+"`);
      return;
    }

    if (stringArray.length !== maxBlocks) {
      setError('IP address should be in x.x.x.x format')
      return false;
    }

    const isInRange = stringArray.every(value => (
      Number(value) <= maxBlockValue && Number(value) >= 0
    ));

    const isBlockEmpty = stringArray.some(value => !value);

    if (isBlockEmpty) {
      setError('Between dots should be number in range 0 - 255');
      return false;
    }

    if (!isInRange) {
      setError('IP address should be in range 0.0.0.0 - 255.255.255.255')
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateIpString(formStore)) return;

    setIsLoading(true);
    setIpInfo(undefined);
    try {
      const dataFromServer = await getInfo(formStore.trim());

      if (!dataFromServer.is_valid) {
        setError('Error: Provided IP address are not valid, try another one.');
        return;
      }

      setIpInfo(dataFromServer);
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormStore(e.target.value);
    if (error) setError('');
  };
  
  return (
    <div className="w-full">
      <h2 className="font-bold text-center mb-2">Default Form</h2>
      <form
        onSubmit={handleSubmit}
        className="h-max max-w-[400px] mx-auto"
      >
        <input
          className="flex p-2 w-full flex-row gap-2 bg-slate-100 items-end rounded-md border mb-2 text-center"
          value={formStore}
          onChange={handleInputChange}
        >

        </input>
        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}

        <Button
          isLoading={isloading}
        >
          Check Ip
        </Button>
      </form>
    </div>
  )
}

export default IpFormLegacy