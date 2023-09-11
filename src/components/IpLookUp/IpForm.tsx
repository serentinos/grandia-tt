import { useState, KeyboardEvent, ChangeEvent, useRef, FormEvent, FC } from "react";
import { getInfo } from "../../api/ipLookup";
import { IpData } from "../../types";
import Button from "../Button/Button";
import { ErrorMessage } from "../ErrorMessage";

const getPreparedValue = (value: string) => {
  const maxIpCellValue = 255;
  
  if (!value) {
    return '';
  }

  const filteredValue = value.replace(/[^0-9]+/gi, '');
  let numberValue = Number(filteredValue);

  if (numberValue > maxIpCellValue) {
    numberValue = maxIpCellValue;
  }

  return numberValue < 0
    ? ''
    : numberValue.toString();
}

const editFormStore = (formStore: string[], index: number, value: string) => {
  const newArr = [...formStore];
  
  newArr[index] = value;

  return newArr;
};

interface Props {
  setIpInfo: React.Dispatch<React.SetStateAction<IpData | undefined>>
}

export const IpForm:FC<Props> = ({ setIpInfo }) => {
  const [formStore, setFormStore] = useState<string[]>(['', '', '', '']);
  const [isAllowToSubmit, setIsAllowToSubmit] = useState(false);
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const inputsRefs = useRef<HTMLInputElement[]>([]);
  
  const fetchData = async (ipNumber: string) => {
    setIsLoading(true);
    setIpInfo(undefined);
    setError('');

    try {
      const dataFromServer = await getInfo(ipNumber);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const ipString = formStore.join('.');

    fetchData(ipString);
  };

  const moveFocusToInputByIndex = (index: number) => {
    if (index < 0) {
      return;
    }

    if (index >= 4) {
      inputsRefs.current[3].blur();
      return;
    }

    inputsRefs.current[index].focus();
  }

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    inputIndex: number
  ) => {
    const isPressedEnter = e.key === "Enter";
    const isPressedEsc = e.key === "Escape";
    const elementRefIndex = inputIndex;

    if (isPressedEnter) {
      e.preventDefault();
      moveFocusToInputByIndex(elementRefIndex + 1);
    }

    if (isPressedEsc) {
      moveFocusToInputByIndex(elementRefIndex - 1);
    }
  };

  const codeChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    changeFunc: React.Dispatch<React.SetStateAction<string[]>>,
    inputIndex: number
  ) => {
    const newValue = getPreparedValue(event.target.value);
    const elementRefIndex = inputIndex;

    if (error) {
      setError('');
    }

    changeFunc((prevValue) => {
      const newFormState = editFormStore(prevValue, inputIndex, newValue);

      const isAllCellsAreNotEmpty = newFormState.every(item => item !== '');
  
      isAllCellsAreNotEmpty ? setIsAllowToSubmit(true) : setIsAllowToSubmit(false);

      if (newValue === prevValue[inputIndex]) {
        return newFormState;
      }
      
      if (newValue.length === 3) {
        moveFocusToInputByIndex(elementRefIndex + 1);
        return newFormState;
      }

      if (newValue.length > 3) {
        moveFocusToInputByIndex(elementRefIndex + 1);
        return prevValue;
      }

      if (newValue.length <= 0) {
        moveFocusToInputByIndex(elementRefIndex - 1);
        return newFormState;
      }

      return newFormState;
    });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] h-max"
      >
        <div className="flex p-2 flex-row gap-2 bg-slate-100 items-end rounded-md border mb-2">
          {formStore.map((_, index) => (
            <>
              <input
                type="text"
                className="inputField dotOnRight"
                value={formStore[index]}
                onChange={(e) => codeChangeHandler(e, setFormStore, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(ref) => ref && inputsRefs.current.push(ref)}
              />

              {index !== 3 && <span className="ipDot">.</span>}
            </>
          ))}
        </div>
        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}

        <Button
          isLoading={isloading}
          disabled={!isAllowToSubmit}
        >
          Check Ip
        </Button>
      </form>
    </div>
  )
}

export default IpForm