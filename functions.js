const fs = require('fs');

exports.addFile = (data) => { 
    fs.writeFileSync(`src/${data}.json`, '');
    return `${data}.json created!`;
}

exports.getFile = () => {
    let data = [];

    fs.readdirSync('./src/').forEach(file => data.push(file));

    return data;
}

exports.deleteFile = (data) => {
    fs.unlinkSync(`./src/${data}.json`);
    return `${data}.json deleted!`;
}

exports.renameFile = (lama, baru) => {
    fs.renameSync(`./src/${lama}.json`, `./src/${baru}.json`);
    return `${lama}.json renamed to ${baru}.json!`;
}

exports.readFile = (data) => {
    const read = JSON.parse(fs.readFileSync(`./src/${data}.json`, 'utf8'));
    return read;
}

exports.writeInFile = (name, data) => {
    let exists = this.readFile(name);

    let lastId = exists.data[exists.data.length - 1].id;
    let id = exists.data.length++;

    while (id <= lastId) {
        id++;
    }
    
    Object.assign(data, { id });

    exists.data.push(data);

    let obj = {};
    obj.data = exists.data.filter(val => Object.values(val).length !== 0);
    
    fs.writeFileSync(`./src/${name}.json`, JSON.stringify(obj), (err) => {
        if (err) throw err;
    });

    return 'new data added!';

}

exports.editFile = (name, id, data) => {
    let exists = this.readFile(name);

    id = parseInt(id);

    let curr = exists.data.filter(item => item.id == id);

    if (curr.length === 0) {
        return 'data tidak ditemukan';
    }

    const index = exists.data.findIndex(item => item.id === id);

    exists.data[index] = { ...data, id };
    
    fs.writeFileSync(`./src/${name}.json`, JSON.stringify(exists), (err) => {
        if (err) throw err;
    });

    return 'data updated!';

}

exports.deleteData = (name, id) => {
    let exists = this.readFile(name);

    id = parseInt(id);

    let obj = {};
    obj.data = exists.data.filter(item => item.id !== id);

    fs.writeFileSync(`./src/${name}.json`, JSON.stringify(obj), (err) => {
        if (err) throw err;
    });

    return 'data deleted!';

}