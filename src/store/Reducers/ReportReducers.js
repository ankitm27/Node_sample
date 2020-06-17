import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    list:"",
    detail:"",
    success:false,
    dataTypes:"",
    fileUrl:"",
    graphTypes:"",
    sectionData:[],
    jsonData:"",
    fileData:"",
    data:"",
    isDataPresent:""
};

const ReportReducers = handleActions({
    GET_LIST:(state,action) => {
        return {...state,...action.payload}
    },
    ADD_NEW_FILE:(state,action) =>{
        return {...state,...action.payload}
    },
    FILE_DETAIL:(state,action) => {
        state = {list:"",detail:action.payload.detail};
        return state;
    },
    ADD_NEW_CHAPTER:(state,action) =>{
        return { ...state,...action.payload};
    },
    ADD_NEW_SECTION:(state,action) => {
        return {...state,...action.payload};
    },
    GET_DATA_TYPE:(state,action) => {
        return {...state,...action.payload};
    },
    ADD_DATA:(state,action) => {
        return { ...state,...action.payload};
    },
    UPLOAD_IMAGE:(state,action) => {
        return {...state,...action.payload}
    },
    GRAPH_TYPE:(state,action) => {
        return {...state,...action.payload}
    },
    VIEW_SECTION:(state,action) => {
        return {...state,...action.payload}
    },
    XML_DOWNLOAD:(state,action) => {
        state["fileData"] = action.payload;
        return state;
    },
    ADD_COST:(state,action) => {
        return {...state,...action.payload}
    },
    ON_SECTION_DELETE:(state,action) => {
        return {...state,...action.payload}
    },
    ON_CHAPTER_NAME_CHANGE:(state,action) => {
        return {...state,...action.payload}
    },
    ON_REPORT_NAME_CHANGE:(state,action) => {
        return {...state,...action.payload}
    },
    ON_DELETE_CLICK:(state,action) => {
        return {...state,...action.payload}
    },
    UPDATE_CHAPTER_NAME:(state,action) => {
        return {...state,...action.payload}
    },
    ON_CHAPTER_DELETE:(state,action) => {
        return {...state,...action.payload}
    },
    ADD_CLIENT:(state,action) => {
        return {...state,...action.payload}
    },
    GET_CLIENT:(state,action) => {
        return {...state,...action.payload}
    },
    DELETE_CLIENT:(state,action) => {
        return {...state,...action.payload}
    },
    SAVE_DATA_THROUGH_CSV:(state,action) => {
        return {...state,...action.payload}
    },
    ADD_TABLE_OF_CONTENT:(state,action) => {
        return {...state,...action.payload}
    },
    ADD_FORMULA_COST:(state,action) => {
        return {...state,...action.payload}
    },
    ADD_FULL_COST:(state,action) => {
        return {...state,...action.payload}
    },
    ADD_PDF:(state,action) => {
        return {...state,...action.payload}
    },
    ADD_PDF_SECTION_WISE:(state,action) => {
        return {...state,...action.payload}
    },
    DATA_EXIST:(state,action) => {
        return {...state,...action.payload}
    },
    COST:(state,action) => {
        return {...state,...action.payload}
    },
    SECTION_COST:(state,action) => {
        return {...state,...action.payload}
    }
},INITIAL_STATE);

export default ReportReducers;