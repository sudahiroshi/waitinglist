/**
 * 客を取り扱うクラス
 */
class Customer {
    /**
     * コンストラクタ
     * @param {number} average - (客の)処理時間の平均値
     * @param {number} sigma - 処理時間の標準偏差
     */
    constructor(average, sigma) {
        this._remain = average; // 本当は平均時間とσから処理時間を計算する
    }

    /**
     * 内部的に時間を進める
     * @param {number} time - 経過させる単位時間
     */
    process(time) {
        this._remain -= time;
        return this._remain;
    }
}