import { IMessageBase } from '../message-base';

export interface IElementsAdded extends IMessageBase {
  name: 'elements-added';
  elementIds: Array<sting>;
}
