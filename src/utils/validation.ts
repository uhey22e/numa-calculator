export type ValidationFuncs<T> = ((v: T) => string | void)[];

export const getValidationMessage = <T>(funcs: ValidationFuncs<T>) => {
  return (value: T) => {
    for (let fn of funcs) {
      const errMsg = fn(value);
      if (errMsg) {
        return errMsg;
      }
    }
    return;
  };
};
