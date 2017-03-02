/**
 * Created by ASUS on 2017/1/3.
 */

var helper = {section: function(name, block){
    if(!this._sections) this._sections = {};
    this._sections[name] = block.fn(this);
    return null;
    },
   list : function(items, options) {
       var out = "<ul>";

       for (var i = 0, l = items.length; i < l; i++) {
           out = out + "<li>" + options.fn(items[i]) + "</li>";
       }
       return out + "</ul>";
   }
}
module.exports = helper;