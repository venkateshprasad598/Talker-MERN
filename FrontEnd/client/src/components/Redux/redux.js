const initialState = {
  chatId: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHATID":
      return { ...state.chatId, chatId: action.id };
  }
  return state;
};
