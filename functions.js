const fs = require('fs');

exports.addFile = (data) => {
    if (fs.existsSync(`src/${data}.json`)) {
        return `${data}.json already exists!`;
    }

    fs.writeFileSync(`src/${data}.json`, JSON.stringify({
        data: []
    }));

    return `${data}.json created!`;
}

exports.getFile = () => {
    let data = [];

    fs.readdirSync('./src/').forEach(file => data.push(file));

    return data;
}

exports.deleteFile = (data) => {
    if (!fs.existsSync(`./src/${data}.json`)) {
        return `${data}.json doesn't exists!`;
    }

    fs.unlinkSync(`./src/${data}.json`);
    return `${data}.json deleted!`;
}

exports.renameFile = (lama, baru) => {
    if (!fs.existsSync(`./src/${lama}.json`)) {
        return `${lama}.json doesn't exists!`;
    }

    fs.renameSync(`./src/${lama}.json`, `./src/${baru}.json`);
    return `${lama}.json renamed to ${baru}.json!`;
}

exports.readFile = (data) => {
    if (!fs.existsSync(`./src/${data}.json`)) {
        return `${data}.json doesn't exists!`;
    }

    const read = JSON.parse(fs.readFileSync(`./src/${data}.json`, 'utf8'));
    return read;
}

exports.writeInFile = (name, data) => {
    if (!fs.existsSync(`./src/${name}.json`)) {
        return `${name}.json doesn't exists!`;
    }

    let exists = this.readFile(name);

    let lastId = exists.data.length > 0 ? exists.data[exists.data.length - 1].id : 0;
    let id = exists.data.length++;

    while (id <= lastId) {
        id++;
    }

    Object.assign(data, {
        id
    });

    exists.data.push(data);

    let obj = {};
    obj.data = exists.data.filter(val => Object.values(val).length !== 0);

    fs.writeFileSync(`./src/${name}.json`, JSON.stringify(obj), (err) => {
        if (err) return err;
    });

    return 'new data added!';

}

exports.editFile = (name, id, data) => {
    if (!fs.existsSync(`./src/${name}.json`)) {
        return `${name}.json doesn't exists!`;
    }

    let exists = this.readFile(name);

    id = parseInt(id);

    let curr = exists.data.filter(item => item.id === id);

    if (curr.length === 0) {
        return 'data tidak ditemukan';
    }

    const index = exists.data.findIndex(item => item.id === id);

    exists.data[index] = {
        ...data,
        id
    };

    fs.writeFileSync(`./src/${name}.json`, JSON.stringify(exists), (err) => {
        if (err) return err;
    });

    return 'data updated!';

}

exports.deleteData = (name, id) => {
    if (!fs.existsSync(`./src/${name}.json`)) {
        return `${name}.json doesn't exists!`;
    }

    let exists = this.readFile(name);

    id = parseInt(id);

    let check = exists.data.filter(item => item.id === id);

    if (check.length === 0) {
        return 'data tidak ditemukan';
    }

    exists.data.splice(exists.data.findIndex(i => {
        return i.id === id;
    }), 1);

    fs.writeFileSync(`./src/${name}.json`, JSON.stringify(exists), (err) => {
        if (err) return err;
    });

    return 'data deleted!';

}