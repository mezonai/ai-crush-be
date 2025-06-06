export class ObjectHelper {
  static removeUndefinedPropertiesFromObject<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => !!value)) as Partial<T>;
  }

  /**
   * Removes one or more keys from an object using TypeScript's Omit utility.
   * @param obj The object to process.
   * @param keysToRemove The keys to remove from the object.
   * @returns A new object with the specified keys removed.
   */
  static omitKeys<T extends object, K extends keyof T>(obj: T, ...keysToRemove: K[]): Omit<T, K> {
    const result = {} as Omit<T, K>;

    Object.keys(obj).forEach((key) => {
      if (!keysToRemove.includes(key as K)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (result as any)[key] = obj[key as keyof T];
      }
    });

    return result;
  }
}
