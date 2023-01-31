class Base64 {

    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    b2l = new Map();
    l2b = new Map();

    constructor() {
        for (let i = 0; i < this.letters.length; i++) {
            this.b2l[i] = this.letters[i];
            this.l2b[this.letters[i]] = i;
        }
    }

    encode(str) {
        if (!str) {
            return str;
        }
        let i = 0;
        let n = str.length;
        const res = [];

        while (i < n) {
            let before = '';
            const one = str[i++];
            const two = str[i++];
            const three = str[i++];
            let tempRes = [];
            [one, two, three].forEach(row => {
                if (typeof row === 'undefined') {
                    if (before.length) {
                        while (before.length < 6) {
                            before = `${before}0`;
                        }
                        tempRes.push(this.bin2Ascii(before))
                        before = ''
                    }
                } else {
                    before += this.ascii2Bin(row);
                    tempRes.push(this.bin2Ascii(before.slice(0, 6)));
                    before = before.slice(6, before.length);
                }
            });
            if (before.length) {
                tempRes.push(this.bin2Ascii(before));
            }

            while (tempRes.length < 4) {
                tempRes.push('=');
            }
            res.push(...tempRes);
        }
        return res.join('');
    }

    decode(a) {
        const bins = [];
        [...a].forEach(token => {
            if (token === '=') {
                return;
            }
            let bin = this.l2b[token].toString(2);
            while (bin.length < 6) {
                bin = '0' + bin;
            }
            bins.push(bin);
        });
        const binStr = bins.join('');

        const res = [];

        for (let i = 0; i < binStr.length; i += 8) {
            if (typeof binStr[i + 7] === 'undefined') {
                break;
            }
            res.push(String.fromCharCode(parseInt(binStr.substring(i, i + 8), 2)));
        }

        return res.join('');

    }

    ascii2Bin(a) {
        let res = a.charCodeAt(0).toString(2);
        while (res.length < 8) {
            res = '0' + res;
        }
        return res;
    }

    bin2Ascii(b) {
        return this.b2l[parseInt(b, 2)];
    }

}
