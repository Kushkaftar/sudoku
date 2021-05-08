
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
            [9, null, null, null, 7, null, null, null, null],
            [null, null, null, 4, null, null, 1, null, 9]
        ]
    },
    methods: {
        run: function () {
            // console.log("run");
            for (let i = 0; i < 9; i++) {
                console.log(this.getRow(i, 5));
                console.log(this.getColumn(i, 3));

            }

        },
        getRow: function (row, searchNumber) {
            console.log("getRow");
            for (let i = 0; i < 9; i++) {

                if (this.square[row][i] === searchNumber) {
                    console.log(this.square[row][i]);
                    console.log(`index: [${row},${i}], number`, this.square[row][i]);
                    return false;
                }
            }
            console.log(`row ${row}`);
            return true;
        },
        getColumn: function (column, searchNumber) {
            console.log("getColumn");
            for (let i = 0; i < 9; i++) {

                if (this.square[i][column] === searchNumber) {
                    console.log(`index: [${i},${column}], number`, this.square[i][column]);
                    return false;
                }
            }
        }
    }
})
