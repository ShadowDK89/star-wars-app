import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { TSingleCharacter } from '../../models/TCharacters';
import FetchCharacterDetails from '../FetchCharacterDetails/FetchCharacterDetails';
import './DisplayCharacter.scss';

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

type TDisplayCharaterProps = {
  speciesId: number;
};

function DisplayCharacter({ speciesId }: TDisplayCharaterProps) {
  let { id } = useParams();
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [character, setCharacter] = useState(defaultCharacter);

  const handleDetailsResponse = (
    characterData: TSingleCharacter,
    isResponseComplete: boolean,
    errorMessage: string
  ) => {
    if (!isResponseComplete) {
      setError(errorMessage);
      return;
    } else {
      setCharacter(characterData);
      setIsLoaded(isResponseComplete);
    }
  };

  const characterHtml = (
    <React.Fragment>
      <h2 className='star-wars__details--heading'>{character.name}</h2>
      <div className="star-wars__details--info">
        <div>
          <p>
            Birth year: <span>{character.birthYear}</span>
          </p>
          <p>
            Gender: <span>{character.gender}</span>
          </p>
          <p>
            Height: <span>{character.height}</span> cm
          </p>
          <p>
            Species:{' '}
            <span>{character.species ? character.species : 'Human'}</span>
          </p>
        </div>
        <div>
          <p>
            Skin color: <span>{character.skinColor}</span>
          </p>
          <p>
            Hair color: <span>{character.hairColor}</span>
          </p>
          <p>
            Eye color: <span>{character.eyeColor}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <FetchCharacterDetails
        characterId={id!}
        speciesId={speciesId}
        onHandleDetailsData={handleDetailsResponse}
      />
      <section className="star-wars__details">
        <Link to="/" className="star-wars__details--back-btn">
          {'<-'}Back to list
        </Link>
        {error && (
          <div className="star-wars__error-message star-wars__error-details">
            <h2>{error}</h2>
          </div>
        )}
        {!isLoaded && (
          <div className="star-wars__loading">
            <h2>
              Accessing information <br />
              please wait...
            </h2>
          </div>
        )}
        {character.name !== '' ? (
          <div className="star-wars__details--container">{characterHtml}</div>
        ) : (
          ''
        )}
      </section>
    </React.Fragment>
  );
}

export default DisplayCharacter;
