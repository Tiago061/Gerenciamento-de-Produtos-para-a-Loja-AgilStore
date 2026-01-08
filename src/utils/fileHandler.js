import path from 'path';
import fs from 'fs/promises';

const filePath = path.join(__dirname, '../data/produtos.json');

export default function saveData(data){
    try{
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    }catch(error){
        console.error('Erro ao salvar os dados:', error.message)
    }
    
}

export default function loadData() {
    try{
        if(!fs.existsSync(filePath)){
            fs.writeFileSync(filePath, JSON.stringify([], null, 2));
            return [];
        }
        const data = fs.readFileSync(filePath, 'utf-8')
        return data ? JSON.parse(data) : []
    } catch(error){
        console.error('Erro ao carregar os dados:', error.message)
        return []
    }
}





