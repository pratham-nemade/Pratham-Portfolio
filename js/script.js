let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
	menuIcon.classList.toggle('bx-x');
	navbar.classList.toggle('active');
};

let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('header nav a');

window.onscroll = () => {
	sections.forEach(sec => {
		let top = window.scrollY;
		let offset = sec.offsetTop - 150;
		let height = sec.offsetHeight;
		let id = sec.getAttribute('id');
		
		if(top >= offset && top < offset + height){
			navLinks.forEach(links => {
				links.classList.remove('active');
				document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
			});
		};
	});
	
	let header = document.querySelector('.header');
	header.classList.toggle('sticky',window.scrollY > 100);

	menuIcon.classList.remove('bx-x');
	navbar.classList.remove('active');
};

ScrollReveal({ 
	reset: true,
	distance:'150px',
	duration: 1500,
	delay: 100
});

ScrollReveal().reveal('.home-content , .heading , .sub-title', { origin : 'top' });
ScrollReveal().reveal('.about-col-1 img , .about-col-1 .frame , .img-shadow , .home img', { origin : 'bottom' });
ScrollReveal().reveal('.contact-info , .project1 , .project3', { origin : 'left' });
ScrollReveal().reveal('.contact_form , .project2', { origin : 'right' });