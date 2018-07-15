/**
 * 待ち行列を扱うクラス
 */
class List {
    /**
     * コンストラクタ
     * @param {number} average - (客の)処理時間の平均値
     * @param {number} sigma - 処理時間の標準偏差
     */
    constructor(average, sigma) {
        this._list = [];
        this._average = average;
        this._sigma = sigma;
        this._next = 0;
    }

    /**
     * レジ数を返す
     * @returns {number}
     */
    getLength() {
        return this._list.length;
    }

    /**
     * 待ち行列の先頭を取り除く
     * @returns {Customer} - 先頭の客
     */
    shift() {
        if (this._list.length == 0) throw new RangeError('待ち行列に客がいません');
        return this._list.shift();
    }

    /**
     * 内部的に時間を進める
     * @param {number} time - 経過させる単位時間
     */
    process(time) {
        let rew = this._next -= time;
        if (this._next <= 0) {
            this._list.push(new Customer(this._average, this._sigma));
            this._next += 3.2; // 次の客が来るまでの時間を設定
            return rew;
        }
        return 0;
    }
}