import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import * as moment from 'moment';

export function IsDateGreaterThanOrEqualDate(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'DateGreaterThanOrEqualDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const relatedValue = (args.object as any)[relatedPropertyName];

          if (relatedValue === undefined || value === undefined) {
            return false;
          }

          const relatedDate = moment(relatedValue);
          const valueDate = moment(value);

          return valueDate.isSameOrAfter(relatedDate);
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${propertyName} must be greater than or equal to ${relatedPropertyName}`;
        },
      },
    });
  };
}
