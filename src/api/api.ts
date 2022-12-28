import axios from 'axios';
import { TCharacters, TSingleCharacter } from '../models/TCharacters';

const baseUrl = 'https://swapi.dev/api/';

export async function getAllCharacters(currentPage: number) {
  let result: TCharacters[] = await axios
    .get(`${baseUrl}people/?page=${currentPage}`)
    .then((response) => {
      const extractedCharData: TCharacters[] = response.data.results.map(
        (char: TCharacters) => {
          const newCharacter: TCharacters = {
            id: '',
            name: char.name,
            species: char.species[0],
          };
          return newCharacter;
        }
      );
      return extractedCharData;
    })
    .catch((err) => {
      return err.message;
    });

  return result;
}

export async function getCharacter(id: string) {
  let result: TSingleCharacter = await axios
    .get(`${baseUrl}people/${id}`)
    .then((response) => {
      const data = response.data;
      const newCharacter = {
        id,
        name: data.name,
        height: data.height,
        hairColor: data.hair_color,
        skinColor: data.skin_color,
        eyeColor: data.eye_color,
        birthYear: data.birth_year,
        gender: data.gender,
        species: data.species[0],
      };
      return newCharacter;
    })
    .catch((err) => {
      return err.message;
    });

  return result;
}

export async function getSpecies(id: number) {
  let result: string = await axios
    .get(`${baseUrl}/species/${id}`)
    .then((response) => {
      return response.data.name;
    })
    .catch((err) => {      
      return 'n/a';
    });
  return result;
}
