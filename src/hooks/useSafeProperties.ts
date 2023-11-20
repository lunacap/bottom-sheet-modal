import {useEffect} from 'react';

import {getTypeErrorMessage, getValueErrorMessage} from '../utils';
import {CompareTypes, DataTypes} from '../constants';

export type TypeSafety = {
  propertyType: DataTypes;
};

export type ValueSafety = {
  compareValue: number;
  compareType: CompareTypes;
};

export type SafeProperty = {
  propertyValue: unknown;
  propertyName: string;
  typeSafety?: TypeSafety;
  valueSafety?: Array<ValueSafety>;
};

export const useSafeProperties = (properties: Array<SafeProperty>) => {
  useEffect(() => {
    for (const {
      propertyName,
      propertyValue,
      typeSafety,
      valueSafety,
    } of properties) {
      if (typeSafety) {
        const {propertyType} = typeSafety;
        if (
          propertyValue !== undefined &&
          propertyValue !== null &&
          typeof propertyValue !== propertyType
        ) {
          throw new Error(
            getTypeErrorMessage(propertyName, typeSafety.propertyType),
          );
        }
      }

      if (valueSafety && valueSafety.length > 0) {
        for (const {compareType, compareValue} of valueSafety) {
          const isWarningNeeded =
            propertyValue !== undefined &&
            propertyValue !== null &&
            (compareType === CompareTypes.HIGHER
              ? propertyValue > compareValue
              : compareType === CompareTypes.LOWER
              ? propertyValue < compareValue
              : propertyValue !== compareValue);
          if (isWarningNeeded) {
            throw new Error(
              getValueErrorMessage(propertyName, compareValue, compareType),
            );
          }
        }
      }
    }
  }, [...properties]);
};
