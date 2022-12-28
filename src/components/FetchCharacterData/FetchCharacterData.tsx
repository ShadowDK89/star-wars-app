import { useCallback, useEffect } from 'react';
import { getAllCharacters } from '../../api/api';
import { TCharacters } from '../../models/TCharacters';

type TFetchCharacterDataProps = {
  onHandleResponse: (
    characterData: TCharacters[],
    isLoaded: boolean,
    errorMessage: string
  ) => void;
};

function FetchCharacterData({ onHandleResponse }: TFetchCharacterDataProps) {
  useEffect(() => {
    if (localStorage.getItem('characterList')) {
      parseLocalStorage();
      return;
    }

    fetchCharactersData();
  }, []);

  const fetchCharactersData = useCallback(async () => {
    let count = 1;
    let currentId = 1;
    let newCharacterData: TCharacters[] = [];
    while (count <= 9) {
      const data = await getAllCharacters(count);
      if (typeof data === 'string') {
        onHandleResponse(
          [],
          false,
          'Could not translate Star Wars characters data'
        );
        return;
      }
      data?.forEach((char) => {
        //To correct the API URI when getting detailed data
        if (char.name === 'Wedge Antilles') {
          ++currentId;
        }
        char.id = currentId.toString();
        newCharacterData.push(char);
        currentId++;
      });
      count++;
    }
    const stringifiedData = JSON.stringify(newCharacterData);
    localStorage.setItem('characterList', stringifiedData);
    onHandleResponse(newCharacterData, true, '');
  }, [onHandleResponse]);

  const parseLocalStorage = () => {
    const storageData = localStorage.getItem('characterList');
    onHandleResponse(JSON.parse(storageData!), true, '');
  };

  return null;
}

export default FetchCharacterData;
