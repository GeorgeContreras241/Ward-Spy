"use client"
import { create } from "zustand";

export const useSumonnerStore = create((set) => ({
    matchs: [],
    perks: null,
    itemsInfo: null,
    errorCounter: null,
    error: null,
    dataPuuid: null,
    dataNameTag: null,
    dataSumonner: null,
    urlListChamp: null,
    urlListSpell: null,
    version: "",
    loading: false,
    setUrlListChamp: (url) => {
        set({ urlListChamp: url })
    },
    setUrlListSpell: (url) => {
        set({ urlListSpell: url })
    },
    setVersion: (version) => {
        set({ version: version })
    },
    setLoading: (loading) => {
        set({ loading: loading })
    },
    setDataNameTag: (data) => {
        set({ dataNameTag: data })
    },
    setDataSumonner: (data) => {
        set({ dataSumonner: data })
    },
    setDataPuuid: (data) => {
        set({ dataPuuid: data })
    },
    setError: (error) => {
        set({ error: error })
    },
    setErrorCounter: (errorCounter) => {
        set({ errorCounter: errorCounter })
    },
    setItemsInfo: (itemsInfo) => {
        set({ itemsInfo: itemsInfo })
    },
    setMatchs: (newMatchs) => {
        set((state) => ({ matchs: [...state.matchs, ...newMatchs] }))
    },
    setNewMatchs: (newMatchs) => { 
        set({ matchs: newMatchs })
    },
    setPerks: (perks) => {
        set({ perks: perks })
    }
}))