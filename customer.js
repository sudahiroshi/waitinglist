/**
 * 客を取り扱うクラス
 */
class Customer {
    /**
     * コンストラクタ
     * @param {number} delta - (客の)処理時間の平均値
     * @param {number} sigma - 処理時間の標準偏差
     */
    constructor(delta, sigma) {
        this._remain = Customer.gauss(delta, sigma); // 本当は平均時間とσから処理時間を計算する
    }

    /**
     * 内部的に時間を進める
     * @param {number} time - 経過させる単位時間
     */
    process(time) {
        this._remain -= time;
        return this._remain;
    }

    /**
     * 客の処理時間を設定する
     * @param delta
     * @param sigma
     * @returns {number} - 処理時間
     */
    static gauss(delta, sigma) {
        return 4.0;  // ここに教科書P124のgauss関数に相当するプログラムを書く
    }
}