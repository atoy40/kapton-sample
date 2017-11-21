export default event => {
    if (event.data.age !== undefined && event.data.age < 18) {
        return { error: 'age must be greater than 18 year old.' }
    }

    return {data: event.data}
}