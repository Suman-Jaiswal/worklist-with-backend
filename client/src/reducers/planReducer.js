export const planReducer = (state, action) => {

    switch (action.type) {

        case 'ADD_PLAN':
            return {
                ...state,
                plans: [...state.plans,
                    action.payload
                ]
            }
        
        case 'ADD_TOPICS':
            return {
                ...state,
                topics: [...state.topics, ...action.payload],
            }
        

        case 'DELETE_PLAN':
            return {...state,
                plans: state.plans.filter(plan => plan._id !== action.id)
            }

        case 'DELETE_TOPIC':
            return {...state,
                topics: state.topics.filter(topic => topic._id !== action.id)
            }

        case 'GET_PLANS':
            return {
                ...state,
                plans: action.payload
            }

        case 'GET_TOPICS':
            return {
                ...state,
                topics: action.payload
            }

        default:
            return state;
    }
}