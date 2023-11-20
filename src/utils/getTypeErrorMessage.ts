import {TYPE_ERROR_PREFIX, DataTypes} from '../constants';

export const getTypeErrorMessage = (
  propertyName: string,
  propertyType: DataTypes,
) =>
  `${TYPE_ERROR_PREFIX} Property ${propertyName} must be ${propertyType} value!`;
