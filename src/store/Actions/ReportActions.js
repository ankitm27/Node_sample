import {
    createAction
} from "redux-actions";

import axios from 'axios';

import {
    BACKEND_URL
} from '../../config.js';
import { create } from "domain";

const GET_LIST = createAction("GET_LIST");
const ADD_NEW_FILE = createAction("ADD_NEW_FILE");
const FILE_DETAIL = createAction("FILE_DETAIL");
const ADD_NEW_CHAPTER = createAction("ADD_NEW_CHAPTER");
const ADD_NEW_SECTION = createAction("ADD_NEW_SECTION");
const GET_DATA_TYPE = createAction("GET_DATA_TYPE");
const ADD_DATA = createAction("ADD_DATA");
const UPLOAD_IMAGE = createAction("UPLOAD_IMAGE");
const GRAPH_TYPE = createAction("GRAPH_TYPE");
const VIEW_SECTION = createAction("VIEW_SECTION");
const XML_DOWNLOAD = createAction("XML_DOWNLOAD");
const ADD_COST = createAction("ADD_COST");
const ON_SECTION_DELETE = createAction("ON_SECTION_DELETE");
const ON_CHAPTER_NAME_CHANGE = createAction("ON_CHAPTER_NAME_CHANGE");
const ON_REPORT_NAME_CHANGE = createAction("ON_REPORT_NAME_CHANGE");
const ON_DELETE_CLICK = createAction("ON_DELETE_CLICK");
const UPDATE_CHAPTER_NAME = createAction("UPDATE_CHAPTER_NAME");
const ON_CHAPTER_DELETE = createAction("ON_CHAPTER_DELETE");
const ADD_CLIENT = createAction("ADD_CLIENT");
const GET_CLIENT = createAction("GET_CLIENT");
const DELETE_CLIENT = createAction("DELETE_CLIENT");
const SAVE_DATA_THROUGH_CSV = createAction("SAVE_DATA_THROUGH_CSV");
const ADD_TABLE_OF_CONTENT = createAction("ADD_TABLE_OF_CONTENT");
const ADD_FORMULA_COST = createAction("ADD_FORMULA_COST");
const ADD_FULL_COST = createAction("ADD_FULL_COST");
const ADD_PDF = createAction("ADD_PDF");
const ADD_PDF_SECTION_WISE = createAction("ADD_PDF_SECTION_WISE");
const DATA_EXIST = createAction("DATA_EXIST");
const COST = createAction("COST");
const SECTION_COST = createAction("SECTION_COST");

export const getList = values => dispatch => {
    return axios.get(
        BACKEND_URL + "/v1/admin/report/getReportList", {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(GET_LIST(res.data.data))
    }).catch((err) => {
        dispatch(GET_LIST({
            success: false,
            msg: "There is some problem, Please try after some time"
        }))
    })
};

export const addNewReport = values => dispatch => {
    return axios.post(
        BACKEND_URL + '/v1/admin/report/addnewreport', {
            name: values.name
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ADD_NEW_FILE(res.data.data))
    }).catch((err) => {
        dispatch(ADD_NEW_FILE({
            success: false,
            msg: "There is some problem, Please try after some time"
        }));
    })
}

export const fileDetail = values => dispatch => {
    return axios.get(
        BACKEND_URL + "/v1/admin/report/detail?reportId=" + values._id, {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(FILE_DETAIL(res.data.data))
    })
}

export const addNewChapter = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/report/chapter/add", {
            reportId: values.reportId,
            chapterName: values.chapterName,
            chapterType: values.chapterType
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ADD_NEW_CHAPTER(res.data.data));
    }).catch((err) => {
        dispatch(ADD_NEW_CHAPTER({
            success: false,
            msg: "There is some problem, Please try after some time"
        }));
    })
}

export const addNewSection = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/report/section/add", {
            reportId: values.reportId,
            chapterId: values.chapterId,
            sectionName: values.sectionName,
            sectionType: values.sectionType
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ADD_NEW_SECTION(res.data.data));
    }).catch((err) => {
        dispatch(ADD_NEW_SECTION({
            success: false,
            msg: "There is some problem, Please try after some time"
        }));
    })
}

