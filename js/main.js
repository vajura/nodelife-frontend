var dotArray;
var fullField;
var axisArray = new Int8Array(16);
axisArray[0] = -1;
axisArray[1] = -1;
axisArray[2] = 0;
axisArray[3] = -1;
axisArray[4] = 1;
axisArray[5] = -1;
axisArray[6] = -1;
axisArray[7] = 0;
axisArray[8] = 1;
axisArray[9] = 0;
axisArray[10] = -1;
axisArray[11] = 1;
axisArray[12] = 0;
axisArray[13] = 1;
axisArray[14] = 1;
axisArray[15] = 1;
var plusOneHashArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var divide2HashArray = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var DeclareDot = /** @class */ (function () {
    function DeclareDot(xPos, yPos, life) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.life = life;
    }
    return DeclareDot;
}());
var LifeDot = /** @class */ (function () {
    function LifeDot(xPos, yPos, life, addedToField) {
        if (addedToField === void 0) { addedToField = true; }
        this.xPos = xPos;
        this.yPos = yPos;
        this.life = life;
        this.addedToField = addedToField;
        this.nearbyDots = [];
        this.nearSum = 0;
        if (addedToField) {
            fullField[yPos][xPos] = this;
        }
    }
    LifeDot.prototype.setNearDots = function () {
        this.nearbyDots = [];
        this.nearSum = 0;
        for (var a = 0; a < 16; a += 2) {
            this.nearbyDots[divide2HashArray[a]] = fullField[this.yPos + axisArray[a]][this.xPos + axisArray[a + 1]];
            if (this.nearbyDots[divide2HashArray[a]]) {
                this.nearSum += 1;
            }
        }
    };
    LifeDot.prototype.getNearSum = function () {
        this.nearSum = 0;
        for (var a = 0; a < this.nearbyDots.length; a++) {
            if (this.nearbyDots[a]) {
                this.nearSum += 1;
            }
        }
    };
    LifeDot.prototype.addToField = function () {
        if (!this.addedToField) {
            fullField[this.yPos][this.xPos] = this;
            this.addedToField = true;
        }
    };
    return LifeDot;
}());
function createDots(declaredDots, xOffset, yOffet) {
    var lifeDotArray = [];
    for (var a = 0; a < declaredDots.length; a++) {
        lifeDotArray[a] = [];
        for (var b = 0; b < declaredDots[a].length; b++) {
            lifeDotArray[a][b] = null;
        }
    }
    for (var a = 1; a < declaredDots.length - 1; a++) {
        for (var b = 1; b < declaredDots[a].length - 1; b++) {
            if (declaredDots[a][b]) {
                lifeDotArray[a][b] = new LifeDot(declaredDots[a][b].xPos + xOffset, declaredDots[a][b].yPos + yOffet, declaredDots[a][b].life);
            }
        }
    }
    var returnArray = [];
    for (var a = 1; a < declaredDots.length - 1; a++) {
        for (var b = 1; b < declaredDots[a].length - 1; b++) {
            if (lifeDotArray[a][b]) {
                lifeDotArray[a][b].setNearDots();
                returnArray.push(lifeDotArray[a][b]);
            }
        }
    }
    return returnArray;
}
function killDot(dotArray, index) {
    fullField[dotArray[index].yPos][dotArray[index].xPos] = null;
    dotArray.splice(index, 1);
}
function checkNearDots(x, y) {
    var sum = 0;
    var highest = 0;
    var xNum = x + axisArray[0];
    var yNum = y + axisArray[1];
    if (fullField[yNum][xNum] !== null) {
        sum++;
        if (highest < fullField[yNum][xNum].life) {
            highest = fullField[yNum][xNum].life;
        }
    }
    xNum = x + axisArray[2];
    yNum = y + axisArray[3];
    if (fullField[yNum][xNum] !== null) {
        sum++;
        if (highest < fullField[yNum][xNum].life) {
            highest = fullField[yNum][xNum].life;
        }
    }
    xNum = x + axisArray[4];
    yNum = y + axisArray[5];
    if (fullField[yNum][xNum] !== null) {
        sum++;
        if (highest < fullField[yNum][xNum].life) {
            highest = fullField[yNum][xNum].life;
        }
    }
    xNum = x + axisArray[6];
    yNum = y + axisArray[7];
    if (fullField[yNum][xNum] !== null) {
        sum++;
        if (highest < fullField[yNum][xNum].life) {
            highest = fullField[yNum][xNum].life;
        }
    }
    xNum = x + axisArray[8];
    yNum = y + axisArray[9];
    if (fullField[yNum][xNum] !== null) {
        sum++;
        if (highest < fullField[yNum][xNum].life) {
            highest = fullField[yNum][xNum].life;
        }
    }
    xNum = x + axisArray[10];
    yNum = y + axisArray[11];
    if (fullField[yNum][xNum] !== null) {
        sum++;
        if (highest < fullField[yNum][xNum].life) {
            highest = fullField[yNum][xNum].life;
        }
    }
    xNum = x + axisArray[12];
    yNum = y + axisArray[13];
    if (fullField[yNum][xNum] !== null) {
        sum++;
        if (highest < fullField[yNum][xNum].life) {
            highest = fullField[yNum][xNum].life;
        }
    }
    xNum = x + axisArray[14];
    yNum = y + axisArray[15];
    if (fullField[yNum][xNum] !== null) {
        sum++;
        if (highest < fullField[yNum][xNum].life) {
            highest = fullField[yNum][xNum].life;
        }
    }
    if (sum == 3) {
        return highest;
    }
    else {
        return 0;
    }
}
function getNextGen(dotArray) {
    var newDotArray = [];
    var checkedFields = [];
    for (var a = 0; a < dotArray.length; a++) {
        var x = dotArray[a].xPos;
        var y = dotArray[a].yPos;
        for (var b = 0; b < 16; b += 2) {
            var xNum = x + axisArray[b];
            var yNum = y + axisArray[b + 1];
            if (xNum != 0 && xNum != 1499 && yNum != 0 && yNum != 799) {
                if (!fullField[yNum][xNum] && !checkedFields[yNum * 1500 + xNum]) {
                    var highestLife = checkNearDots(xNum, yNum);
                    if (highestLife > 0) {
                        newDotArray.push(new LifeDot(xNum, yNum, highestLife, false));
                        checkedFields[yNum * 1500 + xNum] = true;
                    }
                }
            }
            else { }
        }
    }
    for (var a = 0; a < dotArray.length; a++) {
        if ((dotArray[a].nearSum < 2 || dotArray[a].nearSum > 3) || dotArray[a].life < 1) {
            fullField[dotArray[a].yPos][dotArray[a].xPos] = null;
        }
        else {
            newDotArray.push(dotArray[a]);
        }
    }
    //Array.prototype.push.apply(newDotArray, newDotArray2);
    for (var a = 0; a < newDotArray.length; a++) {
        newDotArray[a].addToField();
    }
    for (var a = 0; a < newDotArray.length; a++) {
        newDotArray[a].setNearDots();
        newDotArray[a].life--;
    }
    for (var a = 0; a < fullField.length; a++) {
    }
    return newDotArray;
}
function start() {
    var stage = new createjs.Stage("container");
    fullField = [];
    for (var a = 0; a < 800; a++) {
        fullField[a] = [];
        for (var b = 0; b < 1500; b++) {
            fullField[a][b] = null;
        }
    }
    dotArray = [];
    var colorArray = [];
    colorArray.push("#000000");
    colorArray.push("#221122");
    colorArray.push("#55AA22");
    colorArray.push("#00FFFF");
    colorArray.push("#FFFF00");
    colorArray.push("#FF0000");
    colorArray.push("#FF00FF");
    colorArray.push("#660060");
    var colorCounter = 0;
    var magnifier = 1;
    Array.prototype.push.apply(dotArray, createDots(life106ToArray(gliderString), 100, 100));
    for (var a = 0; a < dotArray.length; a++) {
        var rectangle = new createjs.Shape();
        rectangle.x = dotArray[a].xPos * magnifier;
        rectangle.y = dotArray[a].yPos * magnifier;
        rectangle.graphics.beginFill("#00FF00");
        var rectangleCommand = rectangle.graphics.drawRect(0, 0, magnifier, magnifier).command;
        //rectangle.cache(0,0,magnifier, magnifier);
        stage.addChild(rectangle);
    }
    stage.update();
    var doAnim = true;
    setInterval(function () {
        if (doAnim) {
            stage.removeAllChildren();
            dotArray = getNextGen(dotArray);
            for (var a = 0; a < dotArray.length; a++) {
                var rectangle = new createjs.Shape();
                //rectangle.x = dotArray[a].xPos * magnifier;
                //rectangle.y = dotArray[a].yPos * magnifier;
                rectangle.x = dotArray[a].xPos;
                rectangle.y = dotArray[a].yPos;
                rectangle.graphics.beginFill(colorArray[0]);
                //rectangle.graphics.drawRect(0, 0, magnifier, magnifier);
                rectangle.graphics.drawRect(0, 0, 1, 1);
                //rectangle.cache(0,0,magnifier, magnifier);
                stage.addChild(rectangle);
                colorCounter++;
            }
            stage.update();
        }
    }, 30);
    $(document).keypress(function () {
        doAnim = !doAnim;
    });
    $(document).mousedown(function (event) {
        Array.prototype.push.apply(dotArray, createDots(life106ToArray(gliderString), event.pageX / magnifier, event.pageY / magnifier));
    });
}
function rleToArray() {
}
function life106ToArray(inputString) {
    var split = inputString.split("|");
    var xMin = 0;
    var xMax = 0;
    var yMin = 0;
    var yMax = 0;
    var split2 = split[1].split(" ");
    xMin = xMax = parseInt(split2[0]);
    yMin = yMax = parseInt(split2[1]);
    for (var a = 2; a < split.length; a++) {
        split2 = split[a].split(" ");
        if (parseInt(split2[0]) < xMin) {
            xMin = parseInt(split2[0]);
        }
        if (parseInt(split2[0]) > xMax) {
            xMax = parseInt(split2[0]);
        }
        if (parseInt(split2[1]) < yMin) {
            yMin = parseInt(split2[1]);
        }
        if (parseInt(split2[1]) > yMax) {
            yMax = parseInt(split2[1]);
        }
    }
    var declaredDots = [];
    for (var a = 0; a < yMax - yMin + 3; a++) {
        declaredDots[a] = [];
        for (var b = 0; b < xMax - xMin + 3; b++) {
            declaredDots[a][b] = null;
        }
    }
    for (var a = 1; a < split.length; a++) {
        split2 = split[a].split(" ");
        var xPos = parseInt(split2[0]) - xMin;
        var yPos = parseInt(split2[1]) - yMin;
        declaredDots[yPos + 1][xPos + 1] = new DeclareDot(xPos, yPos, 10000);
    }
    return declaredDots;
}
var gliderString = "#Life 1.06|6 -4|4 -3|6 -3|-6 -2|-5 -2|2 -2|3 -2|16 -2|17 -2|-7 -1|-3 -1|2 -1|3 -1|16 -1|17 -1|-18 0|-17 0|-8 0|-2 0|2 0|3 0|-18 1|-17 1|-8 1|-4 1|-2 1|-1 1|4 1|6 1|-8 2|-2 2|6 2|-7 3|-3 3|-6 4|-5 4";
var bigGlider = "#Life 1.06|-6 -9|-5 -9|-4 -9|-6 -8|-3 -8|-2 -8|-1 -8|-5 -7|-3 -7|-9 -6|-8 -6|0 -6|-9 -5|-7 -5|-2 -5|1 -5|-9 -4|0 -4|1 -4|-8 -3|-7 -3|-8 -2|-5 -2|1 -2|3 -2|4 -2|-8 -1|2 -1|3 -1|5 -1|-6 0|-4 0|3 0|4 0|7 0|-5 1|-4 1|-2 1|3 1|4 1|8 1|-1 2|7 2|-2 3|-1 3|0 3|1 3|5 3|7 3|-2 4|0 4|1 4|5 4|6 4|7 4|8 4|-1 5|3 5|4 5|6 5|4 6|5 6|0 7|2 7|3 7|4 7|1 8|4 8";
var gliderHotel = "#Life 1.06|-270 -286|-269 -286|-270 -285|-269 -285|-270 -279|-269 -279|-268 -279|-270 -277|-268 -277|-271 -276|-270 -276|-269 -276|-268 -276|-267 -276|-272 -275|-271 -275|-267 -275|-266 -275|-272 -274|-271 -274|-267 -274|-266 -274|-281 -270|-274 -270|-282 -269|-281 -269|-274 -269|-273 -269|-283 -268|-282 -268|-281 -268|-274 -268|-273 -268|-272 -268|-282 -267|-281 -267|-274 -267|-273 -267|-281 -266|-274 -266|18 -101|14 -99|22 -99|8 -98|9 -98|10 -98|13 -98|22 -98|8 -97|9 -97|10 -97|13 -97|17 -97|18 -97|23 -97|6 -96|9 -96|10 -96|13 -96|20 -96|22 -96|6 -95|8 -95|19 -95|20 -95|22 -95|6 -94|7 -94|8 -94|-3 -93|-2 -93|17 -93|-3 -92|-2 -92|33 -91|31 -90|32 -90|34 -90|35 -90|31 -88|32 -88|31 -87|33 -86|37 -86|-11 -85|-10 -85|29 -85|33 -85|-11 -84|-10 -84|23 -83|22 -82|24 -82|35 -82|22 -81|24 -81|32 -81|34 -81|21 -80|24 -80|31 -80|21 -79|23 -79|32 -79|33 -79|20 -78|32 -78|34 -78|-19 -77|-18 -77|20 -77|21 -77|32 -77|34 -77|-19 -76|-18 -76|21 -76|31 -76|33 -76|34 -76|30 -75|31 -75|33 -75|34 -75|44 -75|33 -74|34 -74|35 -74|40 -73|48 -73|23 -72|39 -72|48 -72|-11 -71|-10 -71|-9 -71|22 -71|24 -71|39 -71|43 -71|44 -71|49 -71|22 -70|39 -70|46 -70|48 -70|-13 -69|22 -69|45 -69|46 -69|48 -69|-14 -68|-13 -68|-9 -68|22 -68|-13 -67|-11 -67|43 -67|66 -67|67 -67|-10 -66|-9 -66|-8 -66|21 -66|-10 -65|20 -65|21 -65|22 -65|24 -65|25 -65|64 -65|68 -65|18 -64|19 -64|21 -64|22 -64|23 -64|63 -64|-10 -63|-9 -63|20 -63|62 -63|70 -63|-11 -62|-10 -62|66 -62|71 -62|-10 -61|61 -61|66 -61|68 -61|70 -61|-11 -60|-10 -60|23 -60|61 -60|70 -60|-10 -59|-9 -59|22 -59|24 -59|25 -59|61 -59|63 -59|64 -59|69 -59|0 -58|21 -58|22 -58|24 -58|26 -58|27 -58|61 -58|62 -58|63 -58|65 -58|66 -58|68 -58|-7 -57|-3 -57|0 -57|2 -57|5 -57|25 -57|62 -57|63 -57|65 -57|66 -57|67 -57|-7 -56|-6 -56|-5 -56|-4 -56|-3 -56|-1 -56|0 -56|5 -56|27 -56|29 -56|30 -56|35 -56|36 -56|49 -56|50 -56|-6 -55|-4 -55|1 -55|5 -55|31 -55|33 -55|34 -55|43 -55|44 -55|49 -55|50 -55|28 -54|29 -54|30 -54|31 -54|33 -54|35 -54|36 -54|37 -54|43 -54|44 -54|1 -53|2 -53|3 -53|32 -53|2 -52|87 -50|85 -49|86 -49|88 -49|41 -48|42 -48|84 -48|35 -47|36 -47|41 -47|42 -47|83 -47|86 -47|90 -47|35 -46|36 -46|82 -46|92 -46|-43 -45|-42 -45|15 -45|16 -45|17 -45|82 -45|83 -45|86 -45|87 -45|92 -45|-44 -44|-43 -44|82 -44|83 -44|-42 -43|-20 -43|-19 -43|13 -43|84 -43|90 -43|-21 -42|-19 -42|12 -42|13 -42|17 -42|82 -42|83 -42|84 -42|89 -42|-31 -41|-30 -41|-22 -41|-8 -41|-6 -41|13 -41|15 -41|82 -41|83 -41|88 -41|92 -41|93 -41|-31 -40|-30 -40|-22 -40|-19 -40|-12 -40|-11 -40|-8 -40|-5 -40|16 -40|17 -40|18 -40|33 -40|34 -40|83 -40|84 -40|85 -40|86 -40|-22 -39|-13 -39|-11 -39|-5 -39|-4 -39|16 -39|27 -39|28 -39|33 -39|34 -39|74 -39|76 -39|90 -39|94 -39|-21 -38|-19 -38|-15 -38|-11 -38|-7 -38|-3 -38|-2 -38|3 -38|4 -38|27 -38|28 -38|74 -38|75 -38|76 -38|89 -38|-20 -37|-19 -37|-16 -37|-15 -37|-13 -37|-12 -37|-11 -37|-5 -37|-4 -37|3 -37|4 -37|16 -37|17 -37|75 -37|76 -37|88 -37|96 -37|-13 -36|-12 -36|-8 -36|-5 -36|15 -36|16 -36|92 -36|97 -36|-8 -35|-6 -35|16 -35|87 -35|92 -35|94 -35|96 -35|15 -34|16 -34|73 -34|87 -34|96 -34|16 -33|17 -33|73 -33|75 -33|87 -33|89 -33|90 -33|95 -33|-22 -32|73 -32|74 -32|75 -32|87 -32|88 -32|89 -32|91 -32|92 -32|94 -32|-22 -31|-20 -31|19 -31|20 -31|72 -31|88 -31|89 -31|91 -31|92 -31|93 -31|-45 -30|-22 -30|-21 -30|19 -30|20 -30|42 -30|44 -30|72 -30|73 -30|74 -30|75 -30|76 -30|-47 -29|-45 -29|41 -29|42 -29|44 -29|45 -29|58 -29|-56 -28|-48 -28|-46 -28|41 -28|42 -28|44 -28|57 -28|59 -28|-57 -27|-56 -27|-49 -27|-46 -27|-34 -27|-33 -27|40 -27|58 -27|-58 -26|-57 -26|-52 -26|-51 -26|-48 -26|-46 -26|-34 -26|-33 -26|41 -26|60 -26|-68 -25|-67 -25|-59 -25|-58 -25|-57 -25|-52 -25|-51 -25|-47 -25|-45 -25|-29 -25|41 -25|60 -25|61 -25|-68 -24|-67 -24|-58 -24|-57 -24|-52 -24|-51 -24|-45 -24|-30 -24|58 -24|61 -24|-57 -23|-56 -23|-30 -23|-29 -23|-28 -23|58 -23|59 -23|60 -23|-56 -22|52 -22|59 -22|-44 -21|51 -21|52 -21|53 -21|-49 -20|-48 -20|-47 -20|-46 -20|-43 -20|-33 -20|-32 -20|-31 -20|-30 -20|-3 -20|-2 -20|-1 -20|0 -20|85 -20|86 -20|-47 -19|-45 -19|-44 -19|-43 -19|-34 -19|-30 -19|-4 -19|0 -19|51 -19|52 -19|53 -19|83 -19|84 -19|87 -19|93 -19|-46 -18|-30 -18|0 -18|6 -18|7 -18|8 -18|48 -18|49 -18|51 -18|52 -18|83 -18|86 -18|87 -18|88 -18|93 -18|-49 -17|-34 -17|-31 -17|-4 -17|-1 -17|6 -17|50 -17|83 -17|88 -17|93 -17|-46 -16|7 -16|84 -16|85 -16|86 -16|87 -16|88 -16|-49 -15|86 -15|87 -15|-56 -13|-56 -12|-55 -12|-57 -11|-55 -11|87 -10|88 -10|-69 -9|-68 -9|-40 -9|87 -9|88 -9|-70 -8|-68 -8|-41 -8|-40 -8|-80 -7|-79 -7|-71 -7|-64 -7|-63 -7|-58 -7|-41 -7|-39 -7|-80 -6|-79 -6|-71 -6|-68 -6|-65 -6|-62 -6|-59 -6|-57 -6|-30 -6|-71 -5|-64 -5|-63 -5|-62 -5|-60 -5|-58 -5|-57 -5|-31 -5|-29 -5|-70 -4|-68 -4|-61 -4|-60 -4|-58 -4|-57 -4|-42 -4|-33 -4|-32 -4|-28 -4|-18 -4|-17 -4|68 -4|70 -4|-69 -3|-68 -3|-60 -3|-58 -3|-57 -3|-42 -3|-41 -3|-40 -3|-39 -3|-33 -3|-32 -3|-28 -3|-18 -3|-17 -3|67 -3|68 -3|70 -3|71 -3|-59 -2|-57 -2|-41 -2|-40 -2|-39 -2|-38 -2|-33 -2|-32 -2|-28 -2|67 -2|68 -2|70 -2|79 -2|80 -2|-58 -1|-41 -1|-38 -1|-31 -1|-29 -1|66 -1|79 -1|80 -1|-41 0|-40 0|-39 0|-38 0|-30 0|43 0|44 0|67 0|-42 1|-41 1|-40 1|-39 1|42 1|44 1|67 1|-42 2|41 2|42 2|43 2|41 3|42 3|41 4|42 4|42 5|44 5|43 6|71 6|72 6|71 7|72 7|40 9|41 9|45 9|46 9|40 10|41 10|45 10|46 10|36 12|37 12|38 12|42 12|43 12|44 12|36 13|42 13|43 13|44 13|-80 14|-79 14|37 14|43 14|-80 15|-79 15|35 15|35 16|36 16|34 17|36 17|-75 20|40 20|41 20|42 20|-75 21|40 21|41 21|42 21|-88 22|-87 22|-74 22|39 22|43 22|-88 23|-87 23|-78 23|-76 23|-75 23|27 23|28 23|-79 24|-78 24|-76 24|-75 24|28 24|29 24|38 24|39 24|43 24|44 24|-78 25|-76 25|27 25|-96 30|-95 30|20 30|-96 31|-95 31|20 31|21 31|19 32|21 32|7 34|8 34|40 34|41 34|6 35|8 35|40 35|41 35|-95 36|-94 36|-4 36|-3 36|5 36|12 36|13 36|18 36|-96 37|-95 37|-94 37|-93 37|-92 37|-4 37|-3 37|5 37|8 37|11 37|14 37|17 37|19 37|-101 38|-96 38|-91 38|-58 38|5 38|12 38|13 38|14 38|16 38|18 38|19 38|-101 39|-96 39|-95 39|-94 39|-91 39|-60 39|-59 39|-57 39|-56 39|6 39|8 39|15 39|16 39|18 39|19 39|30 39|31 39|-101 40|-95 40|-92 40|-91 40|-61 40|-60 40|-59 40|7 40|8 40|16 40|18 40|19 40|30 40|31 40|-94 41|-93 41|17 41|19 41|-61 42|-60 42|-59 42|18 42|-67 43|-60 43|-68 44|-67 44|-66 44|-69 45|-66 45|-69 46|-68 46|-49 46|-68 47|-49 47|-66 48|-48 48|-67 49|-65 49|-52 49|-50 49|-49 49|-66 50|-53 50|-52 50|-50 50|-49 50|-84 51|-83 51|-82 51|-81 51|-80 51|-52 51|-50 51|-28 51|-27 51|-101 52|-100 52|-99 52|-97 52|-96 52|-80 52|-28 52|-27 52|-102 53|-100 53|-99 53|-97 53|-96 53|-95 53|-83 53|-82 53|-81 53|-103 54|-98 54|-97 54|-95 54|-83 54|-81 54|-25 54|-24 54|-104 55|-95 55|-81 55|-24 55|-23 55|-104 56|-102 56|-100 56|-95 56|-24 56|-105 57|-100 57|-24 57|-23 57|-104 58|-96 58|-84 58|-83 58|-25 58|-24 58|-97 59|-84 59|-83 59|-82 59|-36 59|-35 59|-102 60|-98 60|-84 60|-82 60|-42 60|-41 60|-36 60|-35 60|-24 60|-94 61|-93 61|-92 61|-91 61|-42 61|-41 61|-26 61|-25 61|-24 61|-101 62|-100 62|-96 62|-91 62|-90 62|-23 62|-21 62|-97 63|-92 63|-91 63|-90 63|-25 63|-21 63|-20 63|64 63|-98 64|-92 64|-21 64|65 64|-91 65|-90 65|63 65|64 65|65 65|-100 66|-95 66|-94 66|-91 66|-90 66|-25 66|-24 66|-23 66|-100 67|-90 67|-44 67|-43 67|-98 68|-94 68|-91 68|-50 68|-49 68|-44 68|-43 68|-92 69|-50 69|-49 69|-96 70|-94 70|-93 70|-95 71|-10 73|-40 74|-11 74|-10 74|-9 74|-52 75|-51 75|-45 75|-44 75|-43 75|-41 75|-39 75|-38 75|-37 75|-36 75|-58 76|-57 76|-52 76|-51 76|-42 76|-41 76|-39 76|-13 76|-9 76|-4 76|-2 76|-58 77|-57 77|-44 77|-43 77|-38 77|-37 77|-35 77|-13 77|-8 77|-7 77|-5 77|-4 77|-3 77|-2 77|-1 77|-75 78|-74 78|-73 78|-71 78|-70 78|-33 78|-13 78|-10 78|-8 78|-5 78|-1 78|-76 79|-74 79|-73 79|-71 79|-70 79|-69 79|-35 79|-34 79|-32 79|-30 79|-29 79|-8 79|-77 80|-72 80|-71 80|-69 80|-33 80|-32 80|-30 80|1 80|2 80|-78 81|-69 81|-31 81|2 81|3 81|-78 82|-76 82|-74 82|-69 82|2 82|-79 83|-74 83|2 83|3 83|-78 84|-70 84|-28 84|1 84|2 84|-71 85|-31 85|-30 85|-29 85|-27 85|-26 85|-76 86|-72 86|-33 86|-32 86|-30 86|-29 86|-28 86|2 86|-29 87|0 87|1 87|2 87|-75 88|-74 88|-51 88|3 88|5 88|-30 89|1 89|5 89|6 89|-56 90|-54 90|-53 90|-30 90|5 90|-56 91|-54 91|-47 91|-30 91|-57 92|-52 92|-51 92|-47 92|-32 92|-30 92|1 92|2 92|3 92|-56 93|-47 93|-31 93|-56 94|-48 94|-43 95|-42 95|-41 95|-52 96|-42 96|-41 96|-39 96|-38 96|-42 97|-41 97|-39 97|-29 97|10 97|11 97|-42 98|-40 98|-29 98|-28 98|10 98|11 98|-42 99|-40 99|-28 99|-41 100|-40 100|-31 100|-29 100|-39 101|-32 101|-29 101|-42 102|-40 102|-32 102|-30 102|-43 103|-32 103|-30 103|-31 104|2 105|3 105|-41 106|-37 106|2 106|3 106|-45 107|-41 107|-39 108|-40 109|-39 109|-43 111|-42 111|-40 111|-39 111|-41 112|-6 113|-5 113|-25 114|-6 114|-5 114|-16 115|-15 115|-14 115|-30 116|-28 116|-27 116|-16 116|-14 116|-30 117|-28 117|-21 117|-18 117|-17 117|-14 117|-31 118|-26 118|-25 118|-21 118|-18 118|-17 118|-16 118|-30 119|-21 119|-18 119|-17 119|-16 119|-30 120|-22 120|-26 122|275 266|280 266|273 267|274 267|276 267|277 267|278 267|279 267|281 267|282 267|269 268|275 268|280 268|268 269|268 270|266 273|267 273|271 273|272 273|267 274|268 274|269 274|270 274|271 274|268 275|269 275|270 275|269 276|269 284|270 284|269 285|270 285";
