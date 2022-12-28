import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import DisplayCharacters from './components/DisplayCharacters/DisplayCharacters';
import DisplaySingleCharacter from './components/DisplayCharacter/DisplayCharacter';
import Header from './components/Header/Header';
import { TCharacters } from './models/TCharacters';
import FetchCharacterData from './components/FetchCharacterData/FetchCharacterData';

const defaultCharacterList: TCharacters[] = [];

function App() {
  const [characterList, setCharacterList] = useState(defaultCharacterList);
  const [isDataLoaded, setDataIsLoaded] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [spiecesId, setSpiecesId] = useState(0);

  const handleResponse = (
    characterData: TCharacters[],
    isFetchCompleted: boolean,
    errorMessage: string
  ) => {
    if (!isFetchCompleted) {
      setFetchError(errorMessage);
      return;
    } else {
      setCharacterList(characterData);
      setDataIsLoaded(isFetchCompleted);
    }
  };

  const onRetrieveSpiecesId = (id: number) => {
    setSpiecesId(id);
  };

  return (
    <div className="star-wars-app">
      <FetchCharacterData onHandleResponse={handleResponse} />
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <DisplayCharacters
                characterListState={characterList}
                hasLoadedData={isDataLoaded}
                onError={fetchError}
                sendSpeciesId={onRetrieveSpiecesId}
              />
            }
          />
          <Route
            path="/character/:id"
            element={<DisplaySingleCharacter speciesId={spiecesId} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
