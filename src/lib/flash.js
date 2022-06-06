export default function flash(el) {
	requestAnimationFrame(() => {
		el.target.style.transition = 'none';
		el.target.style.color = 'rgba(255,62,0,1)';
		el.target.style.backgroundColor = 'rgba(255,62,0,0.2)';

		setTimeout(() => {
			el.target.style.transition = 'color 1s, background 1s';
			el.target.style.color = '';
			el.target.style.backgroundColor = '';
		});
	});
}