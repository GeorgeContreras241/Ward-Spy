import { create } from "zustand";

export const useSumonnerStore = create((set) => ( {
    errorCounter : null,
    error: null,
    dataPuuid: null,
    dataNameTag: null,
    dataSumonner: null,
    urlListChamp: null,
    urlListSpell: null,
    version: "",
    loading: false,
    seturlListChamp: (url) => { 
        set( {urlListChamp: url} )
    },
    seturlListSpell: (url) => {
        set( {urlListSpell: url} )
    },
    setVersion: (version) => {
        set( {version: version} )
    },
    setLoading: (loading) => {
        set( {loading: loading} )
    },
    setDataNameTag: (data) => {
        set( {dataNameTag: data} )
    },
    setDataSumonner: (data) => {
        set( {dataSumonner: data} )
    },
    setDataPuuid: (data) => {
        set( {dataPuuid: data} )
    },
    setError: (error) => {
        set({ error : error})
    },
    setErrorCounter : (errorCounter) => {
        set({ errorCounter : errorCounter})
    }
}))