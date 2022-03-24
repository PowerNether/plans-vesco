
function tooltip () {
  let tooltips = Array.from(document.querySelectorAll('[data-tooltip]')) || null;
  if (tooltips !== null) {
    tooltips.forEach(el => {
      let tooltip;
      let tooltipID = 'tooltip' + (Math.floor(Math.random() * (9999999999 - 99999)) + 99999);
      
      el.addEventListener('mouseenter', function () {
        let target = el;
  
        let tooltipData = el.dataset.tooltip;
        let tooltipPos;
        tooltipPos = el.dataset.position || 'top';
        if (!tooltipData) return;
  
        tooltip = document.createElement('div');
        tooltip.className = `tooltip ${tooltipPos} ${tooltipID}`;
        tooltip.innerHTML = tooltipData;
        document.body.append(tooltip);
  
        let coords = el.getBoundingClientRect();
        let top;
        let left;
        
        switch (tooltipPos) {
          case 'top':
            top = coords.top - tooltip.offsetHeight - 8;
            left = coords.left + (target.offsetWidth - tooltip.offsetWidth) / 2;
            break;
          case 'left':
            top = coords.top + (target.offsetHeight - tooltip.offsetHeight) / 2;
            left = coords.left - tooltip.offsetWidth - 8;
            break;
          case 'right':
            top = coords.top + (target.offsetHeight - tooltip.offsetHeight) / 2;
            left = coords.left + target.offsetWidth + 8;
            break;
          case 'bottom':
            top = coords.top + target.offsetHeight + 8;
            left = coords.left + (target.offsetWidth - tooltip.offsetWidth) / 2;
            break;
          case 'right-bottom':
            top = coords.top + target.offsetHeight + 8;
            left = coords.right - tooltip.offsetWidth;
            break;
          default:
            top = coords.top - tooltip.offsetHeight - 8;
            left = coords.left + (target.offsetWidth - tooltip.offsetWidth) / 2;
            break;
        }
        
        // Проверка на место
        if (top < 0) {
          top = coords.top + target.offsetHeight + 8;
          left = coords.left + (target.offsetWidth - tooltip.offsetWidth) / 2;
          tooltip.className = `tooltip bottom ${tooltipID}`;
        }
        if (top + tooltip.offsetHeight + 8 > window.innerHeight) {
          top = coords.top - tooltip.offsetHeight - 8;
          left = coords.left + (target.offsetWidth - tooltip.offsetWidth) / 2;
          tooltip.className = `tooltip top ${tooltipID}`;
        };
        if (left < 0) {
          top = coords.top + (target.offsetHeight - tooltip.offsetHeight) / 2;
          left = coords.left + target.offsetWidth + 8;
          tooltip.className = `tooltip right ${tooltipID}`;
        }
        if (left + tooltip.offsetWidth + 8 > window.innerWidth) {
          top = coords.top + (target.offsetHeight - tooltip.offsetHeight) / 2;
          left = coords.left - tooltip.offsetWidth - 8;
          tooltip.className = `tooltip left ${tooltipID}`;
        }
        if (left < 0) {
          top = coords.top + (target.offsetHeight - tooltip.offsetHeight) / 2;
          left = coords.left + target.offsetWidth + 8;
          if (left + tooltip.offsetWidth + 8 > window.innerWidth) {
            top = coords.top - tooltip.offsetHeight - 8;
            left = coords.left + (target.offsetWidth - tooltip.offsetWidth) / 2;
            tooltip.className = `tooltip top ${tooltipID}`;
          }
        }

        if (window.innerWidth <= 568) {
          left = 8
          if ((coords.top + coords.height) < (tooltip.offsetHeight + coords.height + 8)) {
            top = coords.top + coords.height + 8
          }
        }
  
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
        tooltip.classList.add('tooltip-enter');
      })
      el.addEventListener('mouseleave', function () {
        if (tooltip) {
          tooltip.classList.add('tooltip-exit');
          setTimeout(function () {
            document.querySelectorAll(`.${tooltipID}`).forEach(el => el.remove());
            tooltip = null;
          }, 150)
        }
      })
      el.addEventListener('mousewheel', function () {
        if (tooltip) {
          tooltip.classList.add('tooltip-exit');
          setTimeout(function () {
            document.querySelectorAll(`.${tooltipID}`).forEach(el => el.remove()); 
            tooltip = null;
          }, 150)
        }
      }, { passive: false })
    })
  }
}

tooltip();