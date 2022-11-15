const fs = require('fs');
const dir = './public/Archive'

// Формирует json импортов
const ReadFold = async () => {
    const res = {}
    console.log('Формирование файла')

    const AllDir = await fs.readdirSync(dir);

    for( let i = 0; i < AllDir.length; i++ ) {
        const dirName = AllDir[i]
        if (!dirName || dirName.includes('.')) continue

        if (fs.existsSync(dir + `/${dirName}/trace.json`)) {
            let data = JSON.parse(fs.readFileSync(dir + `/${dirName}/trace.json`, "utf8")) || {};
            res[dirName] = {dirName, image: 'debug.jpg', points: data.tracks[0].points}

        } else {
            continue
        }
        // console.log('points', data.tracks[0].points)
    }

    // Чистим пустые объекты
    await fs.writeFile(dir + "/general.json", JSON.stringify(res),
        () =>  console.log('Файл сформирован'));

    return
}

ReadFold()
