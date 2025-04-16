import FFT from 'fft.js';

// 对信号进行傅里叶变换并计算频谱
function processFFT(data) {
  try {
    const time = data.map(row => row[0]); // 时间列
    const voltage = data.map(row => row[1]); // 电压幅值列

    const N = time.length;
    const T = time[1] - time[0]; // 时间间隔

    // 调整 N 为最近的 2 的幂
    const adjustedN = Math.pow(2, Math.ceil(Math.log2(N)));
    const freq = Array.from({ length: Math.floor(adjustedN / 2) }, (_, i) => i / (adjustedN * T));

    const fftInstance = new FFT(adjustedN); // 使用调整后的 N
    const buffer = new Array(2 * adjustedN).fill(0);

    // 填充数据到 buffer 中
    for (let i = 0; i < N; i++) {
      buffer[2 * i] = voltage[i];
    }

    fftInstance.transform(buffer);

    const magnitude = [];
    for (let i = 0; i < Math.floor(adjustedN / 2); i++) {
      const real = buffer[2 * i];
      const imag = buffer[2 * i + 1];
      magnitude.push(Math.sqrt(real * real + imag * imag));
    }

    // 寻找最大峰值点
    const peakIdx = magnitude.indexOf(Math.max(...magnitude));
    const x1 = freq[peakIdx]; // 峰值的频率
    const y1 = magnitude[peakIdx]; // 峰值的幅值

    // 计算功率谱密度(PSD)
    const psd = magnitude.map((mag, i) => (mag ** 2) / (2 * Math.PI * freq[i]));
    const psdPeakIdx = psd.indexOf(Math.max(...psd));
    const x2 = freq[psdPeakIdx];
    const y2 = psd[psdPeakIdx];

    // 计算平均功率谱密度(APSD)
    const avgPsd = psd.reduce((sum, value) => sum + value, 0) / psd.length;
    const x3 = freq.reduce((sum, value) => sum + value, 0) / freq.length; // 平均频率
    const y3 = avgPsd; // 平均功率密度

    return [x1, y1, x2, y2, x3, y3];
  } catch (error) {
    console.error('处理FFT时出错:', error);
    return [null, null, null, null, null, null];
  }
}

// 写入输出数据到内存
function writeOutput(rawData) {
  const results = [];

  rawData.forEach((row, idx) => {
    const [x1, y1, x2, y2, x3, y3] = processFFT(rawData); // 处理 FFT
    const newData = [...row, x1, y1, x2, y2, x3, y3];
    results.push(newData);
  });

  return results;
}

// 导出计算速度的函数
export function calculateVelocity(rawData) {
  const outputData = writeOutput(rawData);
  return outputData;
}