function generateCalendar(year, month) {
	// 현재 달의 1일과 마지막 날짜를 구함
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const daysInMonth = lastDay.getDate();

	// 현재 달의 1일의 요일을 구함 (0: 일요일, 1: 월요일, ..., 6: 토요일)
	const firstDayOfWeek = firstDay.getDay();

	// 현재 달의 이름을 가져오고, 해당 월의 HTML 요소를 선택
	const monthName = firstDay.toLocaleString('en', { month: 'long' });
	const monthElement = document.querySelector(`.${monthName.toLowerCase()}`);
	const weeksContainer = monthElement.querySelectorAll('ul[class^="week"]');

	let currentDay = 1;
	let prevMonthDay = (new Date(year, month, 0)).getDate() - firstDayOfWeek + 1;

	// 각 주(week)에 날짜를 추가
	weeksContainer.forEach((week, index) => {
		week.innerHTML = '';

		for (let i = 0; i < 7; i++) {
			// 첫 주의 경우 이전 달의 마지막 주 날짜를 추가하며, 첫 주의 시작 요일을 채움
			if ((index === 0 && i < firstDayOfWeek) || currentDay > daysInMonth) {
				const dayLi = document.createElement('li');
				dayLi.innerHTML = `<span>${prevMonthDay}</span>`;
				week.appendChild(dayLi);

				prevMonthDay++;
			} else {
				// 현재 달의 날짜를 추가
				const dayLi = document.createElement('li');
				dayLi.textContent = currentDay;
				week.appendChild(dayLi);

				currentDay++;
			}
		}
	});
}

// 페이지 로드 시 실행되는 함수
document.addEventListener('DOMContentLoaded', () => {
	// 오늘 날짜 정보를 가져옴
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth();

	// 현재 달의 달력을 생성
	generateCalendar(currentYear, currentMonth);
});
