export type ValidationFuncs<T> = ((v: T) => string | void)[];

export const getValidationMessage = <T>(funcs: ValidationFuncs<T>) => (value: T) => {
    for (const fn of funcs) {
      const errMsg = fn(value);
      if (errMsg) {
        return errMsg;
      }
    }
    
  };
