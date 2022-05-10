const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('nav ul');
window.addEventListener('click', e => {
  console.log(e.target);
  if (e.target.classList.contains('menu-btn')) {
    navList.classList.add('active');
  } else {
    navList.classList.remove('active');
  }
});
