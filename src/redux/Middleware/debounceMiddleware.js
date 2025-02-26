import debounce from "lodash.debounce";

const debounceMiddleware = ({ dispatch }) => {
  const debouncedThunks = {};

  return (next) => (action) => {
    if (action.type.endsWith("/pending")) {
      // Identify the async thunk call by its 'pending' action type
      const { type, meta } = action;
      const thunkKey = `${type}_${meta.requestId}`;

      if (debouncedThunks[thunkKey]) {
        // If the debounced call exists, cancel it
        debouncedThunks[thunkKey].cancel();
      }

      // Create a new debounced call with a specified delay (e.g., 1000 milliseconds)
      debouncedThunks[thunkKey] = debounce(() => {
        // Dispatch the debounced thunk action
        next(action);
      }, 1000); // Adjust the delay as needed

      // Call the debounced function
      debouncedThunks[thunkKey]();
    } else {
      // For non-'pending' actions, pass them through
      next(action);
    }
  };
};

export default debounceMiddleware;
