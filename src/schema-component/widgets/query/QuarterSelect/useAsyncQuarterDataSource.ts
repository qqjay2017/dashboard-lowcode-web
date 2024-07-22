



export const useAsyncQuarterDataSource = (cur) => (field) => {

    if (field?.componentProps?.defaultCurrentQuarter && cur) {
        field.value = cur
    }


}