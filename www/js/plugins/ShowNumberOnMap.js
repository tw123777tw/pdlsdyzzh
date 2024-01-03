//=============================================================================
// TO_ShowNumberOnMap.js
//=============================================================================


/*:
* @plugindesc Show variables on the screen when on the map.
* @author Truth Originem
*
* @help
*
* Plugin Command:
* ShowVariable initialize 1 0.5 0.5 100 left ��˼�ǽ���һ���������Ϊ1������Ļ
* ���м䣨���Ͻ�Ϊ0,0�ı������أ����������Ϊ100�� * ����ı������ռ��ô��Ŀǰ
* ûд�ɱ����������з�ʽΪ�����Ķ��󡣸ö������ڳ��ǲ��ɼ��ģ�����Ϊ�������ݡ�
* ShowVariable show 1 ��ʾ�������Ϊ1�Ķ���
* ShowVariable hide 1 ���ر������Ϊ1�Ķ���
* ShowVariable setColor 1 #FF0000 ʹ�������Ϊ1�Ķ�����ֺ�ɫ��#FF0000��
*/


var $dataVariables = null;


(function(){
var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function ()
{
_Scene_Map_createAllWindows.call(this);
if(!$dataVariables){
$dataVariables = new Window_VariableShowTab();
}
this.addChild($dataVariables);
};




function Window_VariableShowTab(){
this.initialize.apply(this, arguments);
}
Window_VariableShowTab.prototype = Object.create(Window_Base.prototype);
Window_VariableShowTab.prototype.constructor = Window_VariableShowTab;


Window_VariableShowTab.prototype.initialize = function(){
var width = Graphics.boxWidth;
var height = Graphics.boxHeight;
Window_Base.prototype.initialize.call(this, 0, 0, width, height);
this.opacity = 0;
this._data = [];
};
Window_VariableShowTab.prototype.update = function(){
this.contents.clear();
for(var i =0;i<this._data.length;i++){
var data = this._data[i];
if(data.isEnabled()){
this.changeTextColor(data._color);
this.drawText(data.getVariable(),data._x,data._y,data._maxWidth,data._align);
this.resetTextColor();
}
}
};
Window_VariableShowTab.prototype.getDatas = function(){
return this._data;
};
Window_VariableShowTab.prototype.getData = function(id){
var data = null;
for(var i =0;i<this._data.length;i++){
if(this._data[i]._id == id){
data = this._data[i];
break;
}
}
return data;
};




var _Game_Interpreter_pluginCommand =

Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
_Game_Interpreter_pluginCommand.call(this, command, args);
if (command === 'ShowVariable') {
switch (args[0]) {
case 'initialize':
var data = new VariableData(Number(args[1]),Number(args[2]),Number(args[3]),Number(args[4]),String(args[5]));
$dataVariables.getDatas().push(data);
break;
case 'show':
$dataVariables.getData(Number(args[1])).setEnabled(true);
break;
case 'hide':
$dataVariables.getData(Number(args[1])).setEnabled(false);
break;
case 'setColor':
$dataVariables.getData(Number(args[1])).setColor(String(args[2]));
break;
}
}
};


function VariableData(){
this.initialize.apply(this, arguments);
}
VariableData.prototype.constructor = VariableData;
VariableData.prototype.initialize = function(id,x_factor,y_factor,maxWidth,align){
this._x = Graphics.boxWidth*x_factor;
this._y = Graphics.boxHeight*y_factor;
this._maxWidth = maxWidth;
this._align = align;
this._id = id;
this._color = $dataVariables.normalColor();
this._enabled = false;
};
VariableData.prototype.getVariable = function(){
return $gameVariables.value(this._id);
};
VariableData.prototype.isEnabled = function(){
return this._enabled;
};
VariableData.prototype.setEnabled = function(enabled){
this._enabled = enabled;
};
VariableData.prototype.setColor = function(color){
this._color = color;
}


})();

