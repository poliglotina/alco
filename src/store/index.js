import { createStore } from 'easy-peasy';
import drinks from './drinks';

const model = { drinks };
export const store = createStore(model, { devTools: true });
