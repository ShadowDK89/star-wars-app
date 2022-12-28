import { useCallback, useEffect } from 'react';
import { getCharacter, getSpecies } from '../../api/api';
import { TSingleCharacter } from '../../models/TCharacters';

type TFetchCharacterDetailsProps = {
  characterId: string;
  speciesId: number;
  onHandleDetailsData: (
    characterDetails: TSingleCharacter,
    isLoaded: boolean,
    errorMessage: string
  ) => void;
};

const defaultCharacter: TSingleCharacter = {
  id: '',
  name: '',
  height: '',
  hairColor: '',
  skinColor: '',
  eyeColor: '',
  birthYear: '',
  gender: '',
  species: '',
};

function FetchCharacterDetails({
  characterId,
  speciesId,
  onHandleDetailsData,
}: TFetchCharacterDetailsProps) {
  const fetchCharacterData = useCallback(async (id: string) => {
    const characterData = await getCharacter(id);
    if (typeof characterData === 'string') {
      onHandleDetailsData(
        defaultCharacter,
        true,
        'Could not translate data of this character'
      );
      return;
    }

    const speciesData = await getSpecies(speciesId);
    characterData.species = speciesData;

    const stringifiedData = JSON.stringify(characterData);
    localStorage.setItem('characterDetails', stringifiedData);
    onHandleDetailsData(characterData, true, '');
  }, []);

  const checkStorageData = () => {
    if (localStorage.getItem('characterDetails')) {
      const storageData = localStorage.getItem('characterDetails');
      const parsedData: TSingleCharacter = JSON.parse(storageData!);

      if (parseInt(parsedData.id) !== parseInt(characterId!)) return false;

      onHandleDetailsData(JSON.parse(storageData!), true, '');
      return true;
    }
    return false;
  };

  useEffect(() => {
    const hasDataInStorage = checkStorageData();
    if (hasDataInStorage) {
      return;
    }

    fetchCharacterData(characterId!);
  }, [fetchCharacterData, characterId]);

  return null;
}

export default FetchCharacterDetails;
