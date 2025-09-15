import { create } from "zustand";

export const useSumonnerStore = create((set) => ( {
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
    }
}))