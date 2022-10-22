
class Header {
	constructor() {
		this.header = document.getElementById("header");
		this.userStatistics = document.getElementById("user-statistics");
		this.userInformation = document.getElementById("user-information");

		this.miniUserStatistics = document.getElementById("mini-user-statistics");
		this.downArrow = document.getElementById("down-arrow");

		this.miniUserStatistics.addEventListener("click", this.handleHeader);
		this.downArrow.addEventListener("click", this.handleHeader);

		ScreenOrientation.onchange = this.handleResize;

		this.isOpen = true;

		this.handleHeader();
	}

	handleHeader = () => {
		let calculated;
		if (this.isOpen) {
			calculated = this.userStatistics.clientHeight
			if (!isLandscapeOrComputer()) {
				calculated += this.userInformation.clientHeight;
			}
		} else {
			calculated = 0;
		}

		this.header.style.top = `-${calculated}px`;

		this.isOpen = !this.isOpen;
	}

	handleResize = () => {

	}

}

class Footer {
	constructor() {
		this.footer = document.getElementById("footer");
		this.minigames = document.getElementById("minigames");
		this.upArrow = document.getElementById("up-arrow");

		this.upArrow.addEventListener("click", this.handleFooter);

		this.isOpen = true;

		this.handleFooter();
	}

	handleFooter = () => {
		let calculated = this.isOpen ? this.minigames.clientHeight : 0;

		this.footer.style.bottom = `-${calculated}px`;

		this.isOpen = !this.isOpen;
	}
}

function isLandscapeOrComputer() {
	return window.matchMedia("(max-height: 375px) and (orientation: landscape)").matches
		|| window.matchMedia("(min-width: 1024px)").matches;
}

export { Header, Footer }
