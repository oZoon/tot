class Records {
    setRecord(key, record) {
        localStorage.setItem(key, JSON.stringify(record));
    }
    getRecord(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

export default Records;
