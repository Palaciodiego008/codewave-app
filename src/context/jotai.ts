import { atom } from 'jotai';
import {atomWithStorage} from 'jotai/utils'
;


export const projectSelectedFromRecommendation = atom<{
  project?: any | null;
  checkboxes?: { [label: string]: boolean };
  recommendations: any | null;
}>({
  project: null,
  checkboxes: {},
  recommendations: null
});
