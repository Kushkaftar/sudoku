
var app = new Vue({
    el: '#app',
    data: {
        square: [
            [null, 7, 9, null, 4, null, 5, null, null],
            [1, 8, null, 3, 5, null, null, null, null],
            [null, null, null, 1, null, null, null, 6, null],
            [4, 1, null, 2, null, 9, 6, 7, 5],
            [null, null, null, 7, null, 8, null, 3, null],
            [3, 2, 7, 5, null, 4, 8, null, 1],
            [null, 3, 1, null, null, null, null, 4, 6],
            [9, null, null, null, 7, null, 3, null, null],
            [null, null, null, 4, null, null, 1, null, 9]
        ],
        generalData: {},
        // square: [
        //     [null, 7, 9, null, 4, null, 5, null, null],
        //     [1, 8, null, 3, 5, null, null, null, null],
        //     [null, null, null, 1, null, null, null, 6, null],
        //     [4, 1, null, 2, null, 9, 6, 7, 5],
        //     [null, null, null, 7, null, 8, null, 3, null],
        //     [3, 2, 7, 5, null, 4, 8, null, 1],
        //     [null, 3, 1, null, null, null, null, 4, 6],
        //     [9, null, null, null, 7, null, null, null, null],
        //     [null, null, null, 4, null, null, 1, null, 9]
        // ],
    },
    methods: {
        run: function () {
            // this.generalData = {}
            console.log("run");
            for (let y = 0; y < 9; y++) {
                for (let x = 0; x < 9; x++) {
                    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                    if (this.square[y][x] === null) {
                        numbers = this.getSquare(y, x, numbers);
                        numbers = this.getRow(y, numbers);
                        numbers = this.getColumn(x, numbers);
                        if (numbers.length === 1) {
                            // TODO: перписать, удалить рекурсию, выполнить циклы полностью
                            this.setNumb(y, x, numbers[0]);
                            this.generalData = {}
                            this.run()
                        } else {
                            this.setGeneralData(y, x, numbers);
                        }
                    }

                }
            }
            console.log(this.generalData);
            this.getUniqNumber();

        },
        getRow: function (row, numbers) {
            // console.log(`getRow ${row}, numbers ${numbers}`);
            for (let i = 0; i < 9; i++) {
                if (this.square[row][i] !== null) {
                    numbers = this.filter(row, i, numbers);
                    // numbers = numbers.filter(el => el !== this.square[row][i]);
                    // console.log(this.square[row][i])
                }
            }
            // console.log(`row ${row}`);
            return numbers;
        },
        getColumn: function (column, numbers) {
            // console.log("getColumn");
            for (let i = 0; i < 9; i++) {
                if (this.square[i][column] !== null) {
                    numbers = this.filter(i, column, numbers);
                    // numbers = numbers.filter(el => el !== this.square[i][column]);
                }
            }
            return numbers;
        },
        getSquare: function (y, x, numbers) {

            x = x <= 2 ? 0 : Math.trunc(x / 3) * 3;
            y = y <= 2 ? 0 : Math.trunc(y / 3) * 3;

            for (let i = y; i < y + 3; i++) {
                for (let j = x; j < x + 3; j++) {
                    numbers = this.filter(i, j, numbers);
                }
            }
            // console.log(`numbers `, numbers);
            return numbers;
        },
        filter: function (y, x, numbers) {
            numbers = numbers.filter(el => el !== this.square[y][x]);
            return numbers;
        },
        setNumb: function (y, x, numb) {
            Vue.set(this.square[y], x, numb);
        },
        reset: function () {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    Vue.set(this.square[i], j, null);
                }
            }
        },
        getNumb: function (y, x) {
            this.generalData[y][x];

        },
        setGeneralData: function (y, x, numbers) {
            // console.log(`cell ${y} ${x}`, numbers);
            this.generalData[`${String(y) + String(x)}`] = {};
            this.generalData[`${String(y) + String(x)}`]['y'] = y;
            this.generalData[`${String(y) + String(x)}`]['x'] = x;
            this.generalData[`${String(y) + String(x)}`]['numbers'] = numbers
        },
        getUniqNumber: function () {
            // TODO: хрень, сократить
            for (let key in this.generalData) {
                //console.log(this.generalData[key]);
                x = this.generalData[key].x <= 2 ? 0 : Math.trunc(this.generalData[key].x / 3) * 3;
                y = this.generalData[key].y <= 2 ? 0 : Math.trunc(this.generalData[key].y / 3) * 3;
                console.log('squad');
                let squad = {}
                for (let i = y; i < y + 3; i++) {
                    for (let j = x; j < x + 3; j++) {
                        if (this.square[i][j] === null) {
                            //console.log(`y: ${i}, x: ${j}, numbers ${this.generalData[`${String(i) + String(j)}`].numbers}`);
                            squad[`${String(i) + String(j)}`] = this.generalData[`${String(i) + String(j)}`];
                        }

                    }
                }
                // console.log(squad);
                let arr = [];
                for (const key in squad) {
                    arr = arr.concat(squad[key].numbers).sort();

                }
                //console.log('arr', arr);
                let n = arr.filter((item, i, ar) => ar.filter(el => el === item).length === 1);

                for (const key in squad) {
                    if (n.length === 1 && squad[key].numbers.find(el => el === n[0])) {
                        console.log(`n = ${n[0]}`, `y = ${squad[key].y + 1}`, `x = ${squad[key].x + 1}`);
                        // TODO: перписать, удалить вызов метода run, выполнить цикл полностью
                        this.setNumb(squad[key].y, squad[key].x, n[0]);
                        this.generalData = {}
                        this.run()
                    }

                }
            }
        }
    }
})