export const getDataType = values => dispatch => {
    return axios.get(
        BACKEND_URL + "/v1/admin/data/datatypes", {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(GET_DATA_TYPE(res.data.data));
    }).catch((err) => {
        dispatch(GET_DATA_TYPE({
            success: false,
            msg: "There is some problem, Please try after some time"
        }));
    })
}

export const addData = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/data/addData", {
            'reportId': values.reportId,
            'sectionId': values.sectionId,
            'dataType': values.dataType,
            'data': {
                title: values.heading,
                description: values.description,
                dataObj: values.dataObj,
                source:values.source
            },
            'subDataType': values.subDataType,
            'chapterId': values.chapterId
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ADD_DATA(res.data.data));
    }).catch((err) => {
        dispatch(ADD_DATA({
            success: false,
            msg: "There is some problem, Please try after some time"
        }))
    })
}

export const uploadImage = values => dispatch => {
    const formData = new FormData();
    formData.append('image', values.image);
    formData.append('type', values.type);
    return axios.post(
        BACKEND_URL + "/v1/admin/data/upload/image", formData, {
            headers: {
                token: localStorage.getItem("token"),
                "content-type": 'multipart/form-data'
            }
        }
    ).then((res) => {
        dispatch(UPLOAD_IMAGE(res.data.data));
    }).catch((err) => {
        dispatch(UPLOAD_IMAGE({
            success: false,
            msg: "There is some problem, Please try after some time"
        }))
    })
}

export const graphTypes = values => dispatch => {
    return axios.get(
        BACKEND_URL + "/v1/admin/data/graphtypes", {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(GRAPH_TYPE(res.data.data));
    }).catch((err) => {
        dispatch(GRAPH_TYPE({
            success: false,
            msg: "There is some problem, Please try after some time"
        }))
    })
}

export const viewSection = values => dispatch => {
    return axios.get(
        BACKEND_URL + "/v1/admin/data/viewsection?sectionId=" + values.sectionId, {
            headers: {
                token: localStorage.getItem("token"),
                // responseType: "blob"
            }
        }
    ).then((res) => {
        dispatch(VIEW_SECTION(res.data.data));
    }).catch((err) => {
        dispatch(VIEW_SECTION({
            success: false,
            msg: "There is some problem, Please try after some time"
        }))
    })
}

export const XMLDownload = values => dispatch => {
    return axios.get(
        BACKEND_URL + "/v1/client/getxmldata?sectionId=" + values.sectionId, {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(XML_DOWNLOAD(res.data));
    }).catch((err) => {
        dispatch(XML_DOWNLOAD({
            success: false,
            msg: "There is some problem, Please try after some time"
        }))
    })
}

export const addCost = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/report/section/addCost", {
            sectionId: values.sectionId,
            cost: values.cost,
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
    dispatch(ADD_COST(res.data));
}).catch((err) => {
    dispatch(ADD_COST({
        success: false,
        msg: "There is some problem, Please try after some time"
    }))
})
}

