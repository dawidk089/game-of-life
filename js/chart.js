pos_tab = [];
cell_radius = null;

beggining = function( ) {

    var canvas_h = 500;
    var canvas_w = canvas_h;

    cell_radius = 50;
    var interspace = 2;

    // oblicza ile zmiescie sie komorek
    var amount_cell = Math.floor((canvas_h)/(2*(cell_radius+interspace)));

    var marginspace_v = (canvas_h-amount_cell*(2*(cell_radius+interspace)))/2;
    var marginspace_h = marginspace_v;
    console.log('>(i)prepared variable');
    console.log('cell radius is '+cell_radius);
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

        c = box.getContext('2d');

        c.fillStyle = "#000";
        c.fillRect(0, 0, canvas_h, canvas_w);

        for( var x=marginspace_h+cell_radius+interspace; x<canvas_w-(marginspace_h+cell_radius); x+=2*(cell_radius+interspace)) {
            var pos_row = [];
            for (var y = marginspace_v + cell_radius + interspace; y < canvas_h - (marginspace_v + cell_radius); y += 2 * (cell_radius + interspace))
                pos_row.push({'x': x, 'y': y, 'state': 'dead'});
            pos_tab.push(pos_row);
        }

        console.log('>(i)prepared a position table: ');
        console.log(pos_tab);

        for (var i=0; i<pos_tab.length; i++)
            for (var j=0; j<pos_tab[i].length; j++){

                var x = pos_tab[i][j]['x'];
                var y = pos_tab[i][j]['y'];
                var state = pos_tab[i][j]['state'];
                set_field(c, i, j, state);
            }

        console.log('>(i)set a cells in canvas');
    }

    /*maaaakkaaaareeenAAA*/

    box.addEventListener('click', function(event) {
        var x = event.pageX - box.offsetLeft, // - elemLeft,
        y = event.pageY - box.offsetTop; // - elemTop;

        console.log('coor: '+x + ' ' + y);

        for (var i=0; i<pos_tab.length; i++) {
            for (var j = 0; j < pos_tab[i].length; j++) {

                var x_c = pos_tab[i][j]['x'];
                var y_c = pos_tab[i][j]['y'];
                var r_c = cell_radius;
                var state_c = pos_tab[i][j]['state'];

                //if (Math.pow(x - x_c,2) + Math.pow(y - y_c,2) <= Math.pow(r_c,2)) {
                if (Math.abs(x - x_c) < +interspace+r_c && Math.abs(y - y_c) < interspace+r_c) {
                    console.log('c: ' + i + ' ' + j);
                    if(state_c=='dead')
                        set_field(c, i, j, 'live');
                    else if(state_c=='live')
                        set_field(c, i, j, 'dead');
                }
            }
        }
    });

    console.log('>makarena is done');
};

var set_field = function(i, j, state){

    var x = pos_tab[i][j]['x'];
    var y = pos_tab[i][j]['y'];

    c.strokeStyle = 'black';

    if(state == 'dead')
        c.fillStyle = '#222';
    else if(state == 'live')
        c.fillStyle = '#f60';
    c.beginPath();
    c.arc(x, y, cell_radius, 0, Math.PI * 2, false);
    c.closePath();
    c.stroke();
    c.fill();

    pos_tab[i][j]['state'] = state;
};

var cell_change_support = function(){



};