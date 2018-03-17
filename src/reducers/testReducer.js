const initialState = {
  test: `testing 123`
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
}