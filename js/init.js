window.onload = function () {
    
    beggining()
    
    
    
    
};

function startss(event){
    board.init_cells();
    game.start(event);
}

function beggining( ) {

    var canvas_h = 500;
    var canvas_w = canvas_h;

    board.cell_radius = 8;
    var interspace = 2;

    // oblicza ile zmiescie sie komorek
    var amount_cell = Math.floor((canvas_h)/(2*(board.cell_radius+interspace)));

    var marginspace_v = (canvas_h-amount_cell*(2*(board.cell_radius+interspace)))/2;
    var marginspace_h = marginspace_v;
    console.log('>(i)prepared variable');
    console.log('cell radius is '+board.cell_radius);
    console.log('marginspace is '+marginspace_v);
    console.log('amount cell is '+amount_cell);

    // responsywny canvas w przyszlosci
    var canvas_init_text = '\
        <canvas id="fast_game_chart"  \
        width="'+canvas_w+'" \
        height="'+canvas_h+'"> \
        <p>Twoja przeglądarka nie obsługuje canvas.</p> \
        </canvas>';


    document.getElementById('fast_game').innerHTML = canvas_init_text;
    console.log('>(i)set a canvas');

    var box = document.getElementById('fast_game_chart');
    if(box && box.getContext) {

        board.c = box.getContext('2d');
        board.c.fillStyle = "#000";
        board.c.fillRect(0, 0, canvas_h, canvas_w);

        for( var x=marginspace_h+board.cell_radius+interspace; x<canvas_w-(marginspace_h+board.cell_radius); x+=2*(board.cell_radius+interspace)) {
            var pos_row = [];
            for (var y = marginspace_v + board.cell_radius + interspace; y < canvas_h - (marginspace_v + board.cell_radius); y += 2 * (board.cell_radius + interspace))
                pos_row.push({'x': x, 'y': y, 'state': 'dead'});
            board.pos_tab.push(pos_row);
        }
        board.size_i = board.pos_tab.length;
        board.size_j = board.pos_tab[0].length;


        console.log('>(i)prepared a position table: ');
        console.log(board.pos_tab);

        for (var i=0; i<board.pos_tab.length; i++)
            for (var j=0; j<board.pos_tab[i].length; j++){

                var x = board.pos_tab[i][j].x;
                var y = board.pos_tab[i][j].y;
                var state = board.pos_tab[i][j]['state'];
                board.set_field(i, j, state);
            }

        console.log('>(i)set a cells in canvas');
    }

    /*maaaakkaaaareeenAAA*/

    box.addEventListener('click', function(event) {
        var x = event.pageX - box.offsetLeft, // - elemLeft,
            y = event.pageY - box.offsetTop; // - elemTop;

        console.log('coor: '+x + ' ' + y);

        for (var i=0; i<board.pos_tab.length; i++) {
            for (var j = 0; j < board.pos_tab[i].length; j++) {

                var x_c = board.pos_tab[i][j]['x'];
                var y_c = board.pos_tab[i][j]['y'];
                var r_c = board.cell_radius;
                var state_c = board.pos_tab[i][j]['state'];

                //if (Math.pow(x - x_c,2) + Math.pow(y - y_c,2) <= Math.pow(r_c,2)) {
                if (Math.abs(x - x_c) < +interspace+r_c && Math.abs(y - y_c) < interspace+r_c) {
                    console.log('board.c: ' + i + ' ' + j);
                    if(state_c=='dead')
                        board.set_field(i, j, 'live');
                    else if(state_c=='live')
                        board.set_field(i, j, 'dead');
                }
            }
        }
    });

    console.log('>init is done');
}