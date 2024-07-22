



export const useAsyncProjectDataSource = (projectList, firstProject) => (field) => {
    field.dataSource = projectList
    field.value = firstProject

}