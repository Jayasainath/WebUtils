DateUtils = function(){
	var _t = this, inputDate, inputMonth, inputYear;
	var dateObject = new Date();

	var monthNamesShort = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	var monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october","november","december"];

	var dayNamesShort = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	var dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	
	_t.getInputDate = function(){ return _t.inputDate; };
	_t.setInputDate = function(value){
		if(value) _t.inputDate = value;
	};

	_t.getInputMonth = function(){ return _t.inputMonth; };
	_t.setInputMonth = function(value){
		if(value || value === 0) _t.inputMonth = value;
	};

	_t.getInputYear = function(){ return _t.inputYear; };
	_t.setInputYear = function(value){
		if(value) _t.inputYear = value;
	};

	_t.getDateObject = function(){ return _t.dateObject; };
	_t.setDateObject = function(value){
		if(value) _t.dateObject = value;
	};

	_t.format = function(value, outputFormat, inputFormat){
		if(value && typeof value === "string"){
			var splitter = /(\-|\/|\\|\.|\:|\,|\_|\*|\^|\#)/g;
			var splitArray = inputFormat.split(splitter);
			var splitArrayLength = splitArray.length, i = 0;
			
			for (; i < splitArrayLength; i+=2){
				var split_value = value.split(splitter)[i];
				if(splitArray[i].match(/(?:d|dd)/ig)){
					if(!isNaN(parseInt(split_value))) _t.setInputDate(parseInt(split_value));
				}else if(splitArray[i].match(/(?:m|mm)/g)){
					if(!isNaN(parseInt(split_value))) _t.setInputMonth(parseInt(split_value)-1);
				}else if(splitArray[i].match(/(?:M|MM)/g)){
					if(split_value.length > 3){
						var index = monthNames.indexOf(split_value.toLowerCase());
						_t.setInputMonth(index);
					}else if(split_value.length <= 3 && split_value.length > 0){
						var index = monthNamesShort.indexOf(split_value.toLowerCase());
						_t.setInputMonth(index);
					}
				}else if(splitArray[i].match(/(?:yy|yyyy)/ig)){
					split_value = split_value.length > 2 ? split_value : "20"+split_value;
					if(!isNaN(parseInt(split_value))) _t.setInputYear(parseInt(split_value));
				}
			}
			_t.createDateObjectFor();
		}else if(value && typeof value == "object"){

		}

	};

	_t.createDateObjectFor = function(){
		if(_t.getInputYear() && (_t.getInputMonth() || _t.getInputMonth() === 0) && _t.getInputDate){	
			_t.setDateObject(new Date(_t.getInputYear(), _t.getInputMonth(), _t.getInputDate()));
		}
	};

	return {
		getDateObject: getDateObject,
		format: format
	}

}();

(function(){
	var df = DateUtils;
	df.format("dec-11-13", "mm-dd-yy", "M/dd/yy");
})();



/*

==============================================================================================================================================
INPUT FORMAT
============

dd/mm/yy
dd/mm/yyyy
d/m/yy

d/M/yy
dd/M/yy
dd/M/yyyy
d/MM/yy
dd/MM/yy
dd/MM/yyyy

mm/dd/yy
mm/dd/yyyy
m/d/yy

yy/m/d
yy/mm/dd
yyyy/mm/dd

yy/d/m
yy/dd/mm
yyyy/dd/mm

The user can use his choice of delimeters like (\/.,;*:#^|)

==============================================================================================================================================
OUTUT FORMAT
============




*/












