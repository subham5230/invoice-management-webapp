export const changeRow = data => ({
    type: 'ChangeRows',
    data: data
})

export const selectRow = data => ({
    type: 'SelectRows',
    data: data
})

export const getSearch = data => ({
    type: 'GetSearch',
    data: data
})

export const startCount = data => ({
    type: 'RowCount',
    data: data
})

export const moreData = data => ({
    type: 'HasMore',
    data: data
})

export const doSort = data => ({
    type: 'SortOrder',
    data: data
})

export const orderBy = data => ({
    type: 'SortBy',
    data: data
})

export const searchVal = data => ({
    type: 'SearchVal',
    data: data
})

export const getData = data => ({
    type:'GotData',
    data: data
})

export const visited = data => ({
    type:'Visited',
    data: data
})