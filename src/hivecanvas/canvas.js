/* Copyright (C) 2019 Mark Phillips - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the GNU GPL-3.0 licence.
 *
 * A copy of the GNL Licence can be found at:
 * https://www.gnu.org/licenses/gpl-3.0.html
 */

// CANVAS for Hive repro

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = document.getElementById('canvas').getContext('2d');

// SOME KEY START PARAMETERS
let arrowDirection = "arrowRight"; // use switch and case to change direction
let moveForward = "moveRight"; // use switch to change calcs for movement
let stars = 11;
let speed = [250, 100, 50]
let playSpeed = speed[0];
let running = false;
let abort = false;
let gamePause = false;
let oneStep = false;



// BOARD GRID

let grid = [ // array 1) grid no. 2) background colour 3) star true/false 4) co-ordinates for drawing the box
    [0, "grey", false, 100, 100], [1, "grey", false, 136, 100], [2, "grey", false, 172, 100], [3, "grey", false, 208, 100], [4, "grey", false, 244, 100], [5, "grey", false, 280, 100], [6, "grey", false, 316, 100], [7, "grey", false, 352, 100], [8, "grey", false, 388, 100], [9, "grey", false, 424, 100],

    [10, "grey", false, 100, 136], [11, "orange", false, 136, 136], [12, "green", true, 172, 136], [13, "green", false, 208, 136], [14, "orange", false, 244, 136], [15, "green", false, 280, 136], [16, "green", true, 316, 136], [17, "green", false, 352, 136], [18, "blue", false, 388, 136], [19, "orange", true, 424, 136],

    [20, "grey", false, 100, 172], [21, "green", false, 136, 172], [22, "grey", false, 172, 172], [23, "grey", false, 208, 172], [24, "green", false, 244, 172], [25, "grey", false, 280, 172], [26, "grey", false, 316, 172], [27, "grey", false, 352, 172], [30, "green", false, 388, 172], [31, "grey", false, 424, 172],

    [30, "grey", false, 100, 208], [31, "green", false, 136, 208], [32, "grey", false, 172, 208], [33, "grey", false, 208, 208], [34, "green", false, 244, 208], [35, "grey", false, 280, 208], [36, "grey", false, 316, 208], [37, "grey", false, 352, 208], [38, "green", false, 388, 208], [39, "grey", false, 424, 208],

    [40, "grey", false, 100, 244], [41, "green", true, 136, 244], [42, "grey", false, 172, 244], [43, "grey", false, 208, 244], [44, "green", true, 244, 244], [45, "grey", false, 280, 244], [46, "grey", false, 316, 244], [47, "grey", false, 352, 244], [48, "green", true, 388, 244], [49, "grey", false, 424, 244],

    [50, "grey", false, 100, 280], [51, "green", true, 136, 280], [52, "grey", false, 172, 280], [53, "grey", false, 208, 280], [54, "green", true, 244, 280], [55, "grey", false, 280, 280], [56, "grey", false, 316, 280], [57, "grey", false, 352, 280], [58, "green", true, 388, 280], [59, "grey", false, 424, 280],

    [60, "grey", false, 100, 316], [61, "green", false, 136, 316], [62, "grey", false, 172, 316], [63, "grey", false, 208, 316], [64, "green", false, 244, 316], [65, "grey", false, 280, 316], [66, "grey", false, 316, 316], [67, "grey", false, 352, 316], [68, "green", false, 388, 316], [69, "grey", false, 424, 316],

    [70, "grey", false, 100, 352], [71, "green", false, 136, 352], [72, "grey", false, 172, 352], [73, "grey", false, 208, 352], [74, "green", false, 244, 352], [75, "grey", false, 280, 352], [76, "grey", false, 316, 352], [77, "grey", false, 352, 352], [78, "green", false, 388, 352], [79, "grey", false, 424, 352],

    [80, "grey", false, 100, 388], [81, "orange", false, 136, 388], [82, "green", true, 172, 388], [83, "green", false, 208, 388], [84, "orange", false, 244, 388], [85, "green", false, 280, 388], [86, "green", true, 316, 388], [87, "green", false, 352, 388], [88, "blue", false, 388, 388], [89, "grey", false, 424, 388],

    [90, "grey", false, 100, 424], [91, "grey", false, 136, 424], [92, "grey", false, 172, 424], [93, "grey", false, 208, 424], [94, "grey", false, 244, 424], [95, "grey", false, 280, 424], [96, "grey", false, 316, 424], [97, "grey", false, 352, 424], [98, "grey", false, 388, 424], [99, "grey", false, 424, 424]
];

let grid2 = [
    [0, "grey", false, 100, 100], [1, "grey", false, 136, 100], [2, "grey", false, 172, 100], [3, "grey", false, 208, 100], [4, "grey", false, 244, 100], [5, "grey", false, 280, 100], [6, "grey", false, 316, 100], [7, "grey", false, 352, 100], [8, "grey", false, 388, 100], [9, "grey", false, 424, 100],

    [10, "grey", false, 100, 136], [11, "orange", false, 136, 136], [12, "green", true, 172, 136], [13, "green", false, 208, 136], [14, "orange", false, 244, 136], [15, "green", false, 280, 136], [16, "green", true, 316, 136], [17, "green", false, 352, 136], [18, "blue", false, 388, 136], [19, "orange", true, 424, 136],

    [20, "grey", false, 100, 172], [21, "green", false, 136, 172], [22, "grey", false, 172, 172], [23, "grey", false, 208, 172], [24, "green", false, 244, 172], [25, "grey", false, 280, 172], [26, "grey", false, 316, 172], [27, "grey", false, 352, 172], [30, "green", false, 388, 172], [31, "grey", false, 424, 172],

    [30, "grey", false, 100, 208], [31, "green", false, 136, 208], [32, "grey", false, 172, 208], [33, "grey", false, 208, 208], [34, "green", false, 244, 208], [35, "grey", false, 280, 208], [36, "grey", false, 316, 208], [37, "grey", false, 352, 208], [38, "green", false, 388, 208], [39, "grey", false, 424, 208],

    [40, "grey", false, 100, 244], [41, "green", true, 136, 244], [42, "grey", false, 172, 244], [43, "grey", false, 208, 244], [44, "green", true, 244, 244], [45, "grey", false, 280, 244], [46, "grey", false, 316, 244], [47, "grey", false, 352, 244], [48, "green", true, 388, 244], [49, "grey", false, 424, 244],

    [50, "grey", false, 100, 280], [51, "green", true, 136, 280], [52, "grey", false, 172, 280], [53, "grey", false, 208, 280], [54, "green", true, 244, 280], [55, "grey", false, 280, 280], [56, "grey", false, 316, 280], [57, "grey", false, 352, 280], [58, "green", true, 388, 280], [59, "grey", false, 424, 280],

    [60, "grey", false, 100, 316], [61, "green", false, 136, 316], [62, "grey", false, 172, 316], [63, "grey", false, 208, 316], [64, "green", false, 244, 316], [65, "grey", false, 280, 316], [66, "grey", false, 316, 316], [67, "grey", false, 352, 316], [68, "green", false, 388, 316], [69, "grey", false, 424, 316],

    [70, "grey", false, 100, 352], [71, "green", false, 136, 352], [72, "grey", false, 172, 352], [73, "grey", false, 208, 352], [74, "green", false, 244, 352], [75, "grey", false, 280, 352], [76, "grey", false, 316, 352], [77, "grey", false, 352, 352], [78, "green", false, 388, 352], [79, "grey", false, 424, 352],

    [80, "grey", false, 100, 388], [81, "orange", false, 136, 388], [82, "green", true, 172, 388], [83, "green", false, 208, 388], [84, "orange", false, 244, 388], [85, "green", false, 280, 388], [86, "green", true, 316, 388], [87, "green", false, 352, 388], [88, "blue", false, 388, 388], [89, "grey", false, 424, 388],

    [90, "grey", false, 100, 424], [91, "grey", false, 136, 424], [92, "grey", false, 172, 424], [93, "grey", false, 208, 424], [94, "grey", false, 244, 424], [95, "grey", false, 280, 424], [96, "grey", false, 316, 424], [97, "grey", false, 352, 424], [98, "grey", false, 388, 424], [99, "grey", false, 424, 424]
];

// FUNCTION CONSTRUCTORS

function Slot(name, blueOn, orangeOn, greenOn, greyOn, xSlot, ySlot, boxActive, forwardOn, turnRightOn, turnLeftOn, f1On, orangePenOn, greenPenOn) {
    this.name = name;
    this.blueOn = blueOn;
    this.orangeOn = orangeOn;
    this.greenOn = greenOn;
    this.greyOn = greyOn;
    this.xSlot = xSlot;
    this.ySlot = ySlot;
    this.boxActive = boxActive;
    this.forwardOn = forwardOn;
    this.turnRightOn = turnRightOn;
    this.turnLeftOn = turnLeftOn;
    this.f1On = f1On;
    this.orangePenOn = orangePenOn;
    this.greenPenOn = greenPenOn;
}
Slot.prototype.values = function () {
    let valueSet = "Name:" + this.name + ", blue:" + this.blueOn + ", orange:" + this.orangeOn + ", green:" + this.greenOn + ", grey:" + this.greyOn + ", x:" + this.xSlot + ", y:" + this.ySlot + ", active:" + this.boxActive + ", forward:" + this.forwardOn + ", turn right:" + this.turnRightOn + ", turn left:" + this.turnLeftOn + ", f1:" + this.f1On + ", pen orange:" + this.orangePenOn + ", pen green:" + this.greenPenOn;
    return valueSet;
}

let slot1 = new Slot("slot1", false, false, false, true, 648, 260, true, false, false, false, false, false, false);
let slot2 = new Slot("slot2", false, false, false, true, 684, 260, false, false, false, false, false, false, false);
let slot3 = new Slot("slot3", false, false, false, true, 720, 260, false, false, false, false, false, false, false);
let slot4 = new Slot("slot4", false, false, false, true, 756, 260, false, false, false, false, false, false, false);
let slot5 = new Slot("slot5", false, false, false, true, 792, 260, false, false, false, false, false, false, false);
let slot6 = new Slot("slot6", false, false, false, true, 828, 260, false, false, false, false, false, false, false);

let slotSelect = [slot1, slot2, slot3, slot4, slot5, slot6];
let slot = slotSelect[0];


function Clicklayer(name, xClick, yClick, wClick, hClick) { // funSlot1 box
    this.name = name;
    this.xClick = xClick;
    this.yClick = yClick;
    this.wClick = wClick;
    this.hClick = hClick;
}

Clicklayer.prototype.values = function () {
    let valueSet = "Slot overlay no:" + this.name + ", x:" + this.xClick + ", y:" + this.yClick + ", w:" + this.wClick + ", h:" + this.hClick;
    return valueSet;
}

let box1 = new Clicklayer("1", 648, 260, 35, 35);
let box2 = new Clicklayer("2", 684, 260, 35, 35);
let box3 = new Clicklayer("3", 720, 260, 35, 35);
let box4 = new Clicklayer("4", 756, 260, 35, 35);
let box5 = new Clicklayer("5", 792, 260, 35, 35);
let box6 = new Clicklayer("6", 828, 260, 35, 35);


function Filterbox(name, xClick, yClick, wClick, hClick) {
    this.name = name;
    this.xClick = xClick;
    this.yClick = yClick;
    this.wClick = wClick;
    this.hClick = hClick;
}

// Color filter blue box
let filterBlue = new Filterbox("blue", 938, 224, 35, 35);
let filterOrange = new Filterbox("orange", 938, 260, 35, 35);
let filterGreen = new Filterbox("green", 938, 296, 35, 35);
let filterGrey = new Filterbox("grey", 938, 332, 35, 35);

Filterbox.prototype.values = function () {
    let valueSet = "Filter colour:" + this.name + ", x:" + this.xClick + ", y:" + this.yClick + ", w:" + this.wClick + ", h:" + this.hClick;
    return valueSet;
}

function Action(name, xClick, yClick, wClick, hClick) {
    this.name = name;
    this.xClick = xClick;
    this.yClick = yClick;
    this.wClick = wClick;
    this.hClick = hClick;
}

// Action symbols
let actionForward = new Action("forward", 900, 188, 35, 35);
let actionTurnRight = new Action("turnRight", 900, 224, 35, 35);
let actionTurnLeft = new Action("turnLeft", 900, 260, 35, 35);
let actionF1 = new Action("f1", 900, 296, 35, 35);
let actionOrangePen = new Action("orangePen", 900, 332, 35, 35);
let actionGreenPen = new Action("greenPen", 900, 368, 35, 35);

Action.prototype.values = function () {
    let valueSet = "Action:" + this.name + ", x:" + this.xClick + ", y:" + this.yClick + ", w:" + this.wClick + ", h:" + this.hClick;
    return valueSet;
}

// set active slot styling

Slot.prototype.boxActiveStyling = function () {
    if (slot1.boxActive === true) {
        ctx.fillStyle = "black";
        ctx.fillRect(slot1.xSlot, slot1.ySlot + 35, 35, 2);
    }
    else {
        ctx.fillStyle = "White";
        ctx.fillRect(slot1.xSlot, slot1.ySlot + 35, 35, 2);
    }
    if (slot2.boxActive === true) {
        ctx.fillStyle = "black";
        ctx.fillRect(slot2.xSlot, slot2.ySlot + 35, 35, 2);
    }
    else {
        ctx.fillStyle = "White";
        ctx.fillRect(slot2.xSlot, slot2.ySlot + 35, 35, 2);
    }
    if (slot3.boxActive === true) {
        ctx.fillStyle = "black";
        ctx.fillRect(slot3.xSlot, slot3.ySlot + 35, 35, 2);
    }
    else {
        ctx.fillStyle = "White";
        ctx.fillRect(slot3.xSlot, slot3.ySlot + 35, 35, 2);
    }
    if (slot4.boxActive === true) {
        ctx.fillStyle = "black";
        ctx.fillRect(slot4.xSlot, slot4.ySlot + 35, 35, 2);
    }
    else {
        ctx.fillStyle = "White";
        ctx.fillRect(slot4.xSlot, slot4.ySlot + 35, 35, 2);
    }
    if (slot5.boxActive === true) {
        ctx.fillStyle = "black";
        ctx.fillRect(slot5.xSlot, slot5.ySlot + 35, 35, 2);
    }
    else {
        ctx.fillStyle = "White";
        ctx.fillRect(slot5.xSlot, slot5.ySlot + 35, 35, 2);
    }
    if (slot6.boxActive === true) {
        ctx.fillStyle = "black";
        ctx.fillRect(slot6.xSlot, slot6.ySlot + 35, 35, 2);
    }
    else {
        ctx.fillStyle = "White";
        ctx.fillRect(slot6.xSlot, slot6.ySlot + 35, 35, 2);
    }
}

// move commmands to slots 

Slot.prototype.switchTo = function () {
    if (this.name === "slot1") {
        slot1.boxActive = true;
        slot2.boxActive = false;
        slot3.boxActive = false;
        slot4.boxActive = false;
        slot5.boxActive = false;
        slot6.boxActive = false;
        slot1.boxActiveStyling();
        console.log("slot 1 working");
        console.log(slot1.values());
        console.log("gridSquare colour:", grid[pSquare.value][1], "; arrowDirection (U,R,D,L):", arrow, "moveDirection, ", moveForward, "; number of stars:", stars);
        // up, right, down, left
    }
    if (this.name === "slot2") {
        slot1.boxActive = false;
        slot2.boxActive = true;
        slot3.boxActive = false;
        slot4.boxActive = false;
        slot5.boxActive = false;
        slot6.boxActive = false;
        slot2.boxActiveStyling();
        console.log("slot 2 working");
        console.log(slot2.values());

    }
    if (this.name === "slot3") {
        slot1.boxActive = false;
        slot2.boxActive = false;
        slot3.boxActive = true;
        slot4.boxActive = false;
        slot5.boxActive = false;
        slot6.boxActive = false;
        slot3.boxActiveStyling();
        console.log("slot 3 working");
        console.log(slot3.values());

    }
    if (this.name === "slot4") {
        slot1.boxActive = false;
        slot2.boxActive = false;
        slot3.boxActive = false;
        slot4.boxActive = true;
        slot5.boxActive = false;
        slot6.boxActive = false;
        slot4.boxActiveStyling();
        console.log("slot 4 working");
        console.log(slot4.values());

    }
    if (this.name === "slot5") {
        slot1.boxActive = false;
        slot2.boxActive = false;
        slot3.boxActive = false;
        slot4.boxActive = false;
        slot5.boxActive = true;
        slot6.boxActive = false;
        slot5.boxActiveStyling();
        console.log("slot 5 working");
        console.log(slot5.values());

    }
    if (this.name === "slot6") {
        slot1.boxActive = false;
        slot2.boxActive = false;
        slot3.boxActive = false;
        slot4.boxActive = false;
        slot5.boxActive = false;
        slot6.boxActive = true;
        slot6.boxActiveStyling();
        console.log("slot 6 working");
        console.log(slot6.values());
    }

}

