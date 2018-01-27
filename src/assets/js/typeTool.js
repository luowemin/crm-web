/**
 * 
 */
var type = function(o) {
	var s = Object.prototype.toString.call(o);
	return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};
var types = ['Null','Undefined','Object','Array','String','Number','Boolean','Function','RegExp'];
types.forEach(function(t) {
	type['is' + t] = function(o) {
		return type(o) === t.toLowerCase();
	};
});
export default type
