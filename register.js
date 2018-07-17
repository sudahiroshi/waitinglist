/**
 * レジ（単独）を取り扱うクラス
 */
export default class Register {
    /**
     * コンストラクタ
     * @param {number} id - レジID
     */
    constructor(id) {
        this._id = id;
        this._open = true; // レジが活動中か？ true: 活動中, false: 休止中
        this._progress = null; // 接客中なら客の情報，待ち状態ならnull
        this.remain = 0;
    }

    /**
     * 内部的に時間を進める
     * @param {number} time - 経過させる単位時間
     */
    process(time) {
        if (this._progress != null) {
            let remain = this._progress.process(time);
            if (remain <= 0) {
                this._progress = null;
                return remain;
            }
        }
    }

    /**
     * 客に対応中か？
     * @returns {boolean} - 対応中: true, 空き状態: false
     */
    isProgress() {
        return this._progress != null;
    }

    /**
     * レジに客を誘導して処理を開始する
     * @param {number} rew - 調整する時間
     * @param {Customer} customer - 客
     */
    push(rew, customer) {
        if (this.remain < 0) customer.process(-this.remain);
        else customer.process(-rew);
        this._progress = customer;
    }
}
