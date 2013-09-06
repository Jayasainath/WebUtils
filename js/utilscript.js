/*
	General Puropse String Utils
*/

StringUtils = function(){
	var _t = this;
	_t.toSentenceCase = function(value){
		if(value && typeof value === "string"){
			return value.charAt(0).toUpperCase() + value.slice(1, value.length);
		}
	};

	return {
		toSentenceCase: toSentenceCase
	}

}();


/*
	Converts a given date (String Date) with the input format to the required format
	Dependancy => StringUtils
*/


DateUtils = function(){
	var _t = this, inputDay, inputDate, inputMonth, inputYear, su = StringUtils;
	var dateObject = new Date();

	var monthNamesShort = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	var monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october","november","december"];

	var dayNamesShort = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	var dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	
	_t.getInputDay = function(){ return _t.inputDay; };
	_t.setInputDay = function(value){
		if(value) _t.inputDay = value;
	};

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
			var splitter = /(\-|\/|\\|\.|\:|\,|\_|\*|\^|\#|\s)/g;
			var splitArray = inputFormat.split(splitter);
			var splitArrayLength = splitArray.length, i = 0, split_array_i, split_value;
			
			for (; i < splitArrayLength; i+=2){
				split_value = value.split(splitter)[i];
				split_array_i = splitArray[i];
				if(split_array_i.match(/(?:d|dd)/g)){
					if(!isNaN(parseInt(split_value))) _t.setInputDate(parseInt(split_value));
				}else if(split_array_i.match(/(?:D|DD)/g)){
					if(!isNaN(parseInt(split_value))) _t.setInputDay(parseInt(split_value));
					
					// check if the day name matches with the date, month and year combination
					// if there's a match, create a date object, else throw an error

				}else if(split_array_i.match(/(?:m|mm)/g)){
					if(!isNaN(parseInt(split_value))) _t.setInputMonth(parseInt(split_value)-1);
				}else if(split_array_i.match(/(?:M|MM)/g)){
					if(split_value.length > 3){
						var index = monthNames.indexOf(split_value.toLowerCase());
						_t.setInputMonth(index);
					}else if(split_value.length <= 3 && split_value.length > 0){
						var index = monthNamesShort.indexOf(split_value.toLowerCase());
						_t.setInputMonth(index);
					}
				}else if(split_array_i.match(/(?:yy|yyyy)/ig)){
					split_value = split_value.length > 2 ? split_value : "20"+split_value;
					if(!isNaN(parseInt(split_value))) _t.setInputYear(parseInt(split_value));
				}
			}
			_t.createDateObjectFor();
			console.log("Date Object: "+_t.getDateObject());
			console.log("Date Out: "+_t.formatOutput(outputFormat));
		}else if(value && typeof value == "object"){

		}
	};

	_t.formatOutput = function(outputFormat){
		if(outputFormat && typeof outputFormat === "string"){
			var dateStr = "", dateObject = _t.getDateObject(), splitter = /(\-|\/|\\|\.|\:|\,|\_|\*|\^|\#|\s)/g;
			var splitArray = outputFormat.split(splitter);
			var splitArrayLength = splitArray.length, i = 0, split_array_i;
			for (; i < splitArrayLength; i+=2){
				split_array_i = splitArray[i];
				if(split_array_i.match(/(?:d|dd)/g)){
					var date = dateObject.getDate().toString();
					if(split_array_i.length > 1){
						date = date.length < 2 ? "0" + date : date;
					}
					dateStr += splitArray[i+1] ? date + splitArray[i+1] : date;
				}else if(split_array_i.match(/(?:D|DD)/g)){
					var day = dateObject.getDay();
					day = split_array_i.length > 1 ? su.toSentenceCase(dayNames[day]) : su.toSentenceCase(dayNamesShort[day]);
					dateStr += splitArray[i+1] ? day + splitArray[i+1] : day;
				}else if(split_array_i.match(/(?:m|mm)/g)){
					var month = (dateObject.getMonth()+1).toString();
					if(split_array_i.length > 1){
						month = month.length < 2 ? "0" + month : month; 	
					}
					dateStr += splitArray[i+1] ? month + splitArray[i+1] : month;
				}else if(split_array_i.match(/(?:M|MM)/g)){
					var Month = dateObject.getMonth();
					Month = split_array_i.length > 1 ? su.toSentenceCase(monthNames[Month]) : su.toSentenceCase(monthNamesShort[Month]);
					dateStr += splitArray[i+1] ? Month + splitArray[i+1] : Month;
				}else if(split_array_i.match(/(?:yy|yyyy)/ig)){
					var year = dateObject.getFullYear().toString();
					if(split_array_i.length < 4){
						year = year.slice(2, year.length);
					}
					dateStr += splitArray[i+1] ? year + splitArray[i+1] : year;
				}
			}
			return dateStr;
		}else{
			throw new Error("Invalid format");
		}
	};

	_t.createDateObjectFor = function(){
		if(_t.getInputYear() && (_t.getInputMonth() || _t.getInputMonth() === 0) && _t.getInputDate){	
			_t.setDateObject(new Date(_t.getInputYear(), _t.getInputMonth(), _t.getInputDate()));
		}
	};

	return {
		format: format
	}

}();

