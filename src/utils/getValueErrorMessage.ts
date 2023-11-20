import {VALUE_WARNING_PREFIX, CompareTypes} from '../constants';

export const getValueErrorMessage = (
  propertyName: string,
  value: number,
  compareType: CompareTypes,
) =>
  `${VALUE_WARNING_PREFIX} Property ${propertyName} cannot be ${compareType} ${
    compareType === CompareTypes.HIGHER || compareType === CompareTypes.LOWER
      ? 'than'
      : 'to'
  } ${value}`;
