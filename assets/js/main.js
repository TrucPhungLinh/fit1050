/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	
		var $nav = $('#nav');

		if ($nav.length > 0) {

			
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						
							if ($this.attr('href').charAt(0) != '#')
								return;

						
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						
							if ($section.length < 1)
								return;

						
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									
										$section.removeClass('inactive');

									
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

								
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);


(function () {
	'use strict';

	
	document.addEventListener('DOMContentLoaded', function () {
		var btns  = document.querySelectorAll('.nas-filter-btn');
		var cards = document.querySelectorAll('.nas-event-card');
		var seeAll = document.querySelector('.nas-see-all');

		function applyFilter(filter) {
			
			btns.forEach(function (b) {
				b.classList.toggle('active', b.getAttribute('data-filter') === filter);
				b.setAttribute('aria-pressed', b.getAttribute('data-filter') === filter ? 'true' : 'false');
			});
			
			cards.forEach(function (card) {
				var match = (filter === 'all') || (card.getAttribute('data-category') === filter);
				card.classList.toggle('nas-hidden', !match);
			});
		}

		btns.forEach(function (btn) {
			btn.addEventListener('click', function () {
				applyFilter(btn.getAttribute('data-filter'));
			});
		});

		if (seeAll) {
			seeAll.addEventListener('click', function (e) {
				e.preventDefault();
				applyFilter('all');
			});
		}
	});



	(function () {
		var dot  = document.getElementById('nas-cursor-dot');
		var ring = document.getElementById('nas-cursor-ring');
		if (!dot || !ring) return;

		var mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		var ring_pos = { x: mouse.x, y: mouse.y };
		var EASE = 0.12; 

		document.addEventListener('mousemove', function (e) {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		});

		
		var hoverSel = 'a, button, .nas-filter-btn, .nas-event-card, .nas-faq-item, .nas-chapter-card, .button';
		document.querySelectorAll(hoverSel).forEach(function (el) {
			el.addEventListener('mouseenter', function () { document.body.classList.add('nas-hover'); });
			el.addEventListener('mouseleave', function () { document.body.classList.remove('nas-hover'); });
		});

	
		document.addEventListener('mouseleave', function () {
			dot.style.opacity = '0';
			ring.style.opacity = '0';
		});
		document.addEventListener('mouseenter', function () {
			dot.style.opacity = '1';
			ring.style.opacity = '1';
		});

		function animateCursor() {
			
			dot.style.left = mouse.x + 'px';
			dot.style.top  = mouse.y + 'px';

			
			ring_pos.x += (mouse.x - ring_pos.x) * EASE;
			ring_pos.y += (mouse.y - ring_pos.y) * EASE;
			ring.style.left = ring_pos.x + 'px';
			ring.style.top  = ring_pos.y + 'px';

			requestAnimationFrame(animateCursor);
		}

		requestAnimationFrame(animateCursor);
	})();


	
	(function () {
		var counters = document.querySelectorAll('.nas-count');
		if (!counters.length) return;

		var done = false;

		function countUp() {
			counters.forEach(function (el) {
				var target   = parseInt(el.getAttribute('data-target'), 10);
				var duration = 1200; 
				var steps    = 40;
				var step_val = target / steps;
				var current  = 0;
				var interval = setInterval(function () {
					current = Math.min(current + step_val, target);
					el.textContent = Math.round(current);
					if (current >= target) clearInterval(interval);
				}, duration / steps);
			});
		}

	
		function checkVisibility() {
			if (done) return;
			var panel = document.querySelector('.nas-stats-panel');
			if (!panel) return;
			var rect = panel.getBoundingClientRect();
			if (rect.top < window.innerHeight - 80) {
				done = true;
				countUp();
				window.removeEventListener('scroll', checkVisibility);
			}
		}

		window.addEventListener('scroll', checkVisibility);
		checkVisibility(); 
	})();

})();



document.addEventListener('DOMContentLoaded', function () {

	var cards       = document.querySelectorAll('.nas-event-card');
	var detailPanel = document.getElementById('nasEventDetail');
	var closeBtn    = document.getElementById('nasDetailClose');
	var addPlanBtn  = document.getElementById('nasAddPlanBtn');
	var planCounter = document.getElementById('nasPlanCounter');
	var planCount   = document.getElementById('nasPlanCount');
	var planPlural  = document.getElementById('nasPlanPlural');
	var confirmMsg  = document.getElementById('nasPlanConfirm');


	var detailType     = document.getElementById('nasDetailType');
	var detailTitle    = document.getElementById('nasDetailTitle');
	var detailDate     = document.getElementById('nasDetailDate');
	var detailLocation = document.getElementById('nasDetailLocation');
	var detailDesc     = document.getElementById('nasDetailDesc');
	var detailWhy      = document.getElementById('nasDetailWhy');

	
	if (!detailPanel || !addPlanBtn || !planCounter) return;

	
	var currentTitle = null;
	var plan = [];

	
	var typeColours = {
		'Social':   '#2da85c',
		'Academic': '#3b5fd9'
	};

	
	function openDetail(card) {
		var d = card.dataset;

	
		detailTitle.textContent    = d.title    || '';
		detailDate.innerHTML       = d.date     || '';
		detailLocation.textContent = d.location || '';
		detailDesc.textContent     = d.desc     || '';
		detailWhy.textContent      = d.why      || '';

		
		var col = typeColours[d.type] || '#888';
		detailType.textContent   = d.type || '';
		detailType.style.color        = col;
		detailType.style.borderColor  = col;

		
		cards.forEach(function (c) { c.classList.remove('nas-card-selected'); });
		card.classList.add('nas-card-selected');

		
		currentTitle = d.title || '';

		
		confirmMsg.style.display = 'none';
		confirmMsg.textContent   = '';

		
		var alreadyPlanned = plan.indexOf(currentTitle) !== -1;
		addPlanBtn.disabled    = alreadyPlanned;
		addPlanBtn.textContent = alreadyPlanned ? 'In your plan \u2713' : 'Add to plan';

		
		detailPanel.style.display = 'block';

	
		setTimeout(function () {
			detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}, 50);
	}

	
	function closeDetail() {
		detailPanel.style.display = 'none';
		cards.forEach(function (c) { c.classList.remove('nas-card-selected'); });
		currentTitle = null;
	}

	
	function updateCounter() {
		planCount.textContent  = plan.length;
		planPlural.textContent = plan.length === 1 ? '' : 's';
		planCounter.style.display = plan.length > 0 ? 'flex' : 'none';
	}

	
	cards.forEach(function (card) {
		card.addEventListener('click', function () {
			if (card.classList.contains('nas-card-selected')) {
				closeDetail();
			} else {
				openDetail(card);
			}
		});
	});

	
	if (closeBtn) {
		closeBtn.addEventListener('click', closeDetail);
	}

	
	addPlanBtn.addEventListener('click', function () {
		if (!currentTitle) return;

		if (plan.indexOf(currentTitle) === -1) {
			plan.push(currentTitle);
			confirmMsg.textContent   = 'Added to your plan: ' + currentTitle;
			confirmMsg.style.color   = '#2da85c';
			addPlanBtn.textContent   = 'In your plan \u2713';
			addPlanBtn.disabled      = true;
		} else {
			confirmMsg.textContent = currentTitle + ' is already in your plan.';
			confirmMsg.style.color = '#c0703a';
		}

		confirmMsg.style.display = 'block';
		updateCounter();
	});

});