(function(){
	var df = DateUtils;
	df.format("Nov-1-13", "DD, dd-M-yy", "M,dd-yy");
})();





/*

==============================================================================================================================================
INPUT FORMAT (S)
================

['d/m/yy', 'd/m/yyyy', 'd/mm/yy', 'd/mm/yyyy', 'd/M/yy', 'd/M/yyyy', 'd/MM/yy', 'd/MM/yyyy']
['dd/m/yy', 'dd/m/yyyy', 'dd/mm/yy', 'dd/mm/yyyy', 'dd/M/yy', 'dd/M/yyyy', 'dd/MM/yy', 'dd/MM/yyyy']
['d/yy/m', 'd/yyyy/m', 'd/yy/mm', 'd/yyyy/mm', 'd/yy/M', 'd/yyyy/M', 'd/yy/MM', 'd/yyyy/MM']
['dd/yy/m', 'dd/yyyy/m', 'dd/yy/mm', 'dd/yyyy/mm', 'dd/yy/M', 'dd/yyyy/M', 'dd/yy/MM', 'dd/yyyy/MM']

**********

['m/d/yy', 'm/d/yyyy', 'mm/d/yy', 'mm/d/yyyy', 'M/d/yy', 'M/d/yyyy', 'MM/d/yy', 'MM/d/yyyy']
['m/dd/yy', 'm/dd/yyyy', 'mm/dd/yy', 'mm/dd/yyyy', 'M/dd/yy', 'M/dd/yyyy', 'MM/dd/yy', 'MM/dd/yyyy']
['m/yy/d', 'm/yyyy/d', 'mm/yy/d', 'mm/yyyy/d', 'M/yy/d', 'M/yyyy/d', 'MM/yy/d', 'MM/yyyy/d']
['m/yy/dd', 'm/yyyy/dd', 'mm/yy/dd', 'mm/yyyy/dd', 'M/yy/dd', 'M/yyyy/dd', 'MM/yy/dd', 'MM/yyyy/dd']

**********

['yy/m/d', 'yy/mm/d', 'yy/m/dd', 'yy/mm/dd', 'yy/M/d', 'yy/MM/d', 'yy/M/dd', 'yy/MM/dd']
[y'yyy/m/d', 'yyyy/mm/d', 'yyyy/m/dd', 'yyyy/mm/dd', 'yyyy/M/d', 'yyyy/MM/d', 'yyyy/M/dd', 'yyyy/MM/dd']
['yy/d/m', 'yy/d/mm', 'yy/dd/m', 'yy/dd/mm', 'yy/d/M', 'yy/d/MM', 'yy/dd/M', 'yy/dd/MM']
[y'yyy/d/m', 'yyyy/d/mm', 'yyyy/dd/m', 'yyyy/dd/mm', 'yyyy/d/M', 'yyyy/d/MM', 'yyyy/dd/M', 'yyyy/dd/MM']

**********

The user can use his choice of delimeters like (\/., ;*:#^|)

==============================================================================================================================================
OUTUT FORMAT
============

Can be any of the above input formats in additon to the day name (D/DD)

*/