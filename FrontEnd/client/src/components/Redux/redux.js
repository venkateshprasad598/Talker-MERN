const initialState = {
  chatId: null,
  isMessageRealTime: true,
  isAddRealTime: true,
  showChat: true,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ChangeChatId":
      return { ...state, chatId: action.newChatId };
    case "CHATID":
      return { ...state, chatId: action.id, showChat: action.showChat };
    case "REALTIME":
      return { ...state, isMessageRealTime: action.realTimeMsg };
    case "REALTIMEADD":
      return { ...state, isAddRealTime: action.add };
  }

  return state;
};
