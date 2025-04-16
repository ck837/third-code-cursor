
/**
 * 模拟 findPeaks 函数
 * @param {Array<Array<number>>} data - 输入的二维数组数据
 * @returns {Array<number>} - 返回找到的峰值点数组 [x1, y1, x2, y2]
 */
function findPeaks(data) {
    const time = data.map(row => row[0]); // 时间列
    const voltage = data.map(row => row[1]); // 电压幅值列
  
    const positivePeaks = [];
    const negativePeaks = [];
  
    // 寻找正峰值点和负峰值点
    for (let i = 1; i < voltage.length - 1; i++) {
      if (voltage[i - 1] < voltage[i] && voltage[i] > voltage[i + 1] && voltage[i] > 0) {
        positivePeaks.push([time[i], voltage[i]]);
      } else if (voltage[i - 1] > voltage[i] && voltage[i] < voltage[i + 1] && voltage[i] < 0) {
        negativePeaks.push([time[i], voltage[i]]);
      }
    }
  
    // 如果没有第二个正峰值点，返回 null
    if (positivePeaks.length < 2) {
      return null;
    }
  
    // 获取第二个正峰值点的坐标 (x1, y1)
    const [x1, y1] = positivePeaks[1];
  
    // 寻找最大的正峰值点和负峰值点
    const maxPositivePeak = positivePeaks.reduce((max, peak) => (peak[1] > max[1] ? peak : max), positivePeaks[0]);
    const maxNegativePeak = negativePeaks.reduce((min, peak) => (peak[1] < min[1] ? peak : min), negativePeaks[0]);
  
    // 比较正峰值和负峰值的绝对值
    let x2, y2;
    if (Math.abs(maxNegativePeak[1]) > maxPositivePeak[1]) {
      [x2, y2] = maxNegativePeak; // 负峰值较大
    } else {
      [x2, y2] = maxPositivePeak; // 正峰值较大
    }
  
    return [x1, y1, x2, y2];
  }
  
/**
 * 处理数据并返回结果
 * @param {Array<Array<number>>} data1 - 文件1中的数据
 * @param {Array<Array<number>>} data2 - 文件2中的数据
 * @returns {Array<Array<number>>} - 返回处理后的结果
 */
export function calculateAmplitude(data1) {
    const results = [];
    data1.forEach((row, idx) => {

        if (data1) {
            const peaks = findPeaks(data1);
            if (peaks) {
                const [x1, y1, x2, y2] = peaks;
                const newData = [...row, x1, y1, x2, y2]; // 拼接数据
                results.push(newData);
            } else {
                console.warn(`未能找到足够的峰值点：索引 ${idx}`);
            }
        } else {
            console.warn(`文件2中不存在对应数据：索引 ${idx}`);
        }
    });

    return results; // 返回处理后的结果
}