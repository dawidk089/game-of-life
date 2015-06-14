/**
 * Created by mcmushroom on 14.06.15.
 */

game = {
    start: function (event) {
        /*//TODO set count neighbours on cells
        board.c.font = "15px Arial";
        board.c.textAlign = "center";
        old_fillstyle = board.c.fillStyle;
        console.warn('old_filestyle: ', old_fillstyle);
        board.c.fillStyle = 'white';

        //console.error('xy: ', board.pos_tab[i][j].x, )
        for (var i = 0; i < board.size_i; i++) {
            for (var j = 0; j < board.size_j; j++)

                board.c.fillText(String(board.numberOfNeightbour(i, j)), board.pos_tab[i][j].x, board.pos_tab[i][j].y);
        }

        board.c.fillStyle = old_fillstyle;*/


        this.interval_id = window.setInterval(this.next_step, 50)
    },
    stop: function (event) {
        window.clearInterval(this.interval_id)
    },
    next_step: function () {
        //console.log('next step');
        // kopiowanie
        var cell_copy = [];
        //console.log('board.cells: ', board.cells);
        //console.log('in next step i, j', board.size_i, board.size_j);
        for (var i = 0; i < board.size_i; i++) {
            row = [];
            for (var j = 0; j < board.size_j; j++)
                row.push(new Cell(board.cells[i][j].is_alive, i, j));
            cell_copy.push(row);
        }

        //console.warn('cell copy: ', cell_copy);

        //przeliczanie na kopii
        for (var i = 0; i < board.size_i; i++)
            for (var j = 0; j < board.size_j; j++) {
                cell_copy[i][j].is_alive = board.cells[i][j].condition();
            }
        board.cells = cell_copy;

        board.set_cells();

       /* //TODO set count neighbours on cells
        board.c.font = "15px Arial";
        board.c.textAlign = "center";
        old_fillstyle = board.c.fillStyle;
        console.warn('old_filestyle: ', old_fillstyle);
        board.c.fillStyle = 'white';

        //console.error('xy: ', board.pos_tab[i][j].x, )
        for (var i = 0; i < board.size_i; i++) {
            for (var j = 0; j < board.size_j; j++)

                board.c.fillText(String(board.numberOfNeightbour(i, j)), board.pos_tab[i][j].x, board.pos_tab[i][j].y);
        }

        board.c.fillStyle = old_fillstyle;*/

        //console.log('next step -- board.cells: ', JSON.stringify(board.cells));
    },
    interval_id: null

};