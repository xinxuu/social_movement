const State = {
    user: {}
};

export default (state = State,action)=> {
    if(action.type === "change_user") {
        const newState = JSON.parse(JSON.stringify(state));
        newState.user = action.user;
        return newState;
    }
    return state;
};

