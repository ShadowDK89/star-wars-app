import { ChangeEvent, useEffect, useState } from 'react';
import { TCharacters } from '../../models/TCharacters';
import loadingImg from '../../assets/img/darth-vader.png';
import SpeciesLogos from '../UI/SpeciesLogos';
import './DisplayCharacters.scss';
import { Link } from 'react-router-dom';

type TDisplayCharatersProps = {
  characterListState: TCharacters[];
  hasLoadedData: boolean;
  onError: string;
  sendSpeciesId: (id: number) => void;
};

const defaultCharacterList: TCharacters[] = [];

function DisplayCharacters({
  sendSpeciesId,
  characterListState,
  hasLoadedData,
  onError,
}: TDisplayCharatersProps) {
  const [filteredCharacterList, setFilteredCharacterList] =
    useState(defaultCharacterList);

  useEffect(() => {
    setFilteredCharacterList(characterListState);
  }, [characterListState]);

  const retrieveSpiecesId = (speciesUrl: string) => {
    let speciesNumber = 1;
    if (speciesUrl !== undefined) {
      const findId = speciesUrl.split('/').find((el) => parseInt(el));
      speciesNumber = parseInt(findId!);
    }
    return speciesNumber;
  };

  const onSendingSpeciesId = (speciesId: number) => {
    sendSpeciesId(speciesId);
  };

  const filterCharactersHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const speciesValue = event.target.value;
    setFilteredCharacterList(
      characterListState.filter((char) => {
        if (
          retrieveSpiecesId(char.species) === parseInt(speciesValue) ||
          parseInt(speciesValue) === 0
        ) {
          return true;
        }
        return false;
      })
    );
  };

  return (
    <section className="star-wars__container">
      <select onChange={filterCharactersHandler}>
        <option value="0">Show All</option>
        <option value="1">Human</option>
        <option value="2">Droid</option>
        <option value="3">Wookie</option>
        <option value="4">Rodian</option>
        <option value="5">Hutt</option>
        <option value="6">Yoda's species</option>
        <option value="7">Trandoshan</option>
        <option value="8">Mon Calamari</option>
        <option value="9">Ewok</option>
        <option value="10">Sullustan</option>
      </select>
      {!hasLoadedData && !onError ? (
        <div className="star-wars__loading">
          <img
            className="star-wars__loading--img"
            src={loadingImg}
            alt="Darth Vader"
          />{' '}
          <p>Translating data, please wait...</p>
        </div>
      ) : (
        ''
      )}
      <ul className="star-wars__list">
        {hasLoadedData && !onError ? (
          filteredCharacterList.map((char) => {
            let speciesNumber = retrieveSpiecesId(char.species);

            return (
              <Link
                className="star-wars__list--item-link"
                to={`/character/${char.id}`}
                key={`${char.id} - ${char.name}`}
                onClick={() => {
                  onSendingSpeciesId(speciesNumber);
                }}
              >
                <li className="star-wars__list--item">
                  <SpeciesLogos species={speciesNumber} />
                  <p className="star-wars__list--item-name">
                    Nr {char.id}: {char.name}
                  </p>
                </li>
              </Link>
            );
          })
        ) : (
          <h2 className="star-wars__error-message">{onError}</h2>
        )}
      </ul>
    </section>
  );
}

export default DisplayCharacters;
