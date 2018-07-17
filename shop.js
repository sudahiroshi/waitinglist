import { List } from './list.js';
import { Register } from './register.js';
/**
 * 全体制御のためのクラス
 */
export default class Shop {
    /**
     * コンストラクタ
     * @param {number} number - レジの数
     * @param {number} delta - (客の)処理時間の平均値
     * @param {number} sigma - 処理時間の標準偏差
     * @param {number} alpha - 客の流れ密度
     */
    constructor(number, delta, sigma, alpha) {
        this._registers = [];
        this._list = new List(delta, sigma, alpha);
        this._rew = 0;
        this._number = number;
        for (let i = 0; i < number; i++) this._registers.push(new Register(i));
    }

    /**
     * 内部的に時間を進める
     * @param {number} time - 経過させる単位時間
     */
    process(time) {
        for (let register of this._registers) {
            if (register.isProgress()) {
                let remain = register.process(time);
                register.remain = remain;
            }
        }
        for (let register of this._registers.sort((r1, r2) => {
            return r1.remain < r2.remain ? -1 : 1
        })) {
            if (register.remain <= 0) {
                if (this._list.getLength() > 0) {
                    register.push(this._rew, this._list.shift());
                } else register.remain = 0;
            }
        }

        this._rew = this._list.process(time);
    }
}
