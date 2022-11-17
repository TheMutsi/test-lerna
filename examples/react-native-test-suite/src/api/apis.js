import axios from 'axios';
import {BASE_URL, API_VERSION} from './config';

export const getPokemonWithFetch = async () =>
  await fetch(`${BASE_URL}${API_VERSION}pokemon/ditto`)
    .then(function (response) {
      console.log(`${BASE_URL}${API_VERSION}pokemon/ditto RESPONSE`);
      return response.json();
    })
    .catch(function (error) {
      console.log(`${BASE_URL}${API_VERSION}pokemon/ditto ERROR`, error);
    });

export const getPokemonWithAxios = async () =>
  axios
    .get(`${BASE_URL}${API_VERSION}pokemon/mew`, {
      params: {hola: 'hola'},
    })
    .then(function (response) {
      // console.log(`${BASE_URL}${API_VERSION}pokemon/ditto RESPONSE`);
      console.log(
        '--------------------------------RESP---------------------------------',
      );

      return response.data;
    })
    .catch(function (error) {
      // console.log(`${BASE_URL}${API_VERSION}pokemon/ditto ERROR`, error);
    });
