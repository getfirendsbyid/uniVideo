// function withData(param){
//   return param < 10 ? '0' + param : '' + param;
// }
// // 格式化日期
// function getDate(type){
// 	const date = new Date();
// 	let year = date.getFullYear();
// 	let month = date.getMonth() + 1;
// 	let day = date.getDate();
	
// 	if (type === 'start') {
// 	    year = year - 60;
// 	} else if (type === 'end') {
// 	    year = year + 2;
// 	}
// 	month = month > 9 ? month : '0' + month;;
// 	day = day > 9 ? day : '0' + day;
// 	return `${year}-${month}-${day}`;
// };

// module.exports = {
//   getDate: getDate
// }