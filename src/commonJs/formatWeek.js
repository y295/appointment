function  formatWeek(dayOfWeek) {
    let day;
    switch (dayOfWeek) {
        case 1:
            day = "星期天";
            break;
        case 2:
            day = "星期一";
            break;
        case 3:
            day = "星期二";
            break;
        case 4:
            day = "星期三";
            break;
        case 5:
            day = "星期四";
            break;
        case 6:
            day = "星期五";
            break;
        case 7:
            day = "星期六";
    }
    return day;
}

export default formatWeek