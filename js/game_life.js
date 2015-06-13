

window.onload = function() {
    beggining();

    //console.log(pos_tab);

    board = {
        size_i: pos_tab.length,
        size_j: pos_tab[0].length,
        cells: [],
        init_cells: function () {
            cell = [];
            for (var i = 0; i < this.size_i; i++) {
                row = [];
                for (var j = 0; j < this.size_j; j++)

                    if(pos_tab[i][j]['state'] == 'live')
                        row.push(new Cell(true, i, j));
                    else if(pos_tab[i][j]['state'] == 'dead')
                        row.push(new Cell(false, i, j));
                cell.push(row);
            }
            console.log('board init done');
            return cell;
        },
        set_cells: function(){
            for (var i = 0; i < this.size_i; i++)
                for (var j = 0; j < this.size_j; j++) {
                    if(cell[i][j].is_alive == true)
                        set_field(i, j, 'live');
                    else if(cell[i][j].is_alive == false)
                        set_field(i, j, 'dead');
                }

        },
        numberOfNeightbour: function(x, y) {
            var alive = 0;
            if (y > 0 && this.cells[x][y - 1].is_alive == true)
                ++alive;
            if (y < this.size_j - 1 && this.cells[x][y + 1].is_alive == true)
                ++alive;
            if (x > 0 && this.cells[x - 1][y].is_alive == true)
                ++alive;
            if (x < this.size_i - 1 && this.cells[x + 1][y].is_alive == true)
                ++alive;
            if (x > 0 && y > 0 && this.cells[x - 1][y - 1].is_alive == true)
                ++alive;
            if (x < this.size_i - 1 && y > 0 && this.cells[x + 1][y - 1].is_alive == true)
                ++alive;
            if (x > 0 && y < this.size_j - 1 && this.cells[x - 1][y + 1].is_alive == true)
                ++alive;
            if (x < this.size_i - 1 && y < this.size_j - 1 && this.cells[x + 1][y + 1] == true)
                ++alive;
            return alive;
        }
    };

    game = {
        start: function (event) {
            this.interval_id = window.setInterval(this.next_step, 1000)
        },
        stop: function (event) {
            window.clearInterval(this.interval_id)
        },
        next_step: function () {
            console.log('next step');
            // kopiowanie
            var cell_copy = [];
            for (var i = 0; i < this.size_i; i++) {
                row = [];
                for (var j = 0; j < this.size_j; j++)
                    row.push(new Cell(board.cells[i][j].is_alive, i, j));
                cell_copy.push(row);
            }

            //przeliczanie na kopii
            for (var i = 0; i < this.size_i; i++)
                for (var j = 0; j < this.size_j; j++) {
                    cell_copy[i][j].condition();

                    board.set_cells();
                }
        },
        interval_id: null

    };

    /**
     *
     * @param state
     */





//old deprecated piece
    /*
     function game_life( cell_tab ) {

     var field = [];

     //init board with zero
     for(var i=0; i<cell_tab.length; i++){
     row = [];

     for(var j=0; j<cell_tab[i].length; j++){

     cell = {
     age: 0,
     neighbour: 0,
     state: 'dead'
     };var startss = function(event){
        console.log('dyda');
        //board.init_cells();
        //game.start(event);
    };

     if(cell_tab[i][j]['state'] == 'live')
     field_prop['state'] = 'born';
     else if(cell_tab[i][j]['state'] == 'dead')
     field_prop['state'] = 'dead';

     row.push(field_prop)
     }
     this.field.push(row);
     }








     }



     function cell(state){

     this.age = 0;
     this.neighbour = 0;
     if(state == 'live')
     this.state = 'born';
     else if(state == 'dead')
     this.state = 'dead';
     }

     function neightbour( ){


     };



     game_life.condition = function(i, j) {

     this.field[i][j];

     var max_density = 3;
     var min_density = 2;
     var max_ideal = 2;
     var min_ideal = 2;

     if( neighbors_amount > max_density && neighbors_amount < min_density )
     return "dead";
     else if( neighbors_amount < max_ideal && neighbors_amount > min_ideal )
     return "born";
     else return "stable";
     };

     //free running
     function next_step(){}
     function run( delay ){
     setTimeout(next_step(), delay*0.001);
     }
     */
};

var startss = function(event){
    console.log('dyda');
    board.init_cells();
    game.start(event);
};

var board;
var game;

function Cell(state, i, j) {
    this.age = 0;
    this.is_alive = state;
    this.i = i;
    this.j = j;
}

Cell.prototype.condition = function() {

    var neighboars_amount = board.numberOfNeightbour( this.i, this.j);
    var max_density = 3;
    var min_density = 2;
    var max_ideal = 2;
    var min_ideal = 2;

    if( neighboars_amount > max_density && neighboars_amount < min_density )
        this.is_alive = false;
    else if( neighboars_amount < max_ideal && neighboars_amount > min_ideal )
        this.is_alive = true;
};

