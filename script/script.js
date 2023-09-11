document.addEventListener('DOMContentLoaded', () => {
	// 오늘 날짜 정보를 가져옴
	const today = new Date();
	let currentYear = today.getFullYear();
	let currentMonth = today.getMonth();

	// 현재 달력을 생성
	generateCalendar(currentYear, currentMonth);

	// 슬라이드 컨테이너에 드래그 이벤트 추가
	const sliderContainer = document.querySelector('.TodoTemplate');
	let touchStartX = 0;
	let touchEndX = 0;

	sliderContainer.addEventListener('touchstart', (e) => {
		touchStartX = e.touches[0].clientX;
	});

	sliderContainer.addEventListener('touchend', (e) => {
		touchEndX = e.changedTouches[0].clientX;

		const deltaX = touchEndX - touchStartX;
		const threshold = 50; // 드래그 인식 임계값

		if (deltaX > threshold) {
			// 오른쪽으로 드래그 (이전 달)
			currentMonth--;
			if (currentMonth < 0) {
				currentMonth = 11;
				currentYear--;
			}
		} else if (deltaX < -threshold) {
			// 왼쪽으로 드래그 (다음 달)
			currentMonth++;
			if (currentMonth > 11) {
				currentMonth = 0;
				currentYear++;
			}
		}

		// 달력을 업데이트
		generateCalendar(currentYear, currentMonth);
	});
});

document.querySelector('.ModalBtn').addEventListener('click', () => {
	const modal = document.querySelector('.content');
	modal.classList.add('opened');
	console.log("모달 오픈");
});

document.querySelector('.modal__toggle__btn').addEventListener('click', () => {
	const modal = document.querySelector('.content');
	modal.classList.remove('opened');
});

function generateCalendar(year, month) {
	// 현재 날짜 정보 가져오기
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth();
	const currentDate = today.getDate();

	// 캘린더 생성 로직
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const daysInMonth = lastDay.getDate();
	const firstDayOfWeek = firstDay.getDay();
	const monthName = firstDay.toLocaleString('en', { month: 'long' });
	const monthElement = document.querySelector('.current__month');
	const weeksContainer = monthElement.querySelectorAll('ul[class^="week"]');

	let currentDay = 1;
	let prevMonthDay = new Date(year, month, 0).getDate() - firstDayOfWeek + 1;

	// 현재 월 이름을 캘린더에 설정
	monthElement.querySelector('h1').textContent = monthName;

	// 주(week)를 생성하고 날짜를 추가하는 함수
	function createWeek(week, weekIndex) {
		week.innerHTML = '';

		for (let i = 0; i < 7; i++) {
			const dayLi = document.createElement('li');

			if ((weekIndex === 0 && i < firstDayOfWeek) || currentDay > daysInMonth) {
				// 이전 달의 날짜나 다음 달의 날짜를 추가
				dayLi.innerHTML = `<span>${prevMonthDay}</span>`;
				dayLi.classList.add('prev-month');
				prevMonthDay++;
			} else {
				// 현재 달의 날짜를 추가
				dayLi.textContent = currentDay;
				if (year === currentYear && month === currentMonth && currentDay === currentDate) {
					// 오늘 날짜에 .today 클래스 추가
					dayLi.classList.add('today');
				}
				currentDay++;
			}
			week.appendChild(dayLi);
		}
	}

	// 각 주(week)에 날짜를 추가
	weeksContainer.forEach((week, index) => {
		createWeek(week, index);
	});
}

//localStorage todo list 추가




