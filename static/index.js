//创建日期对象
let dateObj = (function(){
    let _date = new Date();
    return{
        getDate:function(){
            return _date;
        },
        setDate:function(date){
            _date = date;
        }
    }
})();

//过滤
let getDateStr = function(date){
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    m = (m > 9) ? ('' + m) : ('0' + m);
    d = (m > 9) ? ('' + d) : ('0' + d);
    return y + m + d;
};

//创建日历信息
let makeDate = function(){
    let _year = dateObj.getDate().getFullYear();
    let _month = dateObj.getDate().getMonth() + 1;
    let _dateStr = getDateStr(dateObj.getDate());
    //添加标题
    let title = document.querySelector('.date-title');
    title.innerHTML = _dateStr.substr(0,4)+ '年' + _dateStr.substr(4,2) + '月';

    //设置表格日期
    let _table = document.querySelector('.calendar-table');
    let _tds = _table.getElementsByTagName('td');
    let _firstDay = new Date(_year , _month - 1 , 1);//当月第一天
    let weekNum = _firstDay.getDay();//当月第一天星期几
    for(let i = 0;i < _tds.length;i++){
        let _thisDay = new Date(_year , _month - 1, i + 1 - weekNum);//获取42格中的每一天
        let _thisDayStr = getDateStr(_thisDay);//过滤日期
        _tds[i].innerText = _thisDay.getDate();//获取日期
        if (_thisDayStr === getDateStr(new Date())){
            _tds[i].className = 'toDay';
        }else if (_thisDayStr.substr(0,6) === getDateStr(_firstDay).substr(0,6)){
            _tds[i].className = 'thisMonth';
        }else{
            _tds[i].className = 'otherMonth';
        }

        
    }
};

makeDate();

//口算练习显示-加法、减法、加减法
let sums_max = 10; // 设置10以内，还是20以内全局变量
let sums_plusorminus = 3;//设置加、减法模式，1是加法，2是减法，3是加减法随机
let sums_time_count = 3;//设置全局变量，倒计时秒数
let sums_time_count_temp =3;//设置全局变量，倒计时每秒减1
let clear_id_count = 0;//设置全局变量，停止循环标志
let sums_time_total = 0;//设置全局变量，每种模式持续练习时间
let clear_id_total = 0;//设置全局变量，总计时循环标志

let sums  = function(){
	
	let sums_1 = Math.round(Math.random() * sums_max); //被减数或被加数
	let sums_2 = Math.round(Math.random()* (sums_max - sums_1));   //减数或加数
	let sums_3 = Math.round(Math.random()* sums_max);   //减数或被减数

	let title_sums = document.querySelector('.sums-title');
	//调用倒计时函数
	//判断是否有正在执行算法循环，若有则停止
	if(clear_id_count){
		clearInterval(clear_id_count);
	}
	sums_time_count_temp = sums_time_count;
	//先显示间隔秒数
	let count_sums_begin2 = document.querySelector('.prevSums_count');
	count_sums_begin2.innerHTML = sums_time_count_temp + '秒';
	clear_id_count = setInterval(sums_count,1000);
	if(sums_plusorminus == 1){
		//输出加法算式
		title_sums.innerHTML = sums_1 + '+' + sums_2 + '=';
	}else if(sums_plusorminus == 2){
		//输出减法算式
		if(sums_1 > sums_3){
			title_sums.innerHTML = sums_1 + '-' + sums_3 + '=';
		}else{
			title_sums.innerHTML = sums_3 + '-' + sums_1 + '=';
		}
	}else{
		//随机输出加法或减法算式
		let sums_random = Math.round(Math.random());//随机生成0或1
		if(sums_random){
			//输出加法算式
			title_sums.innerHTML = sums_1 + '+' + sums_2 + '=';
		}else{
			//输出减法算式
			if(sums_1 > sums_3){
				title_sums.innerHTML = sums_1 + '-' + sums_3 + '=';
			}else{
				title_sums.innerHTML = sums_3 + '-' + sums_1 + '=';
			}
		}
		
	}
	 
	
	 
};

