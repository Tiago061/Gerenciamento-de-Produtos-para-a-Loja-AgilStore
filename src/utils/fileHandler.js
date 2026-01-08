import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../data/produtos.json');

export function saveData(data){
    try{
        console.log('📁 Salvando em:', filePath);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    }catch(error){
        console.error('Erro ao salvar os dados:', error.message)
    }
    
}

export function loadData() {
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