Slot.prototype.zIndex = function () {
    if (this.forwardOn === true) {
        ctx.drawImage(atlas, 70, 0, 35, 35, this.xSlot, this.ySlot, 35, 35);
    }
    if (this.turnRightOn === true) {
        ctx.drawImage(action, 525, 0, 35, 35, this.xSlot, this.ySlot, 35, 35);
    }
    if (this.turnLeftOn === true) {
        ctx.drawImage(action, 560, 0, 35, 35, this.xSlot, this.ySlot, 35, 35);
    }
    if (this.f1On === true) {
        ctx.drawImage(action, 0, 0, 35, 35, this.xSlot, this.ySlot, 35, 35);
    }
    if (this.orangePenOn === true) {
        ctx.drawImage(action, 35, 0, 35, 35, this.xSlot, this.ySlot, 35, 35);
    }
    if (this.greenPenOn === true) {
        ctx.drawImage(action, 140, 0, 35, 35, this.xSlot, this.ySlot, 35, 35);
    }
}

Slot.prototype.cIndex = function () {
    if (this.blueOn === true) {
        ctx.drawImage(atlas, 105, 0, 35, 35, this.xSlot, this.ySlot, 35, 35);
    }
    if (this.greenOn === true) {
        ctx.drawImage(atlas, 175, 0, 35, 35, this.xSlot, this.ySlot, 35, 35);
    }
    if (this.orangeOn === true) {
        ctx.drawImage(atlas, 420, 0, 35, 35, this.xSlot, this.ySlot, 35, 35);
    }
    if (this.greyOn === true) {
        ctx.drawImage(atlas, 210, 0, 35, 35, this.xSlot, this.ySlot, 35, 35);
    }
}

// gameLoop parameters

let startArrow = function (id, value, xArrow, yArrow) { // creates an start arrow with co-ordinates
    this.id = id;
    this.value = value;
    this.xArrow = xArrow;
    this.yArrow = yArrow;
}
let arrow = [false, true, false, false]; // array for up, right, down, left

let pSquare = new startArrow(1, 0, 244, 136); // pSquare makes use of arrowFunction .value to identify grid number. Not sure about ID, not being used??
pSquare.value += 14;

