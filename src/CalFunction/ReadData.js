import * as XLSX from 'xlsx';

// Convert CommonJS imports to ES6 imports
// import { calculateAmplitude } from './CalContent/fuzhi';
// import { calculateEnergy } from './CalContent/nengliang';
// import { calculateTimeDomain } from './CalContent/shiyu';
// import { calculateFrequencyDomain } from './CalContent/pingyu';
// import { calculateMainFrequency } from './CalContent/zhupingpingci';
// import { calculateVelocity } from './CalContent/sudu';

// 定义输入文件路径
const filePath = '/data.xlsx';

// 读取Excel文件中的数据
async function readExcelData() {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`File ${filePath} does not exist or cannot be accessed`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
;
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // 将工作表转换为二维数组，并跳过表头
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1}).slice(1);

        console.log(jsonData);  
        
        // 确保每行数据只包含两列
        const processedData = jsonData
            .filter(row => row.length >= 2)
            .map(row => row.slice(0, 2));
        
        return processedData;
    } catch (error) {
        console.error('读取Excel文件时出错:', error);
        return [];
    }
}

// 获取时域数据
function getTimeDomainData() {
    const rawData = readExcelData(dataPath);
    return calculateTimeDomain(
        rawData.map(row => row[0]), 
        rawData.map(row => row[1])
    );
}

// 获取频域数据
function getFrequencyDomainData() {
    const rawData = readExcelData(dataPath);
    return calculateFrequencyDomain(
        rawData.map(row => row[0]), 
        rawData.map(row => row[1])
    );
}

// 获取幅值数据
function getAmplitudeData() {
    const rawData = readExcelData(dataPath);
    return calculateAmplitude(rawData.map(row => row[1]));
}

// 获取能量数据
function getEnergyData() {
    const rawData = readExcelData(dataPath);
    return calculateEnergy(rawData.map(row => row[1]));
}

// 获取速度数据
function getVelocityData() {
    const rawData = readExcelData(dataPath);
    return calculateVelocity(
        rawData.map(row => row[0]), 
        rawData.map(row => row[1])
    );
}

// 获取主頻次数据
function getMainFrequencyData() {
    const rawData = readExcelData(dataPath);
    return calculateMainFrequency(
        rawData.map(row => row[0]), 
        rawData.map(row => row[1])
    );
}

// 使用 ES6 语法导出所有函数
export {
    readExcelData,
    getTimeDomainData,
    getFrequencyDomainData,
    getAmplitudeData,
    getEnergyData,
    getVelocityData,
    getMainFrequencyData
};
