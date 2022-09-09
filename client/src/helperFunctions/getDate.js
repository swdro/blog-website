const getDate = (dbDate) => {
    const dateClass = new Date(dbDate);
    const date = dateClass.getMonth() + 1 + '/' + dateClass.getDate() + '/' + dateClass.getFullYear();
    return date
}

export default getDate;