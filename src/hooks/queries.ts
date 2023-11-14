import { DocumentNode, gql, useQuery } from '@apollo/client';
import { dataType } from '../Types';

export const useAllFilms = () =>
  useQuery(gql`
    {
      allFilms {
        edges {
          node {
            id
            title
            episodeID
            releaseDate
            director
            producers
          }
        }
      }
    }
  `);

const Queries = {
  [dataType.FILM]: gql`
    query GetFilm($id: ID!) {
      film(id: $id) {
        id
        title
        episodeID
        releaseDate
        director
        producers
        openingCrawl
        characterConnection {
          characters {
            id
            name
          }
        }
        vehicleConnection {
          vehicles {
            id
            name
          }
        }
        # @TODO
        # planetConnection?: Maybe<FilmPlanetsConnection>;
        # speciesConnection?: Maybe<FilmSpeciesConnection>;
        # starshipConnection?: Maybe<FilmStarshipsConnection>;
      }
    }
  `,
  [dataType.PERSON]: gql`
    query GetPerson($id: ID!) {
      person(id: $id) {
        id #: Scalars['ID'];
        name #?: Maybe<Scalars['String']>;
        birthYear #?: Maybe<Scalars['String']>;
        gender #?: Maybe<Scalars['String']>;
        eyeColor #?: Maybe<Scalars['String']>;
        hairColor #?: Maybe<Scalars['String']>;
        height #?: Maybe<Scalars['Int']>;
        mass #?: Maybe<Scalars['Float']>;
        skinColor #?: Maybe<Scalars['String']>;
        homeworld {
          id
          name
        }
        species {
          id
          name
        }
        filmConnection {
          films {
            id
            title
            episodeID
          }
        }
        vehicleConnection {
          vehicles {
            id
            name
          }
        }

        #starshipConnection?: Maybe<PersonStarshipsConnection>;
      }
    }
  `,
  [dataType.VEHICLE]: gql`
    query GetVehicle($id: ID!) {
      vehicle(id: $id) {
        id
        # The model or official name of this vehicle. Such as "All-Terrain Attack Transport".
        model
        # The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".
        name
        # The class of this vehicle, such as "Wheeled" or "Repulsorcraft".
        vehicleClass

        cargoCapacity
        consumables
        costInCredits
        crew
        length
        manufacturers
        maxAtmospheringSpeed
        passengers
        filmConnection {
          films {
            id
            title
            episodeID
          }
        }
        #pilotConnection?: Maybe<VehiclePilotsConnection>;
      }
    }
  `,
} as { [key in dataType]: DocumentNode };

export const useDataQuery = (selectedType: dataType, id: string) => {
  return useQuery(Queries[selectedType], { variables: { id } });
};
export const useFilm = (id: string) =>
  useQuery(
    gql`
      query GetFilm($id: ID!) {
        film(id: $id) {
          characterConnection {
            characters {
              id
              name
            }
          }
          #created
          #director
          #edited?: Maybe<Scalars['String']>;
          #/** The episode number of this film. */
          episodeID
          id
          #/** The opening paragraphs at the beginning of this film. */
          openingCrawl
          #planetConnection?: Maybe<FilmPlanetsConnection>;
          #/** The name(s) of the producer(s) of this film. */
          #producers
          # /** The ISO 8601 date format of film release at original creator country. */
          #releaseDate
          # speciesConnection?: Maybe<FilmSpeciesConnection>;
          # starshipConnection?: Maybe<FilmStarshipsConnection>;
          # /** The title of this film. */
          title
          # vehicleConnection?: Maybe<FilmVehiclesConnection>;
        }
      }
    `,
    { variables: { id } },
  );
export const usePerson = () => {};