//显示目前倒计时时间函数定义

let sums_count = function(){
	let count_sums = document.querySelector('.prevSums_count');
	sums_time_count_temp--;
	count_sums.innerHTML = sums_time_count_temp + '秒';
	if(sums_time_count_temp < 1){
		clearInterval(clear_id_count);
	}
	
};

//显示目前总计时时间函数

let sums_count_total = function(){
	let count_sums_total = document.querySelector('.nextSums_count');
	sums_time_total++;
	count_sums_total.innerHTML = sums_time_total + '秒';
};

sums();
//添加开始事件
let clear_id = 0;//停止循环标志
let loop_times = 30;//初始化循环次数

let nextSums = document.querySelector('.nextSums');
nextSums.onclick = function(){
	//判断是否有正在执行算法循环，若有则停止
	if(clear_id){
		clearInterval(clear_id);
	}
	//获取循环间隔时间
	let sums_time = document.querySelector('#select_1');
	//将间隔时间赋值给全局变量sums_time_count
	sums_time_count = sums_time.value / 1000;

	//获取循环模式
	let sums_max_value = document.querySelector('#select_2').value;
	if(sums_max_value == 1){
		sums_max = 10;
		sums_plusorminus = 1;
	}else if(sums_max_value == 2){
		sums_max = 10;
		sums_plusorminus = 2;
	}else if(sums_max_value == 3){
		sums_max = 10;
		sums_plusorminus = 3;
	}else if(sums_max_value == 4){
		sums_max = 20;
		sums_plusorminus = 1;
	}else if(sums_max_value == 5){
		sums_max = 20;
		sums_plusorminus = 2;
	}else if(sums_max_value == 6){
		sums_max = 20;
		sums_plusorminus = 3;
	}else if(sums_max_value == 7){
		sums_max = 50;
		sums_plusorminus = 1;
	}else if(sums_max_value == 8){
		sums_max = 50;
		sums_plusorminus = 2;
	}else if(sums_max_value == 9){
		sums_max = 50;
		sums_plusorminus = 3;
	}else if(sums_max_value == 10){
		sums_max = 100;
		sums_plusorminus = 1;
	}else if(sums_max_value == 11){
		sums_max = 100;
		sums_plusorminus = 2;
	}else if(sums_max_value == 12){
		sums_max = 100;
		sums_plusorminus = 3;
	}
	//开始倒计时
	//调用倒计时函数
	//判断是否有正在执行算法循环，若有则停止
	if(clear_id_count){
		clearInterval(clear_id_count);
	}
	sums_time_count_temp = sums_time_count;
	//先显示间隔秒数
	let count_sums_begin1 = document.querySelector('.prevSums_count');
	count_sums_begin1.innerHTML = sums_time_count_temp + '秒';
	clear_id_count = setInterval(sums_count,1000);
	//点击开始后，开始总计时
	sums_time_total = 0;  //重新计算总计时
	if(clear_id_total){
		clearInterval(clear_id_total);
	}
	clear_id_total = setInterval(sums_count_total,1000);

	//开始循环	
   	clear_id = setInterval(sums,sums_time.value);
};

//添加切换月份事件
let prevMonth = document.querySelector('.prevMonth');
let nextMonth = document.querySelector('.nextMonth');
prevMonth.onclick = function(){
    let date = dateObj.getDate();
    dateObj.setDate(new Date(date.getFullYear(),date.getMonth() - 1, 1));
    makeDate();
};
nextMonth.onclick = function(){
    let date = dateObj.getDate();
    dateObj.setDate(new Date(date.getFullYear(),date.getMonth() + 1, 1));
    makeDate();
};

//百度API，获取万年历信息https://opendata.baidu.com/api.php?query=2022%E5%B9%B45%E6%9C%88&resource_id=39043&format=json&tn=wisetpl