let colourFillArrow = function () { // pSquare.value is where the arrow is now, 'action' is the image name (spriteSheet)
    if (grid[pSquare.value][1] === "green") { // filling in correct color behind arrow
        ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
    }
    if (grid[(pSquare.value)][1] === "orange") { // filling in correct color behind arrow
        ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
    }
    if (grid[(pSquare.value)][1] === "blue") { // filling in correct color behind arrow
        ctx.drawImage(action, 105, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
    }

    // picks the correct arrow image to match current direction
    if (arrow[0] === true) {
        ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
    }
    if (arrow[1] === true) {
        ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
    }
    if (arrow[2] === true) {
        ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
    }
    if (arrow[3] === true) {
        ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
    }
}



// BODY ONLOAD - DRAW CANVAS

// background onload - call sprite sheets
let back = new Image();
let atlas = new Image();
let action = new Image();


// Canvas first draws the board (atlas, drawBoard, drawFunctionSlots)
// Then Canvas draws the current game status on top 

back.onload = function () { // .onload calls the sprite sheets / images etc (back=game board)
    ctx.fillStyle = "#f1f1f1"; // #d3cfc7 for later
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(back, 0, 0, 480, 700, 550, 0, 480, 700); // clear function
    atlas.src = "images/boardTiles.png";
    atlas.onload = function () {
        
        // text
        ctx.font = "18px Helvetica";
        ctx.fillStyle = "#59534E";
        ctx.fillText("Execution", 282, 550);
        ctx.fillText("Speed", 137, 550);
        ctx.fillText("Functions", 647, 250);
        ctx.fillText("Commands", 888, 178);
        
        function drawBoard() {
            // outside grey boxes to enclose game
            ctx.fillStyle = '#bcc5cc';
            ctx.fillRect(0, 0, 80, innerHeight);
            ctx.fillRect(1020, 0, innerWidth-200, innerHeight);
            ctx.fillRect(0, 650, innerWidth, innerHeight-390);
            //ctx.fillRect(1150, 0, 1000, 800);

            ctx.drawImage(atlas, 420, 0, 35, 35, 136, 136, 35, 35); // 1st row left corner
            ctx.drawImage(atlas, 420, 0, 35, 35, 244, 136, 35, 35); // 1st row 4th
            ctx.drawImage(atlas, 420, 0, 35, 35, 424, 136, 35, 35); // 1st row 9th
            ctx.drawImage(atlas, 420, 0, 35, 35, 136, 388, 35, 35); // 9th row 1st
            ctx.drawImage(atlas, 420, 0, 35, 35, 244, 388, 35, 35); // 9th row 4th

            // player arrow
            ctx.drawImage(atlas, 385, 0, 35, 35, 244, 136, 35, 35); // 1st row 4th


            // blue x=105
            ctx.drawImage(atlas, 105, 0, 35, 35, 388, 136, 35, 35); // 1st row 8th
            ctx.drawImage(atlas, 105, 0, 35, 35, 388, 388, 35, 35); // 1st row 8th

            // Green x=175
            ctx.drawImage(atlas, 175, 0, 35, 35, 172, 136, 35, 35); // 1st row 2nd
            ctx.drawImage(atlas, 175, 0, 35, 35, 208, 136, 35, 35); // 1st row 3rd
            ctx.drawImage(atlas, 175, 0, 35, 35, 280, 136, 35, 35); // 1st row 5th
            ctx.drawImage(atlas, 175, 0, 35, 35, 316, 136, 35, 35); // 1st row 6th
            ctx.drawImage(atlas, 175, 0, 35, 35, 352, 136, 35, 35); // 1st row 7th

            ctx.drawImage(atlas, 175, 0, 35, 35, 136, 172, 35, 35); // 2nd row 7th
            ctx.drawImage(atlas, 175, 0, 35, 35, 244, 172, 35, 35); // 2nd row 4th
            ctx.drawImage(atlas, 175, 0, 35, 35, 388, 172, 35, 35); // 2nd row 8th

            ctx.drawImage(atlas, 175, 0, 35, 35, 136, 208, 35, 35); // 3rd row 7th
            ctx.drawImage(atlas, 175, 0, 35, 35, 244, 208, 35, 35); // 3rd row 4th
            ctx.drawImage(atlas, 175, 0, 35, 35, 388, 208, 35, 35); // 3rd row 8th

            ctx.drawImage(atlas, 175, 0, 35, 35, 136, 244, 35, 35); // 4th row 7th
            ctx.drawImage(atlas, 175, 0, 35, 35, 244, 244, 35, 35); // 4th row 4th
            ctx.drawImage(atlas, 175, 0, 35, 35, 388, 244, 35, 35); // 4th row 8th

            ctx.drawImage(atlas, 175, 0, 35, 35, 136, 280, 35, 35); // 5th row 7th
            ctx.drawImage(atlas, 175, 0, 35, 35, 244, 280, 35, 35); // 5th row 4th
            ctx.drawImage(atlas, 175, 0, 35, 35, 388, 280, 35, 35); // 5th row 8th

            ctx.drawImage(atlas, 175, 0, 35, 35, 136, 316, 35, 35); // 6th row 7th
            ctx.drawImage(atlas, 175, 0, 35, 35, 244, 316, 35, 35); // 6th row 4th
            ctx.drawImage(atlas, 175, 0, 35, 35, 388, 316, 35, 35); // 6th row 8th

            ctx.drawImage(atlas, 175, 0, 35, 35, 136, 352, 35, 35); // 7th row 7th
            ctx.drawImage(atlas, 175, 0, 35, 35, 244, 352, 35, 35); // 7th row 4th
            ctx.drawImage(atlas, 175, 0, 35, 35, 388, 352, 35, 35); // 7th row 8th

            // ctx.drawImage(atlas, 175, 0, 35, 35, 136, 388, 35, 35); // 8th row 7th
            // ctx.drawImage(atlas, 175, 0, 35, 35, 244, 388, 35, 35); // 8th row 4th
            // ctx.drawImage(atlas, 175, 0, 35, 35, 388, 388, 35, 35); // 8th row 8th

            ctx.drawImage(atlas, 175, 0, 35, 35, 172, 388, 35, 35); // 9th row 2nd
            ctx.drawImage(atlas, 175, 0, 35, 35, 208, 388, 35, 35); // 9th row 3rd
            ctx.drawImage(atlas, 175, 0, 35, 35, 280, 388, 35, 35); // 9th row 5th
            ctx.drawImage(atlas, 175, 0, 35, 35, 316, 388, 35, 35); // 9th row 6th
            ctx.drawImage(atlas, 175, 0, 35, 35, 352, 388, 35, 35); // 9th row 7th

            // stars x=490

            ctx.drawImage(atlas, 490, 0, 35, 35, 136, 244, 35, 35); // 4th row 7th
            ctx.drawImage(atlas, 490, 0, 35, 35, 244, 244, 35, 35); // 4th row 4th
            ctx.drawImage(atlas, 490, 0, 35, 35, 388, 244, 35, 35); // 4th row 8th

            ctx.drawImage(atlas, 490, 0, 35, 35, 136, 280, 35, 35); // 5th row 7th
            ctx.drawImage(atlas, 490, 0, 35, 35, 244, 280, 35, 35); // 5th row 4th
            ctx.drawImage(atlas, 490, 0, 35, 35, 388, 280, 35, 35); // 5th row 8th

            ctx.drawImage(atlas, 490, 0, 35, 35, 172, 136, 35, 35); // 1st row 2nd
            ctx.drawImage(atlas, 490, 0, 35, 35, 316, 136, 35, 35); // 1st row 6th
            ctx.drawImage(atlas, 490, 0, 35, 35, 172, 388, 35, 35); // 1st row 2nd
            ctx.drawImage(atlas, 490, 0, 35, 35, 316, 388, 35, 35); // 1st row 6th

            ctx.drawImage(atlas, 490, 0, 35, 35, 424, 136, 35, 35); // 1st row 9th

            // commands

            ctx.drawImage(atlas, 210, 0, 35, 35, 900, 188, 35, 35); // top row grey tile
            ctx.drawImage(atlas, 210, 0, 35, 35, 900, 224, 35, 35); // 2nd row grey tile
            ctx.drawImage(atlas, 210, 0, 35, 35, 900, 260, 35, 35); // 3rd row grey tile
            ctx.drawImage(atlas, 210, 0, 35, 35, 900, 296, 35, 35); // 4th row grey tile
            ctx.drawImage(atlas, 210, 0, 35, 35, 900, 332, 35, 35); // 5th row grey tile
            ctx.drawImage(atlas, 210, 0, 35, 35, 900, 368, 35, 35); // 6th row grey tile


            ctx.drawImage(atlas, 70, 0, 35, 35, 900, 188, 35, 35); // forward arrow
            ctx.drawImage(atlas, 525, 0, 35, 35, 900, 224, 35, 35); // right arrow
            ctx.drawImage(atlas, 560, 0, 35, 35, 900, 260, 35, 35); // left arrow
            ctx.drawImage(atlas, 0, 0, 35, 35, 900, 296, 35, 35); // F1
            ctx.drawImage(atlas, 35, 0, 35, 35, 900, 332, 35, 35); // orangePen
            ctx.drawImage(atlas, 140, 0, 35, 35, 900, 368, 35, 35); // GreenPen

            // instructions filter colours

            ctx.drawImage(atlas, 105, 0, 35, 35, 938, 224, 35, 35); // blue
            ctx.drawImage(atlas, 420, 0, 35, 35, 938, 260, 35, 35); // orange
            ctx.drawImage(atlas, 175, 0, 35, 35, 938, 296, 35, 35); // green

            // execution controls

            ctx.drawImage(atlas, 210, 0, 35, 35, 280, 560, 35, 35); // grey back tile
            ctx.drawImage(atlas, 210, 0, 35, 35, 316, 560, 35, 35); // grey back tile
            ctx.drawImage(atlas, 210, 0, 35, 35, 352, 560, 35, 35); // grey back tile
            ctx.drawImage(atlas, 210, 0, 35, 35, 388, 560, 35, 35); // grey back tile
            ctx.drawImage(atlas, 210, 0, 35, 35, 424, 560, 35, 35); // grey back tile

            ctx.drawImage(atlas, 315, 0, 35, 35, 280, 560, 35, 35); // play function
            ctx.drawImage(atlas, 245, 0, 35, 35, 316, 560, 35, 35); // play 1 step
            ctx.drawImage(atlas, 280, 0, 35, 35, 352, 560, 35, 35); // pause function
            ctx.drawImage(atlas, 350, 0, 35, 35, 388, 560, 35, 35); // stop function
            ctx.drawImage(atlas, 455, 0, 35, 35, 424, 560, 35, 35); // clear function

            ctx.fillStyle = "black";
            ctx.fillRect(slot1.xSlot, slot1.ySlot + 35, 35, 2);
            ctx.fillStyle = "White";
            ctx.fillRect(slot2.xSlot, slot2.ySlot + 35, 35, 2);
            ctx.fillRect(slot3.xSlot, slot3.ySlot + 35, 35, 2);
            ctx.fillRect(slot4.xSlot, slot4.ySlot + 35, 35, 2);
            ctx.fillRect(slot5.xSlot, slot5.ySlot + 35, 35, 2);
            ctx.fillRect(slot6.xSlot, slot6.ySlot + 35, 35, 2);



        }
        function drawFunctionSlots() {
            // instructions box

            ctx.drawImage(atlas, 0, 0, 35, 35, 612, 260, 35, 35); // F1 text
            ctx.drawImage(atlas, 210, 0, 35, 35, 648, 260, 35, 35); // 1st column grey tile - grey
            ctx.drawImage(atlas, 210, 0, 35, 35, 684, 260, 35, 35); // 2nd column grey tile - grey
            ctx.drawImage(atlas, 210, 0, 35, 35, 720, 260, 35, 35); // 3rd column grey tile - grey
            ctx.drawImage(atlas, 210, 0, 35, 35, 756, 260, 35, 35); // 4th column grey tile - grey
            ctx.drawImage(atlas, 210, 0, 35, 35, 792, 260, 35, 35); // 5th column grey tile - grey
            ctx.drawImage(atlas, 210, 0, 35, 35, 828, 260, 35, 35); // 6th column grey tile - grey

            // instructions speed

            ctx.drawImage(atlas, 665, 0, 35, 35, 136, 560, 35, 35); // x1 on=630
            ctx.drawImage(atlas, 700, 0, 35, 35, 172, 560, 35, 35); // x2 off on=735
            ctx.drawImage(atlas, 770, 0, 35, 35, 208, 560, 35, 35); // x3 off on=805

            // gameLoop animation boxes

            //ctx.drawImage(atlas, 0, 0, 35, 35, 135, 64, 40, 40); // F1
            ctx.drawImage(action, 840, 0, 35, 35, 176, 64, 40, 40); // slot 1
            ctx.drawImage(action, 840, 0, 35, 35, 217, 64, 40, 40); // slot 2
            ctx.drawImage(action, 840, 0, 35, 35, 258, 64, 40, 40); // slot 3
            ctx.drawImage(action, 840, 0, 35, 35, 299, 64, 40, 40); // slot 4
            ctx.drawImage(action, 840, 0, 35, 35, 340, 64, 40, 40); // slot 5
            ctx.drawImage(action, 840, 0, 35, 35, 381, 64, 40, 40); // slot 6
        }
        drawBoard();
        drawFunctionSlots();



        // EVENT LISTENERS & BUTTON BEHAVIOURS

        // switching between slots - set as active
        canvas.addEventListener('click', function (event) {
            // Control that the click event occurred within position of button
            // NOTE: This assumes canvas element is positioned at top left corner 
            // TEST

            if ( // switch for making slot active
                event.x > box1.xClick + 8 &&
                event.x < box1.xClick + box1.wClick + 8 &&
                event.y > box1.yClick + 58 &&
                event.y < box1.yClick + box1.hClick + 58
            ) {
                slot1.switchTo();

            }
            if ( // switch for making slot active
                event.x > box2.xClick + 7 && // this is the 35 offset horiz left
                event.x < box2.xClick + box2.wClick + 8 && // this is the 35 offest horiz right
                event.y > box2.yClick + 58 && // this is the 35 offset for vertical top
                event.y < box2.yClick + box2.hClick + 58 // this is the 35 offest for vertical bottom
            ) {
                slot2.switchTo();
            }
            if ( // switch for making slot active
                event.x > box3.xClick + 8 && // this is the 35 offset horiz left
                event.x < box3.xClick + box3.wClick + 8 && // this is the 35 offest horiz right
                event.y > box3.yClick + 58 && // this is the 35 offset for vertical top
                event.y < box3.yClick + box3.hClick + 58 // this is the 35 offest for vertical bottom
            ) {
                slot3.switchTo();
            }
            if ( // switch for making slot active
                event.x > box4.xClick + 8 && // this is the 35 offset horiz left
                event.x < box4.xClick + box4.wClick + 8 && // this is the 35 offest horiz right
                event.y > box4.yClick + 58 && // this is the 35 offset for vertical top
                event.y < box4.yClick + box4.hClick + 58 // this is the 35 offest for vertical bottom
            ) {
                slot4.switchTo();
            }
            if ( // switch for making slot active
                event.x > box5.xClick + 8 && // this is the 35 offset horiz left
                event.x < box5.xClick + box5.wClick + 8 && // this is the 35 offest horiz right
                event.y > box5.yClick + 58 && // this is the 35 offset for vertical top
                event.y < box5.yClick + box5.hClick + 58 // this is the 35 offest for vertical bottom
            ) {

                slot5.switchTo();
            }
            if ( // switch for making slot active
                event.x > box6.xClick + 8 && // this is the 35 offset horiz left
                event.x < box6.xClick + box6.wClick + 8 && // this is the 35 offest horiz right
                event.y > box6.yClick + 58 && // this is the 35 offset for vertical top
                event.y < box6.yClick + box6.hClick + 58 // this is the 35 offest for vertical bottom
            ) {
                slot6.switchTo();
            }
        });

        // filter color key press - sending colour info to slots
        canvas.addEventListener('click', function (event) {

            if ( // blue button was pressed
                event.x > filterBlue.xClick + 8 && // this is the 35 offset horiz left
                event.x < filterBlue.xClick + filterBlue.wClick + 8 && // this is the 35 offest horiz right
                event.y > filterBlue.yClick + 58 && // this is the 35 offset for vertical top
                event.y < filterBlue.yClick + filterBlue.hClick + 58 // this is the 35 offest for vertical bottom
            ) {
                // Slot 1
                if (slot1.blueOn === false && slot1.boxActive === true) {
                    ctx.drawImage(atlas, 105, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                    slot1.blueOn = true;
                    slot1.orangeOn = false;
                    slot1.greenOn = false;
                    slot1.greyOn = false;
                    slot1.zIndex();
                }
                else if (slot1.blueOn === true && slot1.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                    slot1.blueOn = false;
                    slot1.orangeOn = false;
                    slot1.greenOn = false;
                    slot1.greyOn = true;
                    slot1.zIndex();

                }
                // slot 2
                if (slot2.blueOn === false && slot2.boxActive === true) {
                    ctx.drawImage(atlas, 105, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                    slot2.blueOn = true;
                    slot2.orangeOn = false;
                    slot2.greenOn = false;
                    slot2.greyOn = false;
                    slot2.zIndex();

                }
                else if (slot2.blueOn === true && slot2.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                    slot2.blueOn = false;
                    slot2.orangeOn = false;
                    slot2.greenOn = false;
                    slot2.greyOn = true;
                    slot2.zIndex();

                }
                //  slot 3
                if (slot3.blueOn === false && slot3.boxActive === true) {
                    ctx.drawImage(atlas, 105, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                    slot3.blueOn = true;
                    slot3.orangeOn = false;
                    slot3.greenOn = false;
                    slot3.greyOn = false;
                    slot3.zIndex();
                }
                else if (slot3.blueOn === true && slot3.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                    slot3.blueOn = false;
                    slot3.orangeOn = false;
                    slot3.greenOn = false;
                    slot3.greyOn = true;
                    slot3.zIndex();
                }
                // slot 4

                if (slot4.blueOn === false && slot4.boxActive === true) {
                    ctx.drawImage(atlas, 105, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                    slot4.blueOn = true;
                    slot4.orangeOn = false;
                    slot4.greenOn = false;
                    slot4.greyOn = false;
                    slot4.zIndex();
                }
                else if (slot4.blueOn === true && slot4.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                    slot4.blueOn = false;
                    slot4.orangeOn = false;
                    slot4.greenOn = false;
                    slot4.greyOn = true;
                    slot4.zIndex();
                }
                // slot 5
                if (slot5.blueOn === false && slot5.boxActive === true) {
                    ctx.drawImage(atlas, 105, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                    slot5.blueOn = true;
                    slot5.orangeOn = false;
                    slot5.greenOn = false;
                    slot5.greyOn = false;
                    slot5.zIndex();
                }
                else if (slot5.blueOn === true && slot5.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                    slot5.blueOn = false;
                    slot5.orangeOn = false;
                    slot5.greenOn = false;
                    slot5.greyOn = true;
                    slot5.zIndex();
                }
                // slot 6
                if (slot6.blueOn === false && slot6.boxActive === true) {
                    ctx.drawImage(atlas, 105, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                    slot6.blueOn = true;
                    slot6.orangeOn = false;
                    slot6.greenOn = false;
                    slot6.greyOn = false;
                    slot6.zIndex();
                }
                else if (slot6.blueOn === true && slot6.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                    slot6.blueOn = false;
                    slot6.orangeOn = false;
                    slot6.greenOn = false;
                    slot6.greyOn = true;
                    slot6.zIndex();
                }
            }
            if ( // orange button is pressed
                event.x > filterOrange.xClick + 8 && // this is the 35 offset horiz left
                event.x < filterOrange.xClick + filterOrange.wClick + 8 && // this is the 35 offest horiz right
                event.y > filterOrange.yClick + 58 && // this is the 35 offset for vertical top
                event.y < filterOrange.yClick + filterOrange.hClick + 58 // this is the 35 offest for vertical bottom
            ) {
                // Slot 1
                if (slot1.orangeOn === false && slot1.boxActive === true) { // check that orange button is OFF
                    ctx.drawImage(atlas, 420, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                    slot1.blueOn = false;
                    slot1.orangeOn = true;
                    slot1.greenOn = false;
                    slot1.greyOn = false;
                    slot1.zIndex();
                } else if (slot1.orangeOn === true && slot1.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                    slot1.blueOn = false;
                    slot1.orangeOn = false;
                    slot1.greenOn = false;
                    slot1.greyOn = true;
                    slot1.zIndex();
                }
                // slot 2
                if (slot2.orangeOn === false && slot2.boxActive === true) { // check that orange button is OFF
                    ctx.drawImage(atlas, 420, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                    slot2.blueOn = false;
                    slot2.orangeOn = true;
                    slot2.greenOn = false;
                    slot2.greyOn = false;
                    slot2.zIndex();
                }
                else if (slot2.orangeOn === true && slot2.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                    slot2.blueOn = false;
                    slot2.orangeOn = false;
                    slot2.greenOn = false;
                    slot2.greyOn = true;
                    slot2.zIndex();
                }
                //  slot 3
                if (slot3.orangeOn === false && slot3.boxActive === true) { // check that orange button is OFF
                    ctx.drawImage(atlas, 420, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                    slot3.blueOn = false;
                    slot3.orangeOn = true;
                    slot3.greenOn = false;
                    slot3.greyOn = false;
                    slot3.zIndex();
                }
                else if (slot3.orangeOn === true && slot3.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                    slot3.blueOn = false;
                    slot3.orangeOn = true;
                    slot3.greenOn = false;
                    slot3.greyOn = false;
                    slot3.zIndex();
                }
                // slot 4
                if (slot4.orangeOn === false && slot4.boxActive === true) { // check that orange button is OFF
                    ctx.drawImage(atlas, 420, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                    slot4.blueOn = false;
                    slot4.orangeOn = true;
                    slot4.greenOn = false;
                    slot4.greyOn = false;
                    slot4.zIndex();
                }
                else if (slot4.orangeOn === true && slot4.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                    slot4.blueOn = false;
                    slot4.orangeOn = false;
                    slot4.greenOn = false;
                    slot4.greyOn = true;
                    slot4.zIndex();
                }
                // slot 5
                if (slot5.orangeOn === false && slot5.boxActive === true) { // check that orange button is OFF
                    ctx.drawImage(atlas, 420, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                    slot5.blueOn = false;
                    slot5.orangeOn = true;
                    slot5.greenOn = false;
                    slot5.greyOn = false;
                    slot5.zIndex();

                }
                else if (slot5.orangeOn === true && slot5.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                    slot5.blueOn = false;
                    slot5.orangeOn = false;
                    slot5.greenOn = false;
                    slot5.greyOn = true;
                    slot5.zIndex();
                }
                // slot 6
                if (slot6.orangeOn === false && slot6.boxActive === true) { // check that orange button is OFF
                    ctx.drawImage(atlas, 420, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                    slot6.blueOn = false;
                    slot6.orangeOn = true;
                    slot6.greenOn = false;
                    slot6.greyOn = false;
                    slot6.zIndex();
                }
                else if (slot6.orangeOn === true && slot6.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                    slot6.blueOn = false;
                    slot6.orangeOn = false;
                    slot6.greenOn = false;
                    slot6.greyOn = true;
                    slot6.zIndex();
                }
            }

            if ( // Green button is pressed
                event.x > filterGreen.xClick + 8 && // this is the 35 offset horiz left
                event.x < filterGreen.xClick + filterGreen.wClick + 8 && // this is the 35 offest horiz right
                event.y > filterGreen.yClick + 58 && // this is the 35 offset for vertical top
                event.y < filterGreen.yClick + filterGreen.hClick + 58 // this is the 35 offest for vertical bottom
            ) {
                // Slot 1
                if (slot1.greenOn === false && slot1.boxActive === true) { // check that green button is OFF
                    ctx.drawImage(atlas, 175, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                    slot1.blueOn = false;
                    slot1.orangeOn = false;
                    slot1.greenOn = true;
                    slot1.greyOn = false;
                    slot1.zIndex();

                }
                else if (slot1.greenOn === true && slot1.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                    slot1.blueOn = false;
                    slot1.orangeOn = false;
                    slot1.greenOn = false;
                    slot1.greyOn = true;
                    slot1.zIndex();
                }
                // slot 2

                if (slot2.greenOn === false && slot2.boxActive === true) { // check that green button is OFF
                    ctx.drawImage(atlas, 175, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                    slot2.blueOn = false;
                    slot2.orangeOn = false;
                    slot2.greenOn = true;
                    slot2.greyOn = false;
                    slot2.zIndex();
                }
                else if (slot2.greenOn === true && slot2.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                    slot2.blueOn = false;
                    slot2.orangeOn = false;
                    slot2.greenOn = false;
                    slot2.greyOn = true;
                    slot2.zIndex();
                }
                //  slot 3
                if (slot3.greenOn === false && slot3.boxActive === true) { // check that green button is OFF
                    ctx.drawImage(atlas, 175, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                    slot3.blueOn = false;
                    slot3.orangeOn = false;
                    slot3.greenOn = true;
                    slot3.greyOn = false;
                    slot3.zIndex();
                }
                else if (slot3.greenOn === true && slot3.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                    slot3.blueOn = false;
                    slot3.orangeOn = false;
                    slot3.greenOn = false;
                    slot3.greyOn = true;
                    slot3.zIndex();
                }
                // slot 4
                if (slot4.greenOn === false && slot4.boxActive === true) { // check that green button is OFF
                    ctx.drawImage(atlas, 175, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                    slot4.blueOn = false;
                    slot4.orangeOn = false;
                    slot4.greenOn = true;
                    slot4.greyOn = false;
                    slot4.zIndex();
                }
                else if (slot4.greenOn === true && slot4.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                    slot4.blueOn = false;
                    slot4.orangeOn = false;
                    slot4.greenOn = false;
                    slot4.greyOn = true;
                    slot4.zIndex();
                }
                // slot 5
                if (slot5.greenOn === false && slot5.boxActive === true) { // check that green button is OFF
                    ctx.drawImage(atlas, 175, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                    slot5.blueOn = false;
                    slot5.orangeOn = false;
                    slot5.greenOn = true;
                    slot5.greyOn = false;
                    slot5.zIndex();
                }
                else if (slot5.greenOn === true && slot5.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                    slot5.blueOn = false;
                    slot5.orangeOn = false;
                    slot5.greenOn = false;
                    slot5.greyOn = true;
                    slot5.zIndex();
                }
                // slot 6
                if (slot6.greenOn === false && slot6.boxActive === true) { // check that green button is OFF
                    ctx.drawImage(atlas, 175, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                    slot6.blueOn = false;
                    slot6.orangeOn = false;
                    slot6.greenOn = true;
                    slot6.greyOn = false;
                    slot6.zIndex();
                }
                else if (slot6.greenOn === true && slot6.boxActive === true) {
                    ctx.drawImage(atlas, 210, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                    slot6.blueOn = false;
                    slot6.orangeOn = false;
                    slot6.greenOn = false;
                    slot6.greyOn = true;
                    slot6.zIndex();
                }
            }
        });

        // full board reset (x)
        canvas.addEventListener('click', function (event) {

            if ( // clear button was pressed
                event.x > 424 + 8 && // this is the 35 offset horiz left
                event.x < 424 + 35 + 8 && // this is the 35 offest horiz right
                event.y > 560 + 58 && // this is the 35 offset for vertical top
                event.y < 560 + 35 + 58 // this is the 35 offest for vertical bottom
            ) {
                fullBoardReset();
            }
        });

        // stop (grid reset)
        canvas.addEventListener('click', function (event) {

            if ( // clear button was pressed
                event.x > 388 + 8 && // this is the 35 offset horiz left
                event.x < 388 + 35 + 8 && // this is the 35 offest horiz right
                event.y > 560 + 58 && // this is the 35 offset for vertical top
                event.y < 560 + 35 + 58 // this is the 35 offest for vertical bottom
            ) {
                abort = true;
                slot = slotSelect[0];
                gridOnlyReset();
            }
        });

        // one-step play
        canvas.addEventListener('click', function (event) {

            if ( // one-step play button was pressed
                event.x > 316 + 8 && // this is the 35 offset horiz left
                event.x < 316 + 35 + 8 && // this is the 35 offest horiz right
                event.y > 560 + 58 && // this is the 35 offset for vertical top
                event.y < 560 + 35 + 58 // this is the 35 offest for vertical bottom
            ) {
                running = true;
                oneStep = true;
                switch (slot) {
                    case slotSelect[0]:
                        slotAnimClear();
                        slotRun1();
                        break;
                    case slotSelect[1]:
                        slotRun2();
                        break;
                    case slotSelect[2]:
                        slotRun3();
                        break;
                    case slotSelect[3]:
                        slotRun4();
                        break;
                    case slotSelect[4]:
                        slotRun5();
                        break;
                    case slotSelect[5]:
                        if (slot.f1On === true) { // f1 check
                            ctx.globalAlpha = 0.9;
                            slot6Anim();
                            ctx.globalAlpha = 1;
                            console.log("oneStep - slot 6 - F1 return");
                            slot = slotSelect[0]
                            break;
                        }
                        else { // f1 fail - game over
                            movePlayer();
                            function badNews() {
                                alert("No more commands received and there are still stars remaining - GAME OVER!");
                            }
                            function gridStuff() {
                                gridOnlyReset();
                            }
                            setTimeout(badNews, 400);
                            setTimeout(gridStuff, 700);
                            slot = slotSelect[0];
                            oneStep = true;
                            running = false;
                            break;
                        }
                }
            }
        });

        // play 
        canvas.addEventListener('click', function (playButton) {

            if ( // play button was pressed
                playButton.x > 280 + 8 && // this is the 35 offset horiz left
                playButton.x < 280 + 35 + 8 && // this is the 35 offest horiz right
                playButton.y > 560 + 58 && // this is the 35 offset for vertical top
                playButton.y < 560 + 35 + 58 // this is the 35 offest for vertical bottom
            ) {
                console.log("play button pressed");
                ctx.drawImage(action, 980, 0, 35, 35, 280, 560, 35, 35); // play on
                ctx.drawImage(atlas, 210, 0, 35, 35, 352, 560, 35, 35); // grey back tile
                ctx.drawImage(atlas, 280, 0, 35, 35, 352, 560, 35, 35); // pause off
                running = true;
                gamePause = false;
                abort = false;
                if (oneStep === true) { playOneStep(); }
                else gameLoop();
            }
        });

        // pause 
        canvas.addEventListener('click', function (event) {

            if ( // pause button was pressed
                event.x > 352 + 8 && // this is the 35 offset horiz left
                event.x < 352 + 35 + 8 && // this is the 35 offest horiz right
                event.y > 560 + 58 && // this is the 35 offset for vertical top
                event.y < 560 + 35 + 58 // this is the 35 offest for vertical bottom
            ) {
                playSpeed = 150;
                function wait() {
                    if (slot === slotSelect[0]) {
                        switch (gamePause) {
                            case false:
                                gamePause = true;
                                ctx.drawImage(action, 1015, 0, 35, 35, 352, 560, 35, 35); // pause on
                                ctx.drawImage(atlas, 210, 0, 35, 35, 280, 560, 35, 35); // grey back tile
                                ctx.drawImage(atlas, 315, 0, 35, 35, 280, 560, 35, 35); // play off
                                console.log("Game paused!");
                                running = false;
                                playSpeed = speed[0];
                                ctx.drawImage(action, 665, 0, 35, 35, 136, 560, 35, 35);
                                ctx.drawImage(action, 700, 0, 35, 35, 172, 560, 35, 35);
                                ctx.drawImage(action, 770, 0, 35, 35, 208, 560, 35, 35);
                                abort = true; // code snippet 1
                                break;
                            case true:
                                gamePause = false;
                                ctx.drawImage(atlas, 210, 0, 35, 35, 352, 560, 35, 35); // grey back tile
                                ctx.drawImage(atlas, 280, 0, 35, 35, 352, 560, 35, 35); // pause off
                                console.log("Pause ended!");
                                abort = false; // code snippet 2
                                running = true;
                                playSpeed = speed[0];
                                ctx.drawImage(action, 665, 0, 35, 35, 136, 560, 35, 35);
                                ctx.drawImage(action, 700, 0, 35, 35, 172, 560, 35, 35);
                                ctx.drawImage(action, 770, 0, 35, 35, 208, 560, 35, 35);
                                slotMain();

                        }
                    } else {
                        setTimeout(wait, 20);
                    }
                }
                wait();
            }
        });

        // speed x1
        canvas.addEventListener('click', function (event) {

            if ( // x1 speed button was pressed
                event.x > 136 + 8 && // this is the 35 offset horiz left
                event.x < 136 + 35 + 8 && // this is the 35 offest horiz right
                event.y > 560 + 58 && // this is the 35 offset for vertical top
                event.y < 560 + 35 + 58 // this is the 35 offest for vertical bottom
            ) {
                ctx.drawImage(action, 665, 0, 35, 35, 136, 560, 35, 35);
                ctx.drawImage(action, 700, 0, 35, 35, 172, 560, 35, 35);
                ctx.drawImage(action, 770, 0, 35, 35, 208, 560, 35, 35);
                playSpeed = speed[0];
                console.log("x1 speed selected");
                console.log("speed: ", playSpeed);
                console.log("Player Square: ", pSquare.value);
                console.log("number of stars: ", stars);
                console.log("Active slot: ", slot);
                console.log("abort on: ", abort);
                console.log("running: ", running);
                console.log("Game paused: ", gamePause);
                console.log("One step: ", oneStep);
                ctx.globalAlpha = 0.1;
                slot1Anim();
                slot2Anim();
                slot3Anim();
                slot4Anim();
                slot5Anim();
                slot6Anim();
                ctx.globalAlpha = 1;



            }
        });

        // speed x2
        canvas.addEventListener('click', function (event) {

            if ( // x2 speed button was pressed
                event.x > 172 + 8 && // this is the 35 offset horiz left
                event.x < 172 + 35 + 8 && // this is the 35 offest horiz right
                event.y > 560 + 58 && // this is the 35 offset for vertical top
                event.y < 560 + 35 + 58 // this is the 35 offest for vertical bottom
            ) {
                ctx.drawImage(action, 630, 0, 35, 35, 136, 560, 35, 35);
                ctx.drawImage(action, 735, 0, 35, 35, 172, 560, 35, 35);
                ctx.drawImage(action, 770, 0, 35, 35, 208, 560, 35, 35);
                console.log("x2 speed selected");
                playSpeed = speed[1];
                console.log(playSpeed);
            }
        });

        // speed x3
        canvas.addEventListener('click', function (event) {

            if ( // x3 speed button was pressed
                event.x > 208 + 8 && // this is the 35 offset horiz left
                event.x < 208 + 35 + 8 && // this is the 35 offest horiz right
                event.y > 560 + 58 && // this is the 35 offset for vertical top
                event.y < 560 + 35 + 58 // this is the 35 offest for vertical bottom
            ) {
                ctx.drawImage(action, 630, 0, 35, 35, 136, 560, 35, 35);
                ctx.drawImage(action, 700, 0, 35, 35, 172, 560, 35, 35);
                ctx.drawImage(action, 805, 0, 35, 35, 208, 560, 35, 35);
                console.log("x3 speed selected");
                playSpeed = speed[2];
                console.log(playSpeed);
            }
        });

        // pause keyboard binding: p

        document.onkeydown = function (f) { // P key on keyboard pauses game
            if (f.keyCode == 80) {
                console.log("Yep, pause button was pressed");
                running = true;
                console.log(running);
            }
        }

        // select box keyboard binding: keyboard keys a & d move between slots
        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 65:
                    if (slot1.boxActive === true) {
                        alert('You are at the beginning - cannot go left');
                        break;
                    }
                    if (slot2.boxActive === true) {
                        slot1.boxActive = true;
                        slot2.boxActive = false;
                        slot3.boxActive = false;
                        slot4.boxActive = false;
                        slot5.boxActive = false;
                        slot6.boxActive = false;
                        //console.log(slot1.values());
                        slot1.boxActiveStyling();
                        break;
                    }
                    if (slot3.boxActive === true) {
                        slot1.boxActive = false;
                        slot2.boxActive = true;
                        slot3.boxActive = false;
                        slot4.boxActive = false;
                        slot5.boxActive = false;
                        slot6.boxActive = false;
                        //console.log(slot1.values());
                        slot2.boxActiveStyling();
                        break;
                    }
                    if (slot4.boxActive === true) {
                        slot1.boxActive = false;
                        slot2.boxActive = false;
                        slot3.boxActive = true;
                        slot4.boxActive = false;
                        slot5.boxActive = false;
                        slot6.boxActive = false;
                        //console.log(slot1.values());
                        slot3.boxActiveStyling();
                        break;
                    }
                    if (slot5.boxActive === true) {
                        slot1.boxActive = false;
                        slot2.boxActive = false;
                        slot3.boxActive = false;
                        slot4.boxActive = true;
                        slot5.boxActive = false;
                        slot6.boxActive = false;
                        //console.log(slot1.values());
                        slot4.boxActiveStyling();
                        break;
                    }
                    if (slot6.boxActive === true) {
                        slot1.boxActive = false;
                        slot2.boxActive = false;
                        slot3.boxActive = false;
                        slot4.boxActive = false;
                        slot5.boxActive = true;
                        slot6.boxActive = false;
                        //console.log(slot1.values());
                        slot5.boxActiveStyling();
                        break;
                    }
                case 68:
                    if (slot1.boxActive === true) {
                        slot1.boxActive = false;
                        slot2.boxActive = true;
                        slot3.boxActive = false;
                        slot4.boxActive = false;
                        slot5.boxActive = false;
                        slot6.boxActive = false;
                        //console.log(slot1.values());
                        slot2.boxActiveStyling();
                        break;
                    }
                    if (slot2.boxActive === true) {
                        slot1.boxActive = false;
                        slot2.boxActive = false;
                        slot3.boxActive = true;
                        slot4.boxActive = false;
                        slot5.boxActive = false;
                        slot6.boxActive = false;
                        //console.log(slot1.values());
                        slot3.boxActiveStyling();
                        break;
                    }
                    if (slot3.boxActive === true) {
                        slot1.boxActive = false;
                        slot2.boxActive = false;
                        slot3.boxActive = false;
                        slot4.boxActive = true;
                        slot5.boxActive = false;
                        slot6.boxActive = false;
                        //console.log(slot1.values());
                        slot4.boxActiveStyling();
                        break;
                    }
                    if (slot4.boxActive === true) {
                        slot1.boxActive = false;
                        slot2.boxActive = false;
                        slot3.boxActive = false;
                        slot4.boxActive = false;
                        slot5.boxActive = true;
                        slot6.boxActive = false;
                        //console.log(slot1.values());
                        slot5.boxActiveStyling();
                        break;
                    }
                    if (slot5.boxActive === true) {
                        slot1.boxActive = false;
                        slot2.boxActive = false;
                        slot3.boxActive = false;
                        slot4.boxActive = false;
                        slot5.boxActive = false;
                        slot6.boxActive = true;
                        //console.log(slot1.values());
                        slot6.boxActiveStyling();
                        break;
                    }
                    if (slot6.boxActive === true) {
                        alert('You are at the end - cannot go right');
                        break;
                    }
            }
        };

        // action.onload prints graphics to screen based on player key press to set up their function
        action.onload = function () { 
            // action keys pressed
            canvas.addEventListener('click', function (event) {

                if ( // forward button was pressed
                    event.x > actionForward.xClick + 8 && // this is the 35 offset horiz left
                    event.x < actionForward.xClick + actionForward.wClick + 8 && // this is the 35 offest horiz right
                    event.y > actionForward.yClick + 58 && // this is the 35 offset for vertical top
                    event.y < actionForward.yClick + actionForward.hClick + 58 // this is the 35 offest for vertical bottom
                ) {
                    // Slot 1
                    if (slot1.forwardOn === false && slot1.boxActive === true) {
                        slot1.cIndex();
                        ctx.drawImage(action, 70, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = true;
                        slot1.turnRightOn = false;
                        slot1.turnLeftOn = false;
                        slot1.f1On = false;
                        slot1.orangePenOn = false;
                        slot1.greenPenOn = false;

                    }
                    else if (slot1.forwardOn === true && slot1.boxActive === true) {
                        slot1.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = false;
                        slot1.turnRightOn = false;
                        slot1.turnLeftOn = false;
                        slot1.f1On = false;
                        slot1.orangePenOn = false;
                        slot1.greenPenOn = false;

                    }
                    // slot 2
                    if (slot2.forwardOn === false && slot2.boxActive === true) {
                        slot2.cIndex();
                        ctx.drawImage(action, 70, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = true;
                        slot2.turnRightOn = false;
                        slot2.turnLeftOn = false;
                        slot2.f1On = false;
                        slot2.orangePenOn = false;
                        slot2.greenPenOn = false;

                    }
                    else if (slot2.forwardOn === true && slot2.boxActive === true) {
                        slot2.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = false;
                        slot2.turnRightOn = false;
                        slot2.turnLeftOn = false;
                        slot2.f1On = false;
                        slot2.orangePenOn = false;
                        slot2.greenPenOn = false;

                    }
                    //  slot 3
                    if (slot3.forwardOn === false && slot3.boxActive === true) {
                        slot3.cIndex();
                        ctx.drawImage(action, 70, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = true;
                        slot3.turnRightOn = false;
                        slot3.turnLeftOn = false;
                        slot3.f1On = false;
                        slot3.orangePenOn = false;
                        slot3.greenPenOn = false;
                    }
                    else if (slot3.forwardOn === true && slot3.boxActive === true) {
                        slot3.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = false;
                        slot3.turnRightOn = false;
                        slot3.turnLeftOn = false;
                        slot3.f1On = false;
                        slot3.orangePenOn = false;
                        slot3.greenPenOn = false;
                    }
                    // slot 4
                    if (slot4.forwardOn === false && slot4.boxActive === true) {
                        slot4.cIndex();
                        ctx.drawImage(action, 70, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = true;
                        slot4.turnRightOn = false;
                        slot4.turnLeftOn = false;
                        slot4.f1On = false;
                        slot4.orangePenOn = false;
                        slot4.greenPenOn = false;
                    }
                    else if (slot4.forwardOn === true && slot4.boxActive === true) {
                        slot4.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = false;
                        slot4.turnRightOn = false;
                        slot4.turnLeftOn = false;
                        slot4.f1On = false;
                        slot4.orangePenOn = false;
                        slot4.greenPenOn = false;
                    }
                    // slot 5
                    if (slot5.forwardOn === false && slot5.boxActive === true) {
                        slot5.cIndex();
                        ctx.drawImage(action, 70, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = true;
                        slot5.turnRightOn = false;
                        slot5.turnLeftOn = false;
                        slot5.f1On = false;
                        slot5.orangePenOn = false;
                        slot5.greenPenOn = false;
                    }
                    else if (slot5.forwardOn === true && slot5.boxActive === true) {
                        slot5.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = false;
                        slot5.turnRightOn = false;
                        slot5.turnLeftOn = false;
                        slot5.f1On = false;
                        slot5.orangePenOn = false;
                        slot5.greenPenOn = false;
                    }
                    // slot 6
                    if (slot6.forwardOn === false && slot6.boxActive === true) {
                        slot6.cIndex();
                        ctx.drawImage(action, 70, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = true;
                        slot6.turnRightOn = false;
                        slot6.turnLeftOn = false;
                        slot6.f1On = false;
                        slot6.orangePenOn = false;
                        slot6.greenPenOn = false;
                    }
                    else if (slot6.forwardOn === true && slot6.boxActive === true) {
                        slot6.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = false;
                        slot6.turnRightOn = false;
                        slot6.turnLeftOn = false;
                        slot6.f1On = false;
                        slot6.orangePenOn = false;
                        slot6.greenPenOn = false;
                    }
                }
                if ( // turnRight button is pressed
                    event.x > actionTurnRight.xClick + 8 && // this is the 35 offset horiz left
                    event.x < actionTurnRight.xClick + actionTurnRight.wClick + 8 && // this is the 35 offest horiz right
                    event.y > actionTurnRight.yClick + 58 && // this is the 35 offset for vertical top
                    event.y < actionTurnRight.yClick + actionTurnRight.hClick + 58 // this is the 35 offest for vertical bottom
                ) {
                    // Slot 1
                    console.log(actionTurnRight.values());
                    if (slot1.turnRightOn === false && slot1.boxActive === true) { // check that orange button is OFF
                        slot1.cIndex();
                        ctx.drawImage(action, 525, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = false;
                        slot1.turnRightOn = true;
                        slot1.turnLeftOn = false;
                        slot1.f1On = false;
                        slot1.orangePenOn = false;
                        slot1.greenPenOn = false;
                    } else if (slot1.turnRightOn === true && slot1.boxActive === true) {
                        slot1.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = false;
                        slot1.turnRightOn = false;
                        slot1.turnLeftOn = false;
                        slot1.f1On = false;
                        slot1.orangePenOn = false;
                        slot1.greenPenOn = false;
                    }
                    // slot 2
                    if (slot2.turnRightOn === false && slot2.boxActive === true) { // check that orange button is OFF
                        slot2.cIndex();
                        ctx.drawImage(action, 525, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = false;
                        slot2.turnRightOn = true;
                        slot2.turnLeftOn = false;
                        slot2.f1On = false;
                        slot2.orangePenOn = false;
                        slot2.greenPenOn = false;
                    }
                    else if (slot2.turnRightOn === true && slot2.boxActive === true) {
                        slot2.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = false;
                        slot2.turnRightOn = false;
                        slot2.turnLeftOn = false;
                        slot2.f1On = false;
                        slot2.orangePenOn = false;
                        slot2.greenPenOn = false;
                    }
                    //  slot 3
                    if (slot3.turnRightOn === false && slot3.boxActive === true) { // check that orange button is OFF
                        slot3.cIndex();
                        ctx.drawImage(action, 525, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = false;
                        slot3.turnRightOn = true;
                        slot3.turnLeftOn = false;
                        slot3.f1On = false;
                        slot3.orangePenOn = false;
                        slot3.greenPenOn = false;
                    }
                    else if (slot3.turnRightOn === true && slot3.boxActive === true) {
                        slot3.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = false;
                        slot3.turnRightOn = false;
                        slot3.turnLeftOn = false;
                        slot3.f1On = false;
                        slot3.orangePenOn = false;
                        slot3.greenPenOn = false;
                    }
                    // slot 4
                    if (slot4.turnRightOn === false && slot4.boxActive === true) { // check that orange button is OFF
                        slot4.cIndex();
                        ctx.drawImage(action, 525, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = false;
                        slot4.turnRightOn = true;
                        slot4.turnLeftOn = false;
                        slot4.f1On = false;
                        slot4.orangePenOn = false;
                        slot4.greenPenOn = false;
                    }
                    else if (slot4.turnRightOn === true && slot4.boxActive === true) {
                        slot4.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = false;
                        slot4.turnRightOn = false;
                        slot4.turnLeftOn = false;
                        slot4.f1On = false;
                        slot4.orangePenOn = false;
                        slot4.greenPenOn = false;
                    }
                    // slot 5
                    if (slot5.turnRightOn === false && slot5.boxActive === true) { // check that orange button is OFF
                        slot5.cIndex();
                        ctx.drawImage(action, 525, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = false;
                        slot5.turnRightOn = true;
                        slot5.turnLeftOn = false;
                        slot5.f1On = false;
                        slot5.orangePenOn = false;
                        slot5.greenPenOn = false;
                    }
                    else if (slot5.turnRightOn === true && slot5.boxActive === true) {
                        slot5.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = false;
                        slot5.turnRightOn = false;
                        slot5.turnLeftOn = false;
                        slot5.f1On = false;
                        slot5.orangePenOn = false;
                        slot5.greenPenOn = false;
                    }
                    // slot 6
                    if (slot6.turnRightOn === false && slot6.boxActive === true) { // check that orange button is OFF
                        slot6.cIndex();
                        ctx.drawImage(action, 525, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = false;
                        slot6.turnRightOn = true;
                        slot6.turnLeftOn = false;
                        slot6.f1On = false;
                        slot6.orangePenOn = false;
                        slot6.greenPenOn = false;
                    }
                    else if (slot6.turnRightOn === true && slot6.boxActive === true) {
                        slot6.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = false;
                        slot6.turnRightOn = false;
                        slot6.turnLeftOn = false;
                        slot6.f1On = false;
                        slot6.orangePenOn = false;
                        slot6.greenPenOn = false;
                    }
                }

                if ( // turnLeft button is pressed
                    event.x > actionTurnLeft.xClick + 8 && // this is the 35 offset horiz left
                    event.x < actionTurnLeft.xClick + actionTurnLeft.wClick + 8 && // this is the 35 offest horiz right
                    event.y > actionTurnLeft.yClick + 58 && // this is the 35 offset for vertical top
                    event.y < actionTurnLeft.yClick + actionTurnLeft.hClick + 58 // this is the 35 offest for vertical bottom
                ) {
                    // Slot 1
                    if (slot1.turnLeftOn === false && slot1.boxActive === true) { // check that green button is OFF
                        slot1.cIndex();
                        ctx.drawImage(action, 560, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = false;
                        slot1.turnRightOn = false;
                        slot1.turnLeftOn = true;
                        slot1.f1On = false;
                        slot1.orangePenOn = false;
                        slot1.greenPenOn = false;

                    }
                    else if (slot1.turnLeftOn === true && slot1.boxActive === true) {
                        slot1.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = false;
                        slot1.turnRightOn = false;
                        slot1.turnLeftOn = false;
                        slot1.f1On = false;
                        slot1.orangePenOn = false;
                        slot1.greenPenOn = false;
                    }
                    // slot 2

                    if (slot2.turnLeftOn === false && slot2.boxActive === true) { // check that green button is OFF
                        slot2.cIndex();
                        ctx.drawImage(action, 560, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = false;
                        slot2.turnRightOn = false;
                        slot2.turnLeftOn = true;
                        slot2.f1On = false;
                        slot2.orangePenOn = false;
                        slot2.greenPenOn = false;
                    }
                    else if (slot2.turnLeftOn === true && slot2.boxActive === true) {
                        slot2.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = false;
                        slot2.turnRightOn = false;
                        slot2.turnLeftOn = false;
                        slot2.f1On = false;
                        slot2.orangePenOn = false;
                        slot2.greenPenOn = false;
                    }
                    //  slot 3
                    if (slot3.turnLeftOn === false && slot3.boxActive === true) { // check that green button is OFF
                        slot3.cIndex();
                        ctx.drawImage(action, 560, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = false;
                        slot3.turnRightOn = false;
                        slot3.turnLeftOn = true;
                        slot3.f1On = false;
                        slot3.orangePenOn = false;
                        slot3.greenPenOn = false;
                    }
                    else if (slot3.turnLeftOn === true && slot3.boxActive === true) {
                        slot3.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = false;
                        slot3.turnRightOn = false;
                        slot3.turnLeftOn = false;
                        slot3.f1On = false;
                        slot3.orangePenOn = false;
                        slot3.greenPenOn = false;
                    }
                    // slot 4
                    if (slot4.turnLeftOn === false && slot4.boxActive === true) { // check that green button is OFF
                        slot4.cIndex();
                        ctx.drawImage(action, 560, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = false;
                        slot4.turnRightOn = false;
                        slot4.turnLeftOn = true;
                        slot4.f1On = false;
                        slot4.orangePenOn = false;
                        slot4.greenPenOn = false;
                    }
                    else if (slot4.turnLeftOn === true && slot4.boxActive === true) {
                        slot4.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = false;
                        slot4.turnRightOn = false;
                        slot4.turnLeftOn = false;
                        slot4.f1On = false;
                        slot4.orangePenOn = false;
                        slot4.greenPenOn = false;
                    }
                    // slot 5
                    if (slot5.turnLeftOn === false && slot5.boxActive === true) { // check that green button is OFF
                        slot5.cIndex();
                        ctx.drawImage(action, 560, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = false;
                        slot5.turnRightOn = false;
                        slot5.turnLeftOn = true;
                        slot5.f1On = false;
                        slot5.orangePenOn = false;
                        slot5.greenPenOn = false;
                    }
                    else if (slot5.turnLeftOn === true && slot5.boxActive === true) {
                        slot5.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = false;
                        slot5.turnRightOn = false;
                        slot5.turnLeftOn = false;
                        slot5.f1On = false;
                        slot5.orangePenOn = false;
                        slot5.greenPenOn = false;
                    }
                    // slot 6
                    if (slot6.turnLeftOn === false && slot6.boxActive === true) { // check that green button is OFF
                        slot6.cIndex();
                        ctx.drawImage(action, 560, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = false;
                        slot6.turnRightOn = false;
                        slot6.turnLeftOn = true;
                        slot6.f1On = false;
                        slot6.orangePenOn = false;
                        slot6.greenPenOn = false;
                    }
                    else if (slot6.turnLeftOn === true && slot6.boxActive === true) {
                        slot6.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = false;
                        slot6.turnRightOn = false;
                        slot6.turnLeftOn = false;
                        slot6.f1On = false;
                        slot6.orangePenOn = false;
                        slot6.greenPenOn = false;
                    }
                }
                if ( // f1 button is pressed
                    event.x > actionF1.xClick + 8 && // this is the 35 offset horiz left
                    event.x < actionF1.xClick + actionF1.wClick + 8 && // this is the 35 offest horiz right
                    event.y > actionF1.yClick + 58 && // this is the 35 offset for vertical top
                    event.y < actionF1.yClick + actionF1.hClick + 58 // this is the 35 offest for vertical bottom
                ) {
                    // Slot 1
                    if (slot1.f1On === false && slot1.boxActive === true) { // check that green button is OFF
                        slot1.cIndex();
                        ctx.drawImage(action, 0, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = false;
                        slot1.turnRightOn = false;
                        slot1.turnLeftOn = false;
                        slot1.f1On = true;
                        slot1.orangePenOn = false;
                        slot1.greenPenOn = false;

                    }
                    else if (slot1.f1On === true && slot1.boxActive === true) {
                        slot1.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = false;
                        slot1.turnRightOn = false;
                        slot1.turnLeftOn = false;
                        slot1.f1On = false;
                        slot1.orangePenOn = false;
                        slot1.greenPenOn = false;
                    }
                    // slot 2

                    if (slot2.f1On === false && slot2.boxActive === true) { // check that green button is OFF
                        slot2.cIndex();
                        ctx.drawImage(action, 0, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = false;
                        slot2.turnRightOn = false;
                        slot2.turnLeftOn = false;
                        slot2.f1On = true;
                        slot2.orangePenOn = false;
                        slot2.greenPenOn = false;
                    }
                    else if (slot2.f1On === true && slot2.boxActive === true) {
                        slot2.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = false;
                        slot2.turnRightOn = false;
                        slot2.turnLeftOn = false;
                        slot2.f1On = false;
                        slot2.orangePenOn = false;
                        slot2.greenPenOn = false;
                    }
                    //  slot 3
                    if (slot3.f1On === false && slot3.boxActive === true) { // check that green button is OFF
                        slot3.cIndex();
                        ctx.drawImage(action, 0, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = false;
                        slot3.turnRightOn = false;
                        slot3.turnLeftOn = false;
                        slot3.f1On = true;
                        slot3.orangePenOn = false;
                        slot3.greenPenOn = false;
                    }
                    else if (slot3.f1On === true && slot3.boxActive === true) {
                        slot3.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = false;
                        slot3.turnRightOn = false;
                        slot3.turnLeftOn = false;
                        slot3.f1On = false;
                        slot3.orangePenOn = false;
                        slot3.greenPenOn = false;
                    }
                    // slot 4
                    if (slot4.f1On === false && slot4.boxActive === true) { // check that green button is OFF
                        slot4.cIndex();
                        ctx.drawImage(action, 0, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = false;
                        slot4.turnRightOn = false;
                        slot4.turnLeftOn = false;
                        slot4.f1On = true;
                        slot4.orangePenOn = false;
                        slot4.greenPenOn = false;
                    }
                    else if (slot4.f1On === true && slot4.boxActive === true) {
                        slot4.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = false;
                        slot4.turnRightOn = false;
                        slot4.turnLeftOn = false;
                        slot4.f1On = false;
                        slot4.orangePenOn = false;
                        slot4.greenPenOn = false;
                    }
                    // slot 5
                    if (slot5.f1On === false && slot5.boxActive === true) { // check that green button is OFF
                        slot5.cIndex();
                        ctx.drawImage(action, 0, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = false;
                        slot5.turnRightOn = false;
                        slot5.turnLeftOn = false;
                        slot5.f1On = true;
                        slot5.orangePenOn = false;
                        slot5.greenPenOn = false;
                    }
                    else if (slot5.f1On === true && slot5.boxActive === true) {
                        slot5.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = false;
                        slot5.turnRightOn = false;
                        slot5.turnLeftOn = false;
                        slot5.f1On = false;
                        slot5.orangePenOn = false;
                        slot5.greenPenOn = false;
                    }
                    // slot 6
                    if (slot6.f1On === false && slot6.boxActive === true) { // check that green button is OFF
                        slot6.cIndex();
                        ctx.drawImage(action, 0, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = false;
                        slot6.turnRightOn = false;
                        slot6.turnLeftOn = false;
                        slot6.f1On = true;
                        slot6.orangePenOn = false;
                        slot6.greenPenOn = false;
                    }
                    else if (slot6.f1On === true && slot6.boxActive === true) {
                        slot6.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = false;
                        slot6.turnRightOn = false;
                        slot6.turnLeftOn = false;
                        slot6.f1On = false;
                        slot6.orangePenOn = false;
                        slot6.greenPenOn = false;
                    }
                }
                if ( // orangePen button is pressed
                    event.x > actionOrangePen.xClick + 8 && // this is the 35 offset horiz left
                    event.x < actionOrangePen.xClick + actionOrangePen.wClick + 8 && // this is the 35 offest horiz right
                    event.y > actionOrangePen.yClick + 58 && // this is the 35 offset for vertical top
                    event.y < actionOrangePen.yClick + actionOrangePen.hClick + 58 // this is the 35 offest for vertical bottom
                ) {
                    // Slot 1
                    if (slot1.orangePenOn === false && slot1.boxActive === true) { // check that green button is OFF
                        slot1.cIndex();
                        ctx.drawImage(action, 35, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = false;
                        slot1.turnRightOn = false;
                        slot1.turnLeftOn = false;
                        slot1.f1On = false;
                        slot1.orangePenOn = true;
                        slot1.greenPenOn = false;

                    }
                    else if (slot1.orangePenOn === true && slot1.boxActive === true) {
                        slot1.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = false;
                        slot1.turnRightOn = false;
                        slot1.turnLeftOn = false;
                        slot1.f1On = false;
                        slot1.orangePenOn = false;
                        slot1.greenPenOn = false;
                    }
                    // slot 2

                    if (slot2.orangePenOn === false && slot2.boxActive === true) { // check that green button is OFF
                        slot2.cIndex();
                        ctx.drawImage(action, 35, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = false;
                        slot2.turnRightOn = false;
                        slot2.turnLeftOn = false;
                        slot2.f1On = false;
                        slot2.orangePenOn = true;
                        slot2.greenPenOn = false;
                    }
                    else if (slot2.orangePenOn === true && slot2.boxActive === true) {
                        slot2.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = false;
                        slot2.turnRightOn = false;
                        slot2.turnLeftOn = false;
                        slot2.f1On = false;
                        slot2.orangePenOn = false;
                        slot2.greenPenOn = false;
                    }
                    //  slot 3
                    if (slot3.orangePenOn === false && slot3.boxActive === true) { // check that green button is OFF
                        slot3.cIndex();
                        ctx.drawImage(action, 35, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = false;
                        slot3.turnRightOn = false;
                        slot3.turnLeftOn = false;
                        slot3.f1On = false;
                        slot3.orangePenOn = true;
                        slot3.greenPenOn = false;
                    }
                    else if (slot3.orangePenOn === true && slot3.boxActive === true) {
                        slot3.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = false;
                        slot3.turnRightOn = false;
                        slot3.turnLeftOn = false;
                        slot3.f1On = false;
                        slot3.orangePenOn = false;
                        slot3.greenPenOn = false;
                    }
                    // slot 4
                    if (slot4.orangePenOn === false && slot4.boxActive === true) { // check that green button is OFF
                        slot4.cIndex();
                        ctx.drawImage(action, 35, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = false;
                        slot4.turnRightOn = false;
                        slot4.turnLeftOn = false;
                        slot4.f1On = false;
                        slot4.orangePenOn = true;
                        slot4.greenPenOn = false;
                    }
                    else if (slot4.orangePenOn === true && slot4.boxActive === true) {
                        slot4.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = false;
                        slot4.turnRightOn = false;
                        slot4.turnLeftOn = false;
                        slot4.f1On = false;
                        slot4.orangePenOn = false;
                        slot4.greenPenOn = false;
                    }
                    // slot 5
                    if (slot5.orangePenOn === false && slot5.boxActive === true) { // check that green button is OFF
                        slot5.cIndex();
                        ctx.drawImage(action, 35, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = false;
                        slot5.turnRightOn = false;
                        slot5.turnLeftOn = false;
                        slot5.f1On = false;
                        slot5.orangePenOn = true;
                        slot5.greenPenOn = false;
                    }
                    else if (slot5.orangePenOn === true && slot5.boxActive === true) {
                        slot5.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = false;
                        slot5.turnRightOn = false;
                        slot5.turnLeftOn = false;
                        slot5.f1On = false;
                        slot5.orangePenOn = false;
                        slot5.greenPenOn = false;
                    }
                    // slot 6
                    if (slot6.orangePenOn === false && slot6.boxActive === true) { // check that green button is OFF
                        slot6.cIndex();
                        ctx.drawImage(action, 35, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = false;
                        slot6.turnRightOn = false;
                        slot6.turnLeftOn = false;
                        slot6.f1On = false;
                        slot6.orangePenOn = true;
                        slot6.greenPenOn = false;
                    }
                    else if (slot6.orangePenOn === true && slot6.boxActive === true) {
                        slot6.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = false;
                        slot6.turnRightOn = false;
                        slot6.turnLeftOn = false;
                        slot6.f1On = false;
                        slot6.orangePenOn = false;
                        slot6.greenPenOn = false;
                    }
                }
                if ( // greenPen button is pressed
                    event.x > actionGreenPen.xClick + 8 && // this is the 35 offset horiz left
                    event.x < actionGreenPen.xClick + actionGreenPen.wClick + 8 && // this is the 35 offest horiz right
                    event.y > actionGreenPen.yClick + 58 && // this is the 35 offset for vertical top
                    event.y < actionGreenPen.yClick + actionGreenPen.hClick + 58 // this is the 35 offest for vertical bottom
                ) {
                    // Slot 1
                    if (slot1.greenPenOn === false && slot1.boxActive === true) { // check that green button is OFF
                        slot1.cIndex();
                        ctx.drawImage(action, 140, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = false;
                        slot1.turnRightOn = false;
                        slot1.turnLeftOn = false;
                        slot1.f1On = false;
                        slot1.orangePenOn = false;
                        slot1.greenPenOn = true;

                    }
                    else if (slot1.greenPenOn === true && slot1.boxActive === true) {
                        slot1.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot1.xSlot, slot1.ySlot, 35, 35);
                        slot1.forwardOn = false;
                        slot1.turnRightOn = false;
                        slot1.turnLeftOn = false;
                        slot1.f1On = false;
                        slot1.orangePenOn = false;
                        slot1.greenPenOn = false;
                    }
                    // slot 2

                    if (slot2.greenPenOn === false && slot2.boxActive === true) { // check that green button is OFF
                        slot2.cIndex();
                        ctx.drawImage(action, 140, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = false;
                        slot2.turnRightOn = false;
                        slot2.turnLeftOn = false;
                        slot2.f1On = false;
                        slot2.orangePenOn = false;
                        slot2.greenPenOn = true;
                    }
                    else if (slot2.greenPenOn === true && slot2.boxActive === true) {
                        slot2.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot2.xSlot, slot2.ySlot, 35, 35);
                        slot2.forwardOn = false;
                        slot2.turnRightOn = false;
                        slot2.turnLeftOn = false;
                        slot2.f1On = false;
                        slot2.orangePenOn = false;
                        slot2.greenPenOn = false;
                    }
                    //  slot 3
                    if (slot3.greenPenOn === false && slot3.boxActive === true) { // check that green button is OFF
                        slot3.cIndex();
                        ctx.drawImage(action, 140, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = false;
                        slot3.turnRightOn = false;
                        slot3.turnLeftOn = false;
                        slot3.f1On = false;
                        slot3.orangePenOn = false;
                        slot3.greenPenOn = true;
                    }
                    else if (slot3.greenPenOn === true && slot3.boxActive === true) {
                        slot3.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot3.xSlot, slot3.ySlot, 35, 35);
                        slot3.forwardOn = false;
                        slot3.turnRightOn = false;
                        slot3.turnLeftOn = false;
                        slot3.f1On = false;
                        slot3.orangePenOn = false;
                        slot3.greenPenOn = false;
                    }
                    // slot 4
                    if (slot4.greenPenOn === false && slot4.boxActive === true) { // check that green button is OFF
                        slot4.cIndex();
                        ctx.drawImage(action, 140, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = false;
                        slot4.turnRightOn = false;
                        slot4.turnLeftOn = false;
                        slot4.f1On = false;
                        slot4.orangePenOn = false;
                        slot4.greenPenOn = true;
                    }
                    else if (slot4.greenPenOn === true && slot4.boxActive === true) {
                        slot4.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot4.xSlot, slot4.ySlot, 35, 35);
                        slot4.forwardOn = false;
                        slot4.turnRightOn = false;
                        slot4.turnLeftOn = false;
                        slot4.f1On = false;
                        slot4.orangePenOn = false;
                        slot4.greenPenOn = false;
                    }
                    // slot 5
                    if (slot5.greenPenOn === false && slot5.boxActive === true) { // check that green button is OFF
                        slot5.cIndex();
                        ctx.drawImage(action, 140, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = false;
                        slot5.turnRightOn = false;
                        slot5.turnLeftOn = false;
                        slot5.f1On = false;
                        slot5.orangePenOn = false;
                        slot5.greenPenOn = true;
                    }
                    else if (slot5.greenPenOn === true && slot5.boxActive === true) {
                        slot5.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot5.xSlot, slot5.ySlot, 35, 35);
                        slot5.forwardOn = false;
                        slot5.turnRightOn = false;
                        slot5.turnLeftOn = false;
                        slot5.f1On = false;
                        slot5.orangePenOn = false;
                        slot5.greenPenOn = false;
                    }
                    // slot 6
                    if (slot6.greenPenOn === false && slot6.boxActive === true) { // check that green button is OFF
                        slot6.cIndex();
                        ctx.drawImage(action, 140, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = false;
                        slot6.turnRightOn = false;
                        slot6.turnLeftOn = false;
                        slot6.f1On = false;
                        slot6.orangePenOn = false;
                        slot6.greenPenOn = true;
                    }
                    else if (slot6.greenPenOn === true && slot6.boxActive === true) {
                        slot6.cIndex();
                        ctx.drawImage(action, 840, 0, 35, 35, slot6.xSlot, slot6.ySlot, 35, 35);
                        slot6.forwardOn = false;
                        slot6.turnRightOn = false;
                        slot6.turnLeftOn = false;
                        slot6.f1On = false;
                        slot6.orangePenOn = false;
                        slot6.greenPenOn = false;
                    }
                }
            });


        }

        action.src = "images/actions.png";





        // Run gameEngine (play or one-step eventlistener press); order: changeDirection, colourChange, movePlayer

        function changeDirection() { // execute function instruction to 'change direction' - color variables needed for filling in correct colour afterwards
            if (grid[pSquare.value][1] === "orange" && slot.orangeOn === true) {
                if (slot.turnRightOn === true) { // change direction - right turn
                    // filling in correct color behind arrow
                    ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    switch (arrowDirection) {
                        case "arrowUp": // up -> right
                            console.log("Orange square: arrow turn right executed <3");
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowRight";
                            moveForward = "moveRight";
                            arrow[0] = false;
                            arrow[1] = true;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;
                        case "arrowRight": // right -> down
                            console.log("Orange square: arrow turn right executed <3");
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowDown";
                            moveForward = "moveDown";
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = true;
                            arrow[3] = false;
                            break;
                        case "arrowDown":  // down -> left
                            console.log("Orange square: arrow turn right executed <3");
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowLeft";
                            moveForward = "moveLeft";
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = true;
                            break;
                        case "arrowLeft": // left -> up
                            console.log("Orange square: arrow turn right executed <3");
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowUp";
                            moveForward = "moveUp";
                            arrow[0] = true;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;
                    }
                }
                if (slot.turnLeftOn === true) { // change direction - left turn
                    // filling in correct color behind arrow
                    ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);

                    switch (arrowDirection) {
                        case "arrowUp": // up -> left
                            console.log("Orange square: arrow turn left executed <3");
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowLeft";
                            moveForward = "moveLeft";
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = true;
                            break;
                        case "arrowRight": // right -> up
                            console.log("Orange square: arrow turn left executed <3");
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowUp";
                            moveForward = "moveRight";
                            arrow[0] = true;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;
                        case "arrowDown":  // down -> right
                            console.log("Orange square: arrow turn left executed <3");
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowRight";
                            moveForward = "moveRight";
                            arrow[0] = false;
                            arrow[1] = true;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;

                        case "arrowLeft": // left -> down
                            console.log("Orange square: arrow turn left executed <3");
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowDown";
                            moveForward = "moveDown";
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = true;
                            arrow[3] = false;
                            break;
                    }

                }
            }
            if (grid[pSquare.value][1] === "blue" && slot.blueOn === true) {
                if (slot.turnRightOn === true) { // change direction - right turn
                    // filling in correct color behind arrow
                    ctx.drawImage(action, 105, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);

                    switch (arrowDirection) {
                        case "arrowUp": // up -> right
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            console.log("Blue square: arrow turn right executed <3");
                            arrowDirection = "arrowRight";
                            moveForward = "moveRight";
                            arrow[0] = false;
                            arrow[1] = true;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;
                        case "arrowRight": // right -> down
                            console.log("Blue square: arrow turn right executed <3");
                            arrowDirection = "arrowDown";
                            moveForward = "moveDown";
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = true;
                            arrow[3] = false;
                            break;
                        case "arrowDown":  // down -> left
                            console.log("Blue square: arrow turn right executed <3");
                            arrowDirection = "arrowLeft";
                            moveForward = "moveLeft";
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = true;
                            break;
                        case "arrowLeft": // left -> up
                            console.log("Blue square: arrow turn right executed <3");
                            arrowDirection = "arrowUp";
                            moveForward = "moveUp";
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = true;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;
                    }

                }
                if (slot.turnLeftOn === true) { // change direction - left turn
                    // filling in correct colour behind arrow
                    ctx.drawImage(action, 105, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);

                    switch (arrowDirection) {
                        case "arrowUp": // up -> left
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowLeft";
                            moveForward = "moveLeft";
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = true;
                            break;
                        case "arrowRight": // right -> up
                            arrowDirection = "arrowUp";
                            moveForward = "moveUp";
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = true;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;
                        case "arrowDown":  // down -> right
                            arrowDirection = "arrowRight";
                            moveForward = "moveRight";
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = true;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;

                        case "arrowLeft": // left -> down
                            arrowDirection = "arrowDown";
                            moveForward = "moveDown";
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = true;
                            arrow[3] = false;
                            break;
                    }
                }
            }
            if (grid[pSquare.value][1] === "green" && slot.greenOn === true) {
                if (slot.turnRightOn === true) { // change direction - right turn
                    // filling in correct color behind arrow
                    ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    switch (arrowDirection) {
                        case "arrowUp": // up -> right
                            console.log("Green square: arrow turn right executed <3");
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowRight";
                            moveForward = "moveRight";
                            arrow[0] = false;
                            arrow[1] = true;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;
                        case "arrowRight": // right -> down
                            console.log("Green square: arrow turn right executed <3");
                            arrowDirection = "arrowDown";
                            moveForward = "moveDown";
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = true;
                            arrow[3] = false;
                            break;
                        case "arrowDown":  // down -> left
                            console.log("Green square: arrow turn right executed <3");
                            arrowDirection = "arrowLeft";
                            moveForward = "moveLeft";
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = true;
                            break;

                        case "arrowLeft": // left -> up
                            console.log("Green square: arrow turn right executed <3");
                            arrowDirection = "arrowUp";
                            moveForward = "moveUp";
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = true;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;

                    }
                }
                if (slot.turnLeftOn === true) { // change direction - left turn
                    // filling in correct color behind arrow
                    ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    switch (arrowDirection) {
                        case "arrowUp": // up -> left
                            console.log("Green square: arrow turn right executed <3");
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowLeft";
                            moveForward = "moveLeft";
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = true;
                            break;
                        case "arrowRight": // right -> up
                            console.log("Green square: arrow turn right executed <3");
                            arrowDirection = "arrowUp";
                            moveForward = "moveUp";
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = true;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;
                        case "arrowDown":  // down -> right
                            console.log("Green square: arrow turn right executed <3");
                            arrowDirection = "arrowRight";
                            moveForward = "moveRight";
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = true;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;

                        case "arrowLeft": // left -> down
                            console.log("Green square: arrow turn right executed <3");
                            arrowDirection = "arrowDown";
                            moveForward = "moveDown";
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = true;
                            arrow[3] = false;
                            break;
                    }
                }
            }
            if (slot.greyOn === true && slot.f1On === false && (grid[pSquare.value][1] == "green" || "blue" || "orange")) {
                if (slot.turnRightOn === true) { // change direction - right turn
                    if (grid[pSquare.value][1] === "green") { // filling in correct color behind arrow
                        ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                        console.log("Green square: arrow turn right executed GS <3");
                    }
                    if (grid[(pSquare.value)][1] === "orange") { // filling in correct color behind arrow
                        ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                        console.log("Orange square: arrow turn right executed GS <3");
                    }
                    if (grid[(pSquare.value)][1] === "blue") { // filling in correct color behind arrow
                        ctx.drawImage(action, 105, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                        console.log("Blue square: arrow turn right executed GS <3");
                    }
                    switch (arrowDirection) {
                        case "arrowUp": // up -> right
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowRight";
                            moveForward = "moveRight";
                            arrow[0] = false;
                            arrow[1] = true;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;
                        case "arrowRight": // right -> down
                            arrowDirection = "arrowDown";
                            moveForward = "moveDown";
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = true;
                            arrow[3] = false;
                            break;
                        case "arrowDown":  // down -> left
                            arrowDirection = "arrowLeft";
                            moveForward = "moveLeft";
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = true;
                            break;

                        case "arrowLeft": // left -> up
                            arrowDirection = "arrowUp";
                            moveForward = "moveUp";
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = true;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;
                    }
                }
                if (slot.turnLeftOn === true) { // change direction - left turn
                    if (grid[pSquare.value][1] === "green") { // filling in correct color behind arrow
                        ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                        console.log("Green square: arrow turn left executed GS <3");
                    }
                    if (grid[(pSquare.value)][1] === "orange") { // filling in correct color behind arrow
                        ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                        console.log("Orange square: arrow turn left executed GS <3");
                    }
                    if (grid[(pSquare.value)][1] === "blue") { // filling in correct color behind arrow
                        ctx.drawImage(action, 105, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                        console.log("Blue square: arrow turn left executed GS <3");
                    }

                    switch (arrowDirection) {
                        case "arrowUp": // up -> left
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrowDirection = "arrowLeft";
                            moveForward = "moveLeft";
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = true;
                            break;
                        case "arrowRight": // right -> up
                            arrowDirection = "arrowUp";
                            moveForward = "moveUp";
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = true;
                            arrow[1] = false;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;
                        case "arrowDown":  // down -> right
                            arrowDirection = "arrowRight";
                            moveForward = "moveRight";
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = true;
                            arrow[2] = false;
                            arrow[3] = false;
                            break;

                        case "arrowLeft": // left -> down
                            arrowDirection = "arrowDown";
                            moveForward = "moveDown";
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                            arrow[0] = false;
                            arrow[1] = false;
                            arrow[2] = true;
                            arrow[3] = false;
                            break;
                    }

                }

            }

        }
        function colourChange() {
            // greenPen is on
            if (slot.greenPenOn === true) { // change color of grid square
                if (grid[pSquare.value][1] === "orange" && slot.orangeOn === true) { // if pSquare is orange
                    ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35); //green tile
                    grid[pSquare.value][1] = "green";
                    console.log("greenPen: orange to green executed <3");

                    if (moveForward === "moveRight") {
                        ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveDown") {
                        ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveLeft") {
                        ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveUp") {
                        ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                }
                if (grid[pSquare.value][1] === "blue" && slot.blueOn === true) { // if pSquare is blue
                    ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35); //green tile
                    grid[pSquare.value][1] = "green";
                    console.log("greenPen: blue to green executed <3");

                    if (moveForward === "moveRight") {
                        ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveDown") {
                        ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveLeft") {
                        ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveUp") {
                        ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                }

                if (slot.greyOn === true) { // "grey" if slot colour is grey, pSquare colour is irrelevant 
                    ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35); //green tile
                    grid[pSquare.value][1] = "green";
                    console.log("greenPen: grey slot - any to green executed <3");

                    if (moveForward === "moveRight") {
                        ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveDown") {
                        ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveLeft") {
                        ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveUp") {
                        ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                }
            }
            // orangePen is on
            if (slot.orangePenOn === true) { // change color of grid square
                if (grid[pSquare.value][1] === "green" && slot.greenOn === true) { // if pSquare is green
                    ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35); //green tile
                    grid[pSquare.value][1] = "orange";
                    console.log("orangePen: green to orange executed <3");

                    if (moveForward === "moveRight") {
                        ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveDown") {
                        ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveLeft") {
                        ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveUp") {
                        ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                }
                if (grid[pSquare.value][1] === "blue" && slot.blueOn === true) { // if pSquare is blue
                    ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35); //green tile
                    grid[pSquare.value][1] = "orange";
                    console.log("orangePen: blue to orange executed <3");

                    if (moveForward === "moveRight") {
                        ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveDown") {
                        ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveLeft") {
                        ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveUp") {
                        ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                }

                if (slot.greyOn === true) { // if slot colour is grey, pSquare colour is irrelevant 
                    ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35); //green tile
                    grid[pSquare.value][1] = "orange";
                    console.log("orangePen: grey slot - any to orange executed <3");

                    if (moveForward === "moveRight") {
                        ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveDown") {
                        ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveLeft") {
                        ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (moveForward === "moveUp") {
                        ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                }
            }
        }
        function movePlayer() { // move forward & calculate new grid co-ordinates
            if (grid[pSquare.value][1] === "orange" && slot.orangeOn === true) {
                if (slot.forwardOn === true) { // move forward
                    if (grid[pSquare.value][1] === "green") { // filling in correct color behind arrow
                        ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (grid[(pSquare.value)][1] === "orange") { // filling in correct color behind arrow
                        ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (grid[(pSquare.value)][1] === "blue") { // filling in correct color behind arrow
                        ctx.drawImage(action, 105, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    switch (moveForward) { // move then break, hence switch & case
                        case "moveUp": // move up
                            arrowDirection = "arrowUp";
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value - 10)][3], grid[(pSquare.value - 10)][4], 35, 35);
                            pSquare.value -= 10;
                            console.log("Orange square: move up executed <3");
                            break;
                        case "moveRight": // move right
                            arrowDirection = "arrowRight";
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value + 1)][3], grid[(pSquare.value + 1)][4], 35, 35);
                            pSquare.value += 1;
                            console.log("Orange square: move right executed <3");
                            break;
                        case "moveDown":  // move down
                            arrowDirection = "arrowDown";
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value + 10)][3], grid[(pSquare.value + 10)][4], 35, 35);
                            pSquare.value += 10;
                            console.log("Orange square: move down executed <3");
                            break;
                        case "moveLeft": // move left
                            arrowDirection = "arrowLeft";
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value - 1)][3], grid[(pSquare.value - 1)][4], 35, 35);
                            pSquare.value -= 1;
                            console.log("Orange square: move left executed <3");
                            break;
                    }
                }
            }
            if (grid[pSquare.value][1] === "blue" && slot.blueOn === true) {
                if (slot.forwardOn === true) { // move forward
                    if (grid[pSquare.value][1] === "green") { // filling in correct color behind arrow
                        ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (grid[(pSquare.value)][1] === "orange") { // filling in correct color behind arrow
                        ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (grid[(pSquare.value)][1] === "blue") { // filling in correct color behind arrow
                        ctx.drawImage(action, 105, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    switch (moveForward) { // move then break, hence switch & case
                        case "moveUp": // move up
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value - 10)][3], grid[(pSquare.value - 10)][4], 35, 35);
                            arrowDirection = "arrowUp";
                            pSquare.value -= 10;
                            console.log("Blue square: move up executed <3");
                            break;
                        case "moveRight": // move right
                            arrowDirection = "arrowRight";
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value + 1)][3], grid[(pSquare.value + 1)][4], 35, 35);
                            pSquare.value += 1;
                            console.log("Blue square: move right executed <3");
                            break;
                        case "moveDown":  // move down
                            arrowDirection = "arrowDown";
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value + 10)][3], grid[(pSquare.value + 10)][4], 35, 35);
                            pSquare.value += 10;
                            console.log("Blue square: move down executed <3");
                            break;
                        case "moveLeft": // move left
                            arrowDirection = "arrowLeft";
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value - 1)][3], grid[(pSquare.value - 1)][4], 35, 35);
                            pSquare.value -= 1;
                            console.log("Blue square: move left executed <3");
                            break;
                    }
                }
            }
            if (grid[pSquare.value][1] === "green" && slot.greenOn === true) {
                if (slot.forwardOn === true) { // move forward
                    if (grid[pSquare.value][1] === "green") { // filling in correct color behind arrow
                        ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (grid[(pSquare.value)][1] === "orange") { // filling in correct color behind arrow
                        ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (grid[(pSquare.value)][1] === "blue") { // filling in correct color behind arrow
                        ctx.drawImage(action, 105, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    switch (moveForward) { // move then break, hence switch & case
                        case "moveUp": // move up
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value - 10)][3], grid[(pSquare.value - 10)][4], 35, 35);
                            pSquare.value -= 10;
                            arrowDirection = "arrowUp";
                            console.log("Green square: move up executed <3");
                            break;
                        case "moveRight": // move right
                            arrowDirection = "arrowRight";
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value + 1)][3], grid[(pSquare.value + 1)][4], 35, 35);
                            pSquare.value += 1;
                            console.log("Green square: move right executed <3");
                            break;
                        case "moveDown":  // move down
                            arrowDirection = "arrowDown";
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value + 10)][3], grid[(pSquare.value + 10)][4], 35, 35);
                            pSquare.value += 10;
                            console.log("Green square: move down executed <3");
                            break;
                        case "moveLeft": // move left
                            arrowDirection = "arrowLeft";
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value - 1)][3], grid[(pSquare.value - 1)][4], 35, 35);
                            pSquare.value -= 1;
                            console.log("Green square: move left executed <3");
                            break;
                    }
                }
            }
            if (slot.greyOn === true && slot.f1On === false && (grid[pSquare.value][1] == "green" || "blue" || "orange")) {
                if (slot.forwardOn === true) { // move forward
                    if (grid[pSquare.value][1] === "green") { // filling in correct color behind arrow
                        ctx.drawImage(action, 175, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (grid[(pSquare.value)][1] === "orange") { // filling in correct color behind arrow
                        ctx.drawImage(action, 420, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    if (grid[(pSquare.value)][1] === "blue") { // filling in correct color behind arrow
                        ctx.drawImage(action, 105, 0, 35, 35, grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                    }
                    switch (moveForward) { // move then break, hence switch & case
                        case "moveUp": // move up
                            arrowDirection = "arrowUp";
                            ctx.drawImage(action, 945, 0, 35, 35, grid[(pSquare.value - 10)][3], grid[(pSquare.value - 10)][4], 35, 35);
                            pSquare.value -= 10;
                            console.log("Grey slot: move up executed <3");
                            break;
                        case "moveRight": // move right
                            arrowDirection = "arrowRight";
                            ctx.drawImage(action, 385, 0, 35, 35, grid[(pSquare.value + 1)][3], grid[(pSquare.value + 1)][4], 35, 35);
                            pSquare.value += 1;
                            console.log("Grey slot: move right executed <3");
                            break;
                        case "moveDown":  // move down
                            arrowDirection = "arrowDown";
                            ctx.drawImage(action, 875, 0, 35, 35, grid[(pSquare.value + 10)][3], grid[(pSquare.value + 10)][4], 35, 35);
                            pSquare.value += 10;
                            console.log("Grey slot: move down executed <3");
                            break;
                        case "moveLeft": // move left
                            arrowDirection = "arrowLeft";
                            ctx.drawImage(action, 910, 0, 35, 35, grid[(pSquare.value - 1)][3], grid[(pSquare.value - 1)][4], 35, 35);
                            pSquare.value -= 1;
                            console.log("Grey slot: move left executed <3");
                            break;
                    }
                }
            }
        }
        function gameEngine() { // binds the main play functions into one function called gameEngine; 
            changeDirection();
            colourChange();
            movePlayer();
            if (grid[pSquare.value][2] === true) {
                colourFillArrow();
                stars -= 1;
                grid[pSquare.value][2] = false;
            }
            if (stars <= 0) {
                alert("YOU WON - you collected all 11 stars - well done!");
                gridOnlyReset();
                return;
            }
            if (grid[pSquare.value][1] === "grey") {
                ctx.fillStyle = "#f1f1f1"; // #d3cfc7 for later
                ctx.fillRect(grid[(pSquare.value)][3], grid[(pSquare.value)][4], 35, 35);
                abort = true;
                setTimeout(badNews, 600);
                setTimeout(gridStuff, 800);
                function badNews() {
                    alert("                                              GAME OVER \n           You moved off the board with " + stars + " stars still left to get. \n        You need to get all 11 stars to WIN! Better luck next time!");
                }
                function gridStuff() {
                    gridOnlyReset();
                }
                slot = slotSelect[0];
                return;
            }
            if (slot.forwardOn == false && slot.turnRightOn == false && slot.turnLeftOn == false && slot.f1On === false && slot.orangePenOn == false && slot.greenPenOn == false) {
                running = false;
                abort = true;
                function badNews() {
                    alert("Ran out of commands - " + stars + " stars still remaining. GAME OVER!");
                    return;
                }
                function gridStuff() {
                    gridOnlyReset();
                    return;
                }
                setTimeout(badNews, 400);
                setTimeout(gridStuff, 700);
                slot = slotSelect[0];
                return;
            }

            else {
                return;
            }
        }

        // gameEngineslotRun functions (slotMain calls them individually)

        function slotMain() { // main game loop - calls slotRuns 1-6

            slotAnimClear();
            if (abort) { // break condition for pause
                return;
            }
            switch (running) { // stops looping
                case "true":
                case "false":
                    break;
            }
            function sleep(ms, f) {
                return (
                    setTimeout(f, ms)
                )
            }
            ctx.globalAlpha = 0.1;
            slot1Anim();
            ctx.globalAlpha = 1;
            sleep(playSpeed, function () { // slot 1
                if (abort) { // break condition for pause
                    return;
                }
                if (slot === slotSelect[0]) {
                    console.log("slot 1 started");
                    switch (slot.f1On) { // f1 return check
                        case true:
                            slot = slotSelect[0];
                            slotMain();
                            break;
                        case false:
                            ctx.globalAlpha = 0.9
                            slot1Anim();
                            ctx.globalAlpha = 1;
                            gameEngine();
                            slot = slotSelect[1];
                    }
                    ctx.globalAlpha = 0.1;
                    slot2Anim();
                    ctx.globalAlpha = 1;
                    sleep(playSpeed, function () { // slot 2
                        if (abort) { // break condition for pause
                            return;
                        }
                        if (slot === slotSelect[1]) {
                            console.log("slot 2 started");
                            switch (slot.f1On) { // f1 return check
                                case true:
                                    slot = slotSelect[0];
                                    slotMain();
                                    break;
                                case false:
                                    ctx.globalAlpha = 0.9
                                    slot2Anim();
                                    ctx.globalAlpha = 1;
                                    gameEngine();
                                    slot = slotSelect[2];
                            }
                            ctx.globalAlpha = 0.1;
                            slot3Anim();
                            ctx.globalAlpha = 1;
                            sleep(playSpeed, function () { // slot 3
                                if (abort) { // break condition for pause
                                    return;
                                }
                                if (slot === slotSelect[2]) {
                                    console.log("slot 3 started");
                                    switch (slot.f1On) { // f1 return check
                                        case true:

                                            slot = slotSelect[0];
                                            slotMain();
                                            break;
                                        case false:
                                            ctx.globalAlpha = 0.9
                                            slot3Anim();
                                            ctx.globalAlpha = 1;
                                            gameEngine();
                                            slot = slotSelect[3];
                                    }
                                    ctx.globalAlpha = 0.1;
                                    slot4Anim();
                                    ctx.globalAlpha = 1;
                                    sleep(playSpeed, function () { // slot 4
                                        if (abort) { // break condition for pause
                                            return;
                                        }
                                        if (slot === slotSelect[3]) {
                                            console.log("slot 4 started");
                                            switch (slot.f1On) { // f1 return check
                                                case true:
                                                    slot = slotSelect[0];
                                                    slotMain();
                                                    break;
                                                case false:
                                                    ctx.globalAlpha = 0.9
                                                    slot4Anim();
                                                    ctx.globalAlpha = 1;
                                                    gameEngine();
                                                    slot = slotSelect[4];
                                            }
                                            ctx.globalAlpha = 0.1;
                                            slot5Anim();
                                            ctx.globalAlpha = 1;
                                            sleep(playSpeed, function () { // slot 5
                                                if (abort) { // break condition for pause
                                                    return;
                                                }
                                                if (slot === slotSelect[4]) {
                                                    console.log("slot 5 started");
                                                    switch (slot.f1On) { // f1 return check
                                                        case true:
                                                            slot = slotSelect[0];
                                                            slotMain();
                                                            break;
                                                        case false:
                                                            ctx.globalAlpha = 0.9
                                                            slot5Anim();
                                                            ctx.globalAlpha = 1;
                                                            gameEngine();
                                                            slot = slotSelect[5];
                                                    }
                                                    ctx.globalAlpha = 0.1;
                                                    slot6Anim();
                                                    ctx.globalAlpha = 1;
                                                    sleep(playSpeed, function () { // slot 6
                                                        if (abort) { // break condition for pause
                                                            return;
                                                        }
                                                        if (slot === slotSelect[5]) {
                                                            console.log("slot 6 started");
                                                            switch (slot.f1On) { // f1 return check
                                                                case true:
                                                                    slot = slotSelect[0];
                                                                    slotMain();
                                                                    break;
                                                                case false:
                                                                    ctx.globalAlpha = 0.9
                                                                    slot6Anim();
                                                                    ctx.globalAlpha = 1;
                                                                    gameEngine();
                                                                    slot = slotSelect[0];
                                                            }
                                                        }

                                                    })

                                                }

                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }

            })


        }
        function slotRun1() {

            function sleep(ms, f) {
                return (
                    setTimeout(f, ms)
                )
            }
            ctx.globalAlpha = 0.1;
            slot1Anim();
            ctx.globalAlpha = 1;
            sleep(playSpeed, function () {
                //slot = slotSelect[0];
                console.log("oneStep - slot 1 started");
                switch (slot.f1On) {
                    case true:
                        slot = slotSelect[0];
                        break;
                    case false:
                        ctx.globalAlpha = 0.9;
                        slot1Anim();
                        ctx.globalAlpha = 1;
                        gameEngine();
                        slot = slotSelect[1];
                }
            })
        }
        function slotRun2() {

            function sleep(ms, f) {
                return (
                    setTimeout(f, ms)
                )
            }
            ctx.globalAlpha = 0.1;
            slot2Anim();
            ctx.globalAlpha = 1;
            sleep(playSpeed, function () {
                //slot = slotSelect[0];
                console.log("oneStep - slot 2 started");
                switch (slot.f1On) {
                    case true:
                        slot = slotSelect[0];
                        slotRun1();
                        break;
                    case false:
                        ctx.globalAlpha = 0.9;
                        slot2Anim();
                        ctx.globalAlpha = 1;
                        gameEngine();
                        slot = slotSelect[2];
                }
            })
        }
        function slotRun3() {

            function sleep(ms, f) {
                return (
                    setTimeout(f, ms)
                )
            }
            ctx.globalAlpha = 0.1;
            slot3Anim();
            ctx.globalAlpha = 1;
            sleep(playSpeed, function () {
                //slot = slotSelect[0];
                console.log("oneStep - slot 3 started");
                switch (slot.f1On) {
                    case true:
                        slot = slotSelect[0];
                        slotRun1();
                        break;
                    case false:
                        ctx.globalAlpha = 0.9;
                        slot3Anim();
                        ctx.globalAlpha = 1;
                        gameEngine();
                        slot = slotSelect[3];
                }
            })
        }
        function slotRun4() {

            function sleep(ms, f) {
                return (
                    setTimeout(f, ms)
                )
            }
            ctx.globalAlpha = 0.1;
            slot4Anim();
            ctx.globalAlpha = 1;
            sleep(playSpeed, function () {
                //slot = slotSelect[0];
                console.log("oneStep - slot 4 started");
                switch (slot.f1On) {
                    case true:
                        slot = slotSelect[0];
                        slotRun1();
                        break;
                    case false:
                        ctx.globalAlpha = 0.9;
                        slot4Anim();
                        ctx.globalAlpha = 1;
                        gameEngine();
                        slot = slotSelect[4];
                }
            })
        }
        function slotRun5() {

            function sleep(ms, f) {
                return (
                    setTimeout(f, ms)
                )
            }
            ctx.globalAlpha = 0.1;
            slot5Anim();
            ctx.globalAlpha = 1;
            sleep(playSpeed, function () {
                //slot = slotSelect[0];
                console.log("oneStep - slot 5 started");
                switch (slot.f1On) {
                    case true:
                        slot = slotSelect[0];
                        slotRun1();
                        break;
                    case false:
                        ctx.globalAlpha = 0.9;
                        slot5Anim();
                        ctx.globalAlpha = 1;
                        gameEngine();
                        slot = slotSelect[5];
                }
            })
        }
        function slotRun6() {

            function sleep(ms, f) {
                return (
                    setTimeout(f, ms)
                )
            }
            ctx.globalAlpha = 0.1;
            slot6Anim();
            ctx.globalAlpha = 1;
            sleep(playSpeed, function () {
                //slot = slotSelect[0];
                console.log("oneStep - slot 6 started");
                switch (slot.f1On) {
                    case true:
                        slot = slotSelect[0];
                        oneStep = false;
                        console.log("Going down the one true path! slot 6 started");
                        gameLoop();
                        break;
                    case false:
                        ctx.globalAlpha = 0.9;
                        slot6Anim();
                        ctx.globalAlpha = 1;
                        gameEngine();
                        console.log("Don't know where this mofo is going! slot 6 started");
                        function badNews() {
                            alert("No more commands received and there are still stars remaining - GAME OVER!");
                        }
                        function gridStuff() {
                            gridOnlyReset();
                        }
                        setTimeout(badNews, 400);
                        setTimeout(gridStuff, 700);
                        slot = slotSelect[0];
                        oneStep = false;
                        running = false;
                        break;
                }
            })
            return;
        }
        function gameLoop() { // loops the game, i.e. runs slotMain repeatedly (iteratively) based on button Play event listener
            for (let i = 0; i < 1; i++) {
                slotMain();
            }

        }
        function playOneStep() {
            console.log("Via playOneStep")
            if (slot === slotSelect[0]) {
                oneStep = false;
                gameLoop();
                return;
            }
            if (slot === slotSelect[1]) {
                slotRun2();
                slotRun3();
                slotRun4();
                slotRun5();
                slotRun6();
                return;
            }
            if (slot === slotSelect[2]) {
                slotRun3();
                slotRun4();
                slotRun5();
                slotRun6();
                return;
            }
            if (slot === slotSelect[3]) {
                slotRun4();
                slotRun5();
                slotRun6();
                return;
            }
            if (slot === slotSelect[4]) {
                slotRun5();
                slotRun6();
                return;
            }
            if (slot === slotSelect[5]) {
                console.log("last one baby!")
                slotRun6();
                console.log("Should return to main loop");
                return;
            }
        }

        // game resets

        function fullBoardReset() {
            ctx.clearRect(0, 0, window.width, window.height);
            console.log("full board reset initiated")
            grid = JSON.parse(JSON.stringify(grid2));
            slotAnimClear();
            gamePause = false;
            slot1.boxActive = true;
            slot2.boxActive = false;
            slot3.boxActive = false;
            slot4.boxActive = false;
            slot5.boxActive = false;
            slot6.boxActive = false;
            slot1.blueOn = false;
            slot2.blueOn = false;
            slot3.blueOn = false;
            slot4.blueOn = false;
            slot5.blueOn = false;
            slot6.blueOn = false;
            slot1.greenOn = false;
            slot2.greenOn = false;
            slot3.greenOn = false;
            slot4.greenOn = false;
            slot5.greenOn = false;
            slot6.greenOn = false;
            slot1.orangeOn = false;
            slot2.orangeOn = false;
            slot3.orangeOn = false;
            slot4.orangeOn = false;
            slot5.orangeOn = false;
            slot6.orangeOn = false;
            slot1.forwardOn = false;
            slot2.forwardOn = false;
            slot3.forwardOn = false;
            slot4.forwardOn = false;
            slot5.forwardOn = false;
            slot6.forwardOn = false;
            slot1.turnRightOn = false;
            slot2.turnRightOn = false;
            slot3.turnRightOn = false;
            slot4.turnRightOn = false;
            slot5.turnRightOn = false;
            slot6.turnRightOn = false;
            slot1.turnLeftOn = false;
            slot2.turnLeftOn = false;
            slot3.turnLeftOn = false;
            slot4.turnLeftOn = false;
            slot5.turnLeftOn = false;
            slot6.turnLeftOn = false;
            slot1.f1On = false;
            slot2.f1On = false;
            slot3.f1On = false;
            slot4.f1On = false;
            slot5.f1On = false;
            slot6.f1On = false;
            slot1.orangePenOn = false;
            slot2.orangePenOn = false;
            slot3.orangePenOn = false;
            slot4.orangePenOn = false;
            slot5.orangePenOn = false;
            slot6.orangePenOn = false;
            slot1.greenPenOn = false;
            slot2.greenPenOn = false;
            slot3.greenPenOn = false;
            slot4.greenPenOn = false;
            slot5.greenPenOn = false;
            slot6.greenPenOn = false;
            slot1.greyOn = true;
            slot2.greyOn = true;
            slot3.greyOn = true;
            slot4.greyOn = true;
            slot5.greyOn = true;
            slot6.greyOn = true;
            arrowDirection = "arrowRight";
            moveForward = "moveRight";
            pSquare.value = 0;
            pSquare.value += 14;
            stars = 11;
            running = false;
            abort = true;
            arrow[0] = false;
            arrow[1] = true;
            arrow[2] = false;
            arrow[3] = false;
            ctx.font = "18px Helvetica";
            ctx.fillStyle = "#59534E";
            ctx.fillText("Execution", 282, 550);
            ctx.fillText("Speed", 137, 550);
            ctx.fillText("Functions", 647, 250);
            ctx.fillText("Commands", 888, 178);
            drawBoard();
            drawFunctionSlots();


        }
        function gridOnlyReset() {
            console.log("grid reset initiated")
            gamePause = false;
            slotAnimClear();
            slot = slotSelect[0];
            running = false;
            abort = true;
            grid = JSON.parse(JSON.stringify(grid2));
            arrowDirection = "arrowRight";
            moveForward = "moveRight";
            pSquare.value = 0;
            pSquare.value += 14;
            stars = 11;
            arrow[0] = false;
            arrow[1] = true;
            arrow[2] = false;
            arrow[3] = false;
            drawBoard();

        }


        // GAMELOOP ANIMATIONS ABOVE GAMEBOARD

        function slotAnimClear() {
            ctx.globalAlpha = 1;
            ctx.clearRect(176, 64, 246, 40);
            ctx.fillStyle = "white";
            ctx.fillRect(176, 64, 246, 40);
        }
        function slot1Anim() {

            if (slot1.blueOn === true) {
                ctx.drawImage(atlas, 105, 0, 35, 35, 176, 64, 40, 40); // slot 1
            }
            if (slot1.orangeOn === true) {
                ctx.drawImage(atlas, 420, 0, 35, 35, 176, 64, 40, 40); // slot 1
            }
            if (slot1.greenOn === true) {
                ctx.drawImage(atlas, 175, 0, 35, 35, 176, 64, 40, 40); // slot 1
            }
            if (slot1.greyOn === true) {
                ctx.drawImage(atlas, 210, 0, 35, 35, 176, 64, 40, 40); // slot 1
            }
            if (slot1.forwardOn === true) {
                ctx.drawImage(atlas, 70, 0, 35, 35, 176, 64, 40, 40); // slot 1
            }
            if (slot1.turnRightOn === true) {
                ctx.drawImage(atlas, 525, 0, 35, 35, 176, 64, 40, 40); // slot 1
            }
            if (slot1.turnLeftOn === true) {
                ctx.drawImage(atlas, 560, 0, 35, 35, 176, 64, 40, 40); // slot 1
            }
            if (slot1.f1On === true) {
                ctx.drawImage(atlas, 0, 0, 35, 35, 176, 64, 40, 40); // slot 1
            }
            if (slot1.orangePenOn === true) {
                ctx.drawImage(atlas, 35, 0, 35, 35, 176, 64, 40, 40); // slot 1
            }
            if (slot1.greenPenOn === true) {
                ctx.drawImage(atlas, 140, 0, 35, 35, 176, 64, 40, 40); // slot 1
            }
        }
        function slot2Anim() {

            if (slot2.blueOn === true) {
                ctx.drawImage(atlas, 105, 0, 35, 35, 217, 64, 40, 40); // slot 1
            }
            if (slot2.orangeOn === true) {
                ctx.drawImage(atlas, 420, 0, 35, 35, 217, 64, 40, 40); // slot 1
            }
            if (slot2.greenOn === true) {
                ctx.drawImage(atlas, 175, 0, 35, 35, 217, 64, 40, 40); // slot 1
            }
            if (slot2.greyOn === true) {
                ctx.drawImage(atlas, 210, 0, 35, 35, 217, 64, 40, 40); // slot 1
            }
            if (slot2.forwardOn === true) {
                ctx.drawImage(atlas, 70, 0, 35, 35, 217, 64, 40, 40); // slot 1
            }
            if (slot2.turnRightOn === true) {
                ctx.drawImage(atlas, 525, 0, 35, 35, 217, 64, 40, 40); // slot 1
            }
            if (slot2.turnLeftOn === true) {
                ctx.drawImage(atlas, 560, 0, 35, 35, 217, 64, 40, 40); // slot 1
            }
            if (slot2.f1On === true) {
                ctx.drawImage(atlas, 0, 0, 35, 35, 217, 64, 40, 40); // slot 1
            }
            if (slot2.orangePenOn === true) {
                ctx.drawImage(atlas, 35, 0, 35, 35, 217, 64, 40, 40); // slot 1
            }
            if (slot2.greenPenOn === true) {
                ctx.drawImage(atlas, 140, 0, 35, 35, 217, 64, 40, 40); // slot 1
            }
        }
        function slot3Anim() {

            if (slot3.blueOn === true) {
                ctx.drawImage(atlas, 105, 0, 35, 35, 258, 64, 40, 40); // slot 1
            }
            if (slot3.orangeOn === true) {
                ctx.drawImage(atlas, 420, 0, 35, 35, 258, 64, 40, 40); // slot 1
            }
            if (slot3.greenOn === true) {
                ctx.drawImage(atlas, 175, 0, 35, 35, 258, 64, 40, 40); // slot 1
            }
            if (slot3.greyOn === true) {
                ctx.drawImage(atlas, 210, 0, 35, 35, 258, 64, 40, 40); // slot 1
            }
            if (slot3.forwardOn === true) {
                ctx.drawImage(atlas, 70, 0, 35, 35, 258, 64, 40, 40); // slot 1
            }
            if (slot3.turnRightOn === true) {
                ctx.drawImage(atlas, 525, 0, 35, 35, 258, 64, 40, 40); // slot 1
            }
            if (slot3.turnLeftOn === true) {
                ctx.drawImage(atlas, 560, 0, 35, 35, 258, 64, 40, 40); // slot 1
            }
            if (slot3.f1On === true) {
                ctx.drawImage(atlas, 0, 0, 35, 35, 258, 64, 40, 40); // slot 1
            }
            if (slot3.orangePenOn === true) {
                ctx.drawImage(atlas, 35, 0, 35, 35, 258, 64, 40, 40); // slot 1
            }
            if (slot3.greenPenOn === true) {
                ctx.drawImage(atlas, 140, 0, 35, 35, 258, 64, 40, 40); // slot 1
            }
        }
        function slot4Anim() {

            if (slot4.blueOn === true) {
                ctx.drawImage(atlas, 105, 0, 35, 35, 299, 64, 40, 40); // slot 1
            }
            if (slot4.orangeOn === true) {
                ctx.drawImage(atlas, 420, 0, 35, 35, 299, 64, 40, 40); // slot 1
            }
            if (slot4.greenOn === true) {
                ctx.drawImage(atlas, 175, 0, 35, 35, 299, 64, 40, 40); // slot 1
            }
            if (slot4.greyOn === true) {
                ctx.drawImage(atlas, 210, 0, 35, 35, 299, 64, 40, 40); // slot 1
            }
            if (slot4.forwardOn === true) {
                ctx.drawImage(atlas, 70, 0, 35, 35, 299, 64, 40, 40); // slot 1
            }
            if (slot4.turnRightOn === true) {
                ctx.drawImage(atlas, 525, 0, 35, 35, 299, 64, 40, 40); // slot 1
            }
            if (slot4.turnLeftOn === true) {
                ctx.drawImage(atlas, 560, 0, 35, 35, 299, 64, 40, 40); // slot 1
            }
            if (slot4.f1On === true) {
                ctx.drawImage(atlas, 0, 0, 35, 35, 299, 64, 40, 40); // slot 1
            }
            if (slot4.orangePenOn === true) {
                ctx.drawImage(atlas, 35, 0, 35, 35, 299, 64, 40, 40); // slot 1
            }
            if (slot4.greenPenOn === true) {
                ctx.drawImage(atlas, 140, 0, 35, 35, 299, 64, 40, 40); // slot 1
            }
        }
        function slot5Anim() {

            if (slot5.blueOn === true) {
                ctx.drawImage(atlas, 105, 0, 35, 35, 340, 64, 40, 40); // slot 1
            }
            if (slot5.orangeOn === true) {
                ctx.drawImage(atlas, 420, 0, 35, 35, 340, 64, 40, 40); // slot 1
            }
            if (slot5.greenOn === true) {
                ctx.drawImage(atlas, 175, 0, 35, 35, 340, 64, 40, 40); // slot 1
            }
            if (slot5.greyOn === true) {
                ctx.drawImage(atlas, 210, 0, 35, 35, 340, 64, 40, 40); // slot 1
            }
            if (slot5.forwardOn === true) {
                ctx.drawImage(atlas, 70, 0, 35, 35, 340, 64, 40, 40); // slot 1
            }
            if (slot5.turnRightOn === true) {
                ctx.drawImage(atlas, 525, 0, 35, 35, 340, 64, 40, 40); // slot 1
            }
            if (slot5.turnLeftOn === true) {
                ctx.drawImage(atlas, 560, 0, 35, 35, 340, 64, 40, 40); // slot 1
            }
            if (slot5.f1On === true) {
                ctx.drawImage(atlas, 0, 0, 35, 35, 340, 64, 40, 40); // slot 1
            }
            if (slot5.orangePenOn === true) {
                ctx.drawImage(atlas, 35, 0, 35, 35, 340, 64, 40, 40); // slot 1
            }
            if (slot5.greenPenOn === true) {
                ctx.drawImage(atlas, 140, 0, 35, 35, 340, 64, 40, 40); // slot 1
            }
        }
        function slot6Anim() {

            if (slot6.blueOn === true) {
                ctx.drawImage(atlas, 105, 0, 35, 35, 381, 64, 40, 40); // slot 1
            }
            if (slot6.orangeOn === true) {
                ctx.drawImage(atlas, 420, 0, 35, 35, 381, 64, 40, 40); // slot 1
            }
            if (slot6.greenOn === true) {
                ctx.drawImage(atlas, 175, 0, 35, 35, 381, 64, 40, 40); // slot 1
            }
            if (slot6.greyOn === true) {
                ctx.drawImage(atlas, 210, 0, 35, 35, 381, 64, 40, 40); // slot 1
            }
            if (slot6.forwardOn === true) {
                ctx.drawImage(atlas, 70, 0, 35, 35, 381, 64, 40, 40); // slot 1
            }
            if (slot6.turnRightOn === true) {
                ctx.drawImage(atlas, 525, 0, 35, 35, 381, 64, 40, 40); // slot 1
            }
            if (slot6.turnLeftOn === true) {
                ctx.drawImage(atlas, 560, 0, 35, 35, 381, 64, 40, 40); // slot 1
            }
            if (slot6.f1On === true) {
                ctx.drawImage(atlas, 0, 0, 35, 35, 381, 64, 40, 40); // slot 1
            }
            if (slot6.orangePenOn === true) {
                ctx.drawImage(atlas, 35, 0, 35, 35, 381, 64, 40, 40); // slot 1
            }
            if (slot6.greenPenOn === true) {
                ctx.drawImage(atlas, 140, 0, 35, 35, 381, 64, 40, 40); // slot 1
            }
        }
        slotAnimClear();

    }
}
back.src = "images/back.jpeg"
// atlas onloadsdd


// to do list


// RunFunction to do list:


// no checking if F1 has a colour option? 








