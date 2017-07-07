
import { Location } from 'history';
import { Match } from './Match';

export type Matcher<Params = any> = (location: Location) => Match<Params>;