export const onSectionDelete = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/report/section/delete",{
            reportId:values.reportId,
            sectionId:values.sectionId
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ON_SECTION_DELETE(res.data));
    }).catch((err) => {
        dispatch(ON_SECTION_DELETE({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
}

export const onChapterNameChange = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/report/section/update",{
            reportId:values.reportId,
            sectionId:values.sectionId,
            newSectionName:values.chapterName
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ON_CHAPTER_NAME_CHANGE(res.data));
    }).catch((err) => {
        dispatch(ON_CHAPTER_NAME_CHANGE({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
}

export const onReportNameChange = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/report/update",{
            reportId:values.reportId,
            reportName:values.newReportName
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ON_REPORT_NAME_CHANGE(res.data));
    }).catch((err) => {
        dispatch(ON_REPORT_NAME_CHANGE({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
};

export const onDeleteClick = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/report/delete",{
            reportId:values.reportId
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ON_DELETE_CLICK(res.data))
    }).catch((err) => {
        dispatch(ON_DELETE_CLICK({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
}

export const updateChapterName = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/report/chapter/update",{
            chapterId:values.chapterId,
            newChapterName:values.chapterName
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(UPDATE_CHAPTER_NAME(res.data))
    }).catch((err) => {
        dispatch(UPDATE_CHAPTER_NAME({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
}

export const onChapterDelete = values => dispatch => {
    return axios.post(
        BACKEND_URL +  "/v1/admin/report/chapter/delete",{
            chapterId:values.chapterId
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ON_CHAPTER_DELETE(res.data))
    }).catch((err) => {
        dispatch(ON_CHAPTER_DELETE({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
}

export const addClient = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/account",{
            "email":values.email
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ADD_CLIENT(res.data))
    }).catch((err) => {
        dispatch(ADD_CLIENT({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
}

export const getClient = values => dispatch => {
    return axios.get(
        BACKEND_URL + "/v1/admin/account",{
            headers:{
                token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(GET_CLIENT(res.data))
    }).catch((err) => {
        dispatch(GET_CLIENT({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
}

export const deleteClient = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/account/updateaccount",{
            _id:values._id,
            isActive:values.isActive
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(DELETE_CLIENT(res.data))
    }).catch((err) => {
        dispatch(DELETE_CLIENT({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
}

export const addDataThroughCSV = values => dispatch => {
    // return axios.post(
    //     BACKEND_URL + "/v1/"
    // )
    dispatch(SAVE_DATA_THROUGH_CSV("check"));
}

export const addTableOfContent = values => dispatch => {
    const formData = new FormData();
    formData.append('file',values.file);
    formData.append('date',values.date);
    formData.append("description",values.description);
    formData.append("tag",values.tag);
    return axios.post(
        BACKEND_URL + "/v1/admin/report/addnewreportbycsv",formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ADD_TABLE_OF_CONTENT(res.data));
    }).catch((err) => {
        dispatch(ADD_TABLE_OF_CONTENT(err));
    })
}

export const addFormulaCost = values => dispatch => {
    dispatch(ADD_FORMULA_COST("check"));
}

export const addFullCost = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/report/addCost", {
            reportId: values.reportId,
            pricing: values.cost,
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
    dispatch(ADD_FULL_COST(res.data));
}).catch((err) => {
    dispatch(ADD_FULL_COST({
        success: false,
        msg: "There is some problem, Please try after some time"
    }))
})
}

export const addPDF = values => dispatch => {
    const formData = new FormData();
    formData.append("file",values.PDF);
    formData.append("reportId",values.reportId);
    return axios.post(
        BACKEND_URL + "/v1/admin/report/uploadpdf",formData,
            {
                headers:{
                    token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ADD_PDF(res.data));
    }).catch((err) => {
        dispatch(ADD_PDF({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
}

export const addPDFSectionWise = values => dispatch => {
    const formData = new FormData();
    formData.append("file",values.sectionWisePDF);
    formData.append("reportId",values.reportId);
    return axios.post(
        BACKEND_URL + "/v1/admin/report/uploadpdfbysection",formData,{
            headers:{
                token:localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(ADD_PDF_SECTION_WISE(res.data));
    }).catch((err) => {
        dispatch(ADD_PDF_SECTION_WISE({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
}

export const dataExist = values => dispatch => {
    return axios.get(
        BACKEND_URL + "/v1/admin/report/dataexist?reportId=" + values.reportId,{
            headers:{
                token:localStorage.getItem("token")
            }
        }  
    ).then((res) => {
        dispatch(DATA_EXIST(res.data))
    }).catch((err) => {
        dispatch(DATA_EXIST({
            success:false,
            msg:"There is some problem, Please try after some time"
        }))
    })
}

export const cost = values => dispatch => {
    return axios.get(
        BACKEND_URL + "/v1/admin/report/cost?reportId=" + values.reportId, {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(COST(res.data.data))
    }).catch((err) => {
        dispatch(COST({
            success: false,
            msg: "There is some problem, Please try after some time"
        }))
    })
};

export const sectionCost = values => dispatch => {
    return axios.get(
        BACKEND_URL + "/v1/admin/report/sectioncost?sectionId=" + values.sectionId ,{
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(SECTION_COST(res.data.data))
    }).catch((err) => {
        dispatch(SECTION_COST({
            success: false,
            msg: "There is some problem, Please try after some time"
        }))
    })
};





