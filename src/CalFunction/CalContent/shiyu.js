export function calculateTimeDomain(voltageArray) {
    try {
        // 处理时域数据的逻辑
        return voltageArray.reduce((sum, voltage) => sum + voltage ** 2, 0);
    } catch (error) {
        console.error('时域计算错误:', error);
        return null;
    }
}
