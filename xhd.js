//-------------------------------
// x-html-dropdown v1.0 (http://code.google.com/p/x-html-dropdown/)
//
// Just another multi-select dropdown/combobox.
// 
// Copyright 2007 Fernando P. Garcia. All rights reserved.
//
// Licensed under GPL v2.0 http://www.gnu.org/copyleft/gpl.html
//------------------------------

function XHDgetWrapper($id){
  return document.getElementById($id);
}
function XHDclick($id,e){
  XHDgetButton($id).disabled = true;
  setTimeout('XHDgetButton("'+$id+'").disabled=false',5);
  
  if(XHDgetDropdown($id).style.visibility == 'hidden')
    XHDdisplayDropdown($id);
  else
    XHDhideDropdown($id);
}
function XHDrefresh($id){
  XHDgetLabel($id).value = XHDgetDropdown($id).getCurrentText();
}
function XHDgetLabel($id){
  return XHDgetWrapper($id).getElementsByTagName('INPUT')[0];
}
function XHDgetButton($id){
  return XHDgetWrapper($id).getElementsByTagName('SELECT')[0];
}
function XHDgetDropdown($id){
  var target = XHDgetWrapper($id).nextSibling;//getElementsByTagName('SELECT')[1];
  target.getCurrentText = function(){
    var $selectedIndex = this.selectedIndex;
    if($selectedIndex < 0) $selectedIndex = 0;
    return this.options[$selectedIndex].innerHTML;
  }
  return target;
}
function XHDhideDropdown($id){
  if(!XHDgetWrapper($id).nohide)
    XHDgetDropdown($id).style.visibility = 'hidden';
}
function XHDdisplayDropdown($id){
  XHDgetDropdown($id).style.visibility = 'visible';
}
function XHDwrapHTML($id){  
  // Get original object
  $_orig = document.getElementById($id);
  $_orig.removeAttribute('id');
  
  // Format original object
  $_orig.style.position = 'absolute';
  $_orig.style.display = 'none';
  $_orig.style.visibility = 'hidden';
  $_orig.setAttribute('multiple','');
  $_orig.setAttribute('size','4');
  
  // Create container
  container = document.createElement("DIV");
  container.setAttribute('id',$id);
  container.innerHTML = "<TABLE \
  cellpadding='0' cellspacing='0'\
  style='position:relative;display:block;margin:0px;padding:0px'><tr><td>\
  <input style=\"height:24px;width:130px;\" readonly nowrap></td><td valign='top'>\
  <SELECT \
  onmousedown=\"XHDclick('"+$id+"');\"\
  style=\"width:20px;height:22px;padding:0px;vertical-align:top\"></SELECT>\
  </td></tr></TABLE>\
  ";
  
  // Insert new Object
  $_orig.parentNode.insertBefore(container,$_orig);
  $_orig.style.display = 'block';
}
function XHDinit($id){
  XHDwrapHTML($id);
  
  XHDgetWrapper($id).nohide = false;
  document.body.onclick = function(){
    XHDhideDropdown($id);
  }
  XHDgetDropdown($id).onmouseover = function(){
    XHDgetWrapper($id).nohide = true;
  }
  XHDgetDropdown($id).onmouseout = function(){
    XHDgetWrapper($id).nohide = false;
  }
  XHDrefresh($id);
}
