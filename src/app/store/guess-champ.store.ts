import { Champ } from '@/models/types/champ.type';
import { InjectionToken } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type GuessChampState = {
  champs: Champ[];
};

const initialState: GuessChampState = {
  champs: [],
};

const GUESS_CHAMP_STATE = new InjectionToken<GuessChampState>(
  'GuessChampState',
  {
    factory: () => initialState,
  }
);

export const GuessChampStore = signalStore(
  withState(() => GUESS_CHAMP_STATE),
  withMethods((store) => ({
    setRandomChamps(allChamps: Champ[]): void {
      const randomChamps = allChamps
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      patchState(store, (state) => ({ ...state, champs: randomChamps }));
    },
    removeChamp(name: string): void {
      patchState(store, (state) => ({
        ...state,
        champs: JSON.parse(state.toString()).champs.filter(
          (champ: Champ) => champ.name !== name
        ),
      }));
    },
  }))
);
