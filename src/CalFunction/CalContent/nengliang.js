import * as math from 'mathjs'; // 用于数学运算

/**
 * 手动实现离散小波变换（DWT）
 * @param {Array<number>} data - 输入的信号数据
 * @param {number} level - 分解的层数
 * @returns {Array<Array<number>>} - 每一层的小波分解系数
 */
function dwt(data, level) {
  const wavelet = {
    lowPass: [0.48296, 0.83652, 0.22414, -0.12941], // db4 小波低通滤波器
    highPass: [-0.12941, -0.22414, 0.83652, -0.48296], // db4 小波高通滤波器
  };

  const coeffs = [];
  let currentData = data;

  for (let i = 0; i < level; i++) {
    const lowPassResult = [];
    const highPassResult = [];

    for (let j = 0; j < currentData.length - wavelet.lowPass.length + 1; j += 2) {
      let lowSum = 0;
      let highSum = 0;

      for (let k = 0; k < wavelet.lowPass.length; k++) {
        lowSum += currentData[j + k] * wavelet.lowPass[k];
        highSum += currentData[j + k] * wavelet.highPass[k];
      }

      lowPassResult.push(lowSum);
      highPassResult.push(highSum);
    }

    coeffs.push(highPassResult); // 保存高频系数
    currentData = lowPassResult; // 低频系数用于下一层分解
  }

  coeffs.push(currentData); // 保存最后一层的低频系数
  return coeffs;
}

/**
 * 计算小波能量
 * @param {Array<number>} voltage - 输入的电压数据
 * @param {number} level - 分解的层数（默认值为 5）
 * @returns {number} - 计算得到的总能量
 */
export function calculateEnergy(voltage, level = 5) {
  // 使用手动实现的 DWT
  const coeffs = dwt(voltage, level);

  // 计算每个频段的能量并叠加
  let energy = 0;
  coeffs.forEach(coeff => {
    energy += math.sum(coeff.map(value => value ** 2)); // 计算平方和
  });

  return energy;
}