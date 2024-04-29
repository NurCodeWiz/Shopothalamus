const GET_ALL_USERS = '/getUsers'
const GET_USER_BY_ID = '/getUserById'

// ACTION TYPE
const getAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        users
    }

}
const getUserById = (userId)=>{
    return {
        type:GET_USER_BY_ID,
        userId

    }
}

// THUNKS

// get all users thunk
export const getAllUsersThunk = () => async (dispatch) => {
    const response = await fetch(`/api/users/`)
    if(!response.ok){
        throw new Error ('Failed to get all users.')
    }
    const data = await response.json()
    dispatch(getAllUsers(data))
}
export const getUserByIdThunk = (userId) => async(dispatch) =>{
    const response = await fetch(`/api/users/${userId}`)
    if(!response.ok){
        throw new Error ('Failed to get user by Id.')
    }
    const data = await response.json()
    dispatch(getUserById(data))

}



// REDUCER
function userReducer(state={}, action){
    switch(action.type){
        case GET_ALL_USERS: {
            return {...state, users: action.users}
        }
        case GET_USER_BY_ID:{
            return {...state, users:action.users.user_id}
        }
        default:
            return state
    }
}

export default userReducer